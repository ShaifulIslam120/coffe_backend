const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

const uri = `mongodb+srv://${process.env.SECRET_KEY}:${process.env.SECRET_HASH}@cluster0.uxwhh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("coffeeShop");
    const collection = db.collection("coffees");

    // POST endpoint to add coffee
    app.post('/addcoffe', async (req, res) => {
      const { coffeeName, availableQuantity, category, supplierName, details, photoUrl } = req.body;

      try {
        const newCoffee = { coffeeName, availableQuantity, category, supplierName, details, photoUrl };
        await collection.insertOne(newCoffee);
        res.status(201).send('Coffee added successfully');
      } catch (error) {
        res.status(500).send('Failed to add coffee');
      }
    });

    // GET endpoint to retrieve all coffees
    app.get('/addcoffe', async (req, res) => {
      try {
        const coffees = await collection.find({}).toArray(); // Get all coffees from the database
        res.status(200).json(coffees); // Send the coffee list as a response
      } catch (error) {
        res.status(500).send('Failed to retrieve coffees');
      }
    });

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Coffee server is running');
});

app.listen(port, () => {
  console.log(`Coffee server is running on port: ${port}`);
});
