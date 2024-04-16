const express = require('express');
const cors = require('cors');
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.port || 8000;

app.use(cors());
app.use(express.json());

// personal-server
// a63BWIaOHEbbNlLc


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gry2hbo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const awardsCollection = client.db("sohelDB").collection("awards");
        const researchCollection = client.db("sohelDB").collection("researches");
        const bookChapterCollection = client.db("sohelDB").collection("bookChapters");
        const grantsCollection = client.db("sohelDB").collection("grants");
        
        app.get("/researches", async(req, res) => {
            const cursor = researchCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });
        app.get("/awards", async(req, res) => {
            const cursor = awardsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });
        app.get("/bookchapters", async(req, res) => {
            const cursor = bookChapterCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });
        app.get("/grants", async(req, res) => {
            const cursor = grantsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Personal Website server running");
});

app.listen(port, () => {
    console.log("Server is Running on port: ", port);
})