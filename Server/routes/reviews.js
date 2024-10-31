const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb } = require('../config/db');

const router = express.Router();

// Add a review
router.post('/api/reviews', async (req, res) => {
    try {
        const { name, review, rating } = req.body;

        // Validate input
        if (!name || !review || !rating) {
            return res.status(400).json({ error: "Name, review, and rating are required" });
        }

        const db = await connectToDb();
        const newReview = {
            name,
            review,
            rating,
            createdAt: new Date(),
        };

        const result = await db.collection('reviews').insertOne(newReview);
        res.status(201).json({ id: result.insertedId, ...newReview });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get all reviews
router.get('/api/reviews', async (req, res) => {
    try {
        const db = await connectToDb();
        const reviews = await db.collection('reviews').find({}).toArray();
        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get a single review by ID
router.get('/api/reviews/:reviewId', async (req, res) => {
    try {
        const { reviewId } = req.params;
        const db = await connectToDb();

        const review = await db.collection('reviews').findOne({ _id: new ObjectId(reviewId) });

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.json(review);
    } catch (error) {
        console.error("Error fetching review:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update a review by ID
router.put('/api/reviews/:reviewId', async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { name, review, rating } = req.body;

        // Validate required fields
        if (!name && !review && !rating) {
            return res.status(400).json({ error: "At least one field is required to update" });
        }

        const db = await connectToDb();
        const updatedReview = await db.collection('reviews').findOneAndUpdate(
            { _id: new ObjectId(reviewId) },
            { $set: { name, review, rating, updatedAt: new Date() } },
            { returnDocument: 'after' } // Option to return the updated document
        );

        if (!updatedReview.value) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json(updatedReview.value);
    } catch (error) {
        console.error("Error updating review:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete a review by ID
router.delete('/api/reviews/:reviewId', async (req, res) => {
    try {
        const { reviewId } = req.params;
        const db = await connectToDb();

        const result = await db.collection('reviews').deleteOne({ _id: new ObjectId(reviewId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
