const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const password = process.env.PASSWORD;
const uri = `mongodb+srv://preston176:${password}@cluster0.kb8ks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

let dbInstance;

async function connectToDb() {
    if (!dbInstance) {
        try {
            const client = await MongoClient.connect(uri, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                },
            });
            console.log("Connected to MongoDB successfully!");
            dbInstance = client.db("jobs"); // Replace with your database name
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error; // Re-throw the error to handle it in your Express app
        }
    }
    return dbInstance;
}

module.exports = { connectToDb };
