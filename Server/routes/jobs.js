const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb } = require('../config/db');

const router = express.Router();

// Ping database
router.get('/ping-db', async (req, res) => {
    try {
        const db = await connectToDb();
        const result = await db.command({ ping: 1 });
        console.log("Pinged database:", result);
        res.json({ message: "Successfully pinged MongoDB!" });
    } catch (error) {
        console.error("Error pinging database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get jobs list
router.get('/api/jobs', async (req, res) => {
    try {
        const db = await connectToDb();
        const jobs = await db.collection('jobs').find({}).toArray();
        res.json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Apply for job
router.post('/api/jobs/:id/apply', async (req, res) => {
    try {
        const jobId = req.params.id;
        const { firstName, lastName, email, phone, approved = "pending" } = req.body;

        if (!firstName || !lastName || !email || !phone) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const db = await connectToDb();
        const application = {
            jobId,
            applicant: { firstName, lastName, email, phone, approved },
            appliedAt: new Date(),
        };

        const result = await db.collection('applications').insertOne(application);
        res.status(201).json({ message: "Application submitted successfully", id: result.insertedId });
    } catch (error) {
        console.error("Error submitting application:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get applications by email (optional)
router.get('/api/applications', async (req, res) => {
    try {
        const { email } = req.query;

        const db = await connectToDb();

        // If an email is provided, filter applications by that email
        const applications = email
            ? await db.collection('applications').find({ "applicant.email": email }).toArray()
            : await db.collection('applications').find({}).toArray(); // Fetch all applications if no email is provided

        res.status(200).json({ applications });
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.patch('/api/applications/:id/:action', async (req, res) => {
    const { id, action } = req.params;
    const validActions = ['approve', 'reject'];

    if (!validActions.includes(action)) {
        return res.status(400).json({ error: "Invalid action" });
    }

    try {
        const db = await connectToDb();
        const approvedStatus = action === 'approve' ? 'approved' : 'rejected';

        const result = await db.collection('applications').updateOne(
            { _id: new ObjectId(id) },
            { $set: { "applicant.approved": approvedStatus } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Application not found" });
        }

        res.status(200).json({ message: `Application ${approvedStatus} successfully` });
    } catch (error) {
        console.error("Error updating application:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Add a job
router.post('/api/jobs', async (req, res) => {
    try {
        const { title, company, location, description } = req.body;

        if (!title || !company || !location || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const db = await connectToDb();
        const newJob = {
            title,
            company,
            location,
            description,
            createdAt: new Date(),
        };

        const result = await db.collection('jobs').insertOne(newJob);
        res.status(201).json({ id: result.insertedId, ...newJob });
    } catch (error) {
        console.error("Error adding job:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get a single job by ID
router.get('/api/jobs/:jobId', async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const db = await connectToDb();

        const job = await db.collection('jobs').findOne({ _id: new ObjectId(jobId) });

        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        res.json(job);
    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to query jobs by company name
router.get('/api/company/jobs', async (req, res) => {
    try {
        const { company } = req.query; // Get the company name from query parameters

        if (!company) {
            return res.status(400).json({ error: "Company name is required" });
        }

        const db = await connectToDb();
        const jobs = await db.collection('jobs').find({ company }).toArray();

        if (jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found for this company" });
        }

        res.status(200).json(jobs); // Return the list of jobs for the specified company
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update a job by ID
router.put('/api/jobs/:jobId', async (req, res) => {
    try {
        const { jobId } = req.params;
        const { title, company, location, description } = req.body;

        // Validate required fields
        if (!title || !company || !location || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const db = await connectToDb();
        const updatedJob = await db.collection('jobs').findOneAndUpdate(
            { _id: new ObjectId(jobId) },
            { $set: { title, company, location, description, updatedAt: new Date() } },
            { returnDocument: 'after' } // Option to return the updated document
        );

        if (!updatedJob.value) {
            return res.status(404).json({ error: "Job not found" });
        }

        res.status(200).json(updatedJob.value);
    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete a job by ID
router.delete('/api/jobs/:jobId', async (req, res) => {
    try {
        const { jobId } = req.params;
        const db = await connectToDb();

        const result = await db.collection('jobs').deleteOne({ _id: new ObjectId(jobId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Job not found" });
        }

        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get activities (combined jobs and applications information)
router.get('/api/activities', async (req, res) => {
    try {
        const db = await connectToDb();

        // Fetch jobs and applications
        const jobs = await db.collection('jobs').find({}).toArray();
        const applications = await db.collection('applications').find({}).toArray();

        // Combine data for activities
        const activities = jobs.map(job => {
            const relatedApplications = applications.filter(app => app.jobId === job._id.toString());
            return {
                job: {
                    id: job._id,
                    title: job.title,
                    company: job.company,
                    location: job.location,
                    description: job.description,
                    createdAt: job.createdAt,
                },
                applications: relatedApplications.map(app => ({
                    id: app._id,
                    applicant: app.applicant,
                    appliedAt: app.appliedAt,
                    status: app.applicant.approved, // Assuming 'approved' is a status field
                })),
            };
        });

        res.status(200).json(activities); // Return the combined activities
    } catch (error) {
        console.error("Error fetching activities:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router;
