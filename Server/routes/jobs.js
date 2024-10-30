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
        const { firstName, lastName, email, phone } = req.body;

        if (!firstName || !lastName || !email || !phone) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const db = await connectToDb();
        const application = {
            jobId,
            applicant: { firstName, lastName, email, phone },
            appliedAt: new Date(),
        };

        const result = await db.collection('applications').insertOne(application);
        res.status(201).json({ message: "Application submitted successfully", id: result.insertedId });
    } catch (error) {
        console.error("Error submitting application:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get applications by email
router.get('/api/applications', async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ error: "Applicant email is required" });
        }

        const db = await connectToDb();
        const applications = await db.collection('applications').find({ "applicant.email": email }).toArray();
        res.status(200).json({ applications });
    } catch (error) {
        console.error("Error fetching applications:", error);
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

module.exports = router;
