require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jobsRouter = require('./routes/jobs');
const { connectToDb } = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Use express.json() instead of body-parser

// Use the jobs routes
app.use(jobsRouter);

// Connect to database on app startup
(async () => {
    try {
        await connectToDb();
        app.listen(port, () => console.log(`Server listening on port ${port}`));
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
})();
