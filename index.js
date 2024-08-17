const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const app = express()
require('dotenv').config();
const cors = require('cors')
const port = process.env.port || 5000


// MIDDLEWAREs

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5000',
        'https://gadgetry-7f6df.web.app',
        'https://gadgetry-7f6df.firebaseapp.com'
        // 'https://book-nest-d0b87.web.app',
        // 'book-nest-d0b87.firebaseapp.com'
    ],
    // credentials: true
}))
app.use(express.json())



// Mongodb connection
const username = process.env.DB_USER
const password = process.env.DB_PASS

const uri = `mongodb+srv://${username}:${password}@cluster0.75ieoxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        // await client.connect();
        // Send a ping to confirm a successful connection


        const gadgetsCollection = client.db('Gadgetry').collection('gadgetsCollection')

        
        app.get('/gadgets', async(req, res) => {
            const result = await gadgetsCollection.find().toArray()
            res.send(result)
        })

        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})