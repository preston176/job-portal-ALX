require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS package
const MongoClient = require('mongodb').MongoClient;
const ServerApiVersion = require('mongodb').ServerApiVersion;
const { ObjectId } = require('mongodb');

const app = express();
const password = process.env.PASSWORD;
const port = process.env.PORT || 3000; // Use environment variable for port or default to 3000

// Replace with your actual MongoDB connection details (ensure security!)
const uri = `mongodb+srv://preston176:${password}@cluster0.kb8ks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse incoming JSON data for requests

async function connectToDb() {
    try {
        const client = await MongoClient.connect(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        console.log("Connected to MongoDB successfully!");
        return client.db("jobs"); // Replace with your database name
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Re-throw the error to potentially handle it in your Express app
    }
}

// Example route to perform a basic operation (replace with your specific logic)
app.get('/ping-db', async (req, res) => {
    try {
        const db = await connectToDb();
        const result = await db.command({ ping: 1 });
        console.log("Pinged database:", result);
        res.json({ message: "Successfully pinged MongoDB!" });
    } catch (error) {
        console.error("Error pinging database:", error);
        res.status(500).json({ error: "Internal Server Error" }); // Handle errors gracefully
    }
});

// Get jobs list from the server
app.get('/api/jobs', async (req, res) => {
    try {
        const db = await connectToDb();
        const jobs = await db.collection('jobs').find({}).toArray(); // Adjust 'jobs' to your collection name
        res.json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// Apply for job route
// Job application route
app.post('/api/jobs/:id/apply', async (req, res) => {
    try {
        const jobId = req.params.id; // Get job ID from URL
        const { firstName, lastName, email, phone } = req.body;

        // Ensure all fields are present
        if (!firstName || !lastName || !email || !phone) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const db = await connectToDb();
        const application = {
            jobId,
            applicant: {
                firstName,
                lastName,
                email,
                phone
            },
            appliedAt: new Date() // Timestamp for the application
        };

        const result = await db.collection('applications').insertOne(application); // Store in 'applications' collection
        res.status(201).json({ message: "Application submitted successfully", id: result.insertedId });
    } catch (error) {
        console.error("Error submitting application:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// get single applicants application
app.get('/api/applications', async (req, res) => {
    try {
        const { email } = req.query; // Get applicant email from query parameters

        // Ensure email is provided
        if (!email) {
            return res.status(400).json({ error: "Applicant email is required" });
        }

        const db = await connectToDb();

        // Find applications where the applicant's email matches
        const applications = await db.collection('applications').find({ "applicant.email": email }).toArray();

        res.status(200).json({ applications });
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Add jobs route
app.post('/api/jobs', async (req, res) => {
    try {
        const { title, company, location, description } = req.body;

        // Ensure all fields are present
        if (!title || !company || !location || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const db = await connectToDb();
        const newJob = {
            title,
            company,
            location,
            description,
            createdAt: new Date() // Optional: add a timestamp
        };

        const result = await db.collection('jobs').insertOne(newJob); // Adjust 'jobs' to your collection name
        res.status(201).json({ id: result.insertedId, ...newJob });
    } catch (error) {
        console.error("Error adding job:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/jobs/:jobId', async (req, res) => {
    try {
        const jobId = req.params.jobId; // Get the job ID from URL parameters
        const db = await connectToDb();

        // Fetch the job document with the matching job ID
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


// Connect to database on app startup and handle errors appropriately
(async () => {
    try {
        await connectToDb();
        app.listen(port, () => console.log(`Server listening on port ${port}`));
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1); // Exit with an error code if connection fails
    }
})();
