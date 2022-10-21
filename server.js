const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require('./config/db.js');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000;

// connect database
connectDb();

// middleware
app.use(cors());
app.use(express.json())

/*
const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@cluster0.dn7ou.mongodb.net/
Smart_Tech_Shop?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
*/


async function run() {
    try {
        /*
		await client.connect();
        console.log('database connected');
        const database = client.db('Smart_Tech_Shop');
        const productsCollection = database.collection('products');
        const ordersCollection = database.collection('orders');
        const usersCollection = database.collection('users');
        const customerReviewsCollection = database.collection('customerReviews');
		*/

        // Load all products
        app.get('/products', async (req, res) => {
            const cursor = productsCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        });

        // get single product
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await productsCollection.findOne(query);
            res.json(product);
        });

        // add single product
        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await productsCollection.insertOne(product);
            res.json(result);
        });

        // Load all orders
        app.get('/orders', async (req, res) => {
            const cursor = ordersCollection.find({});
            const orders = await cursor.toArray();
            res.send(orders);
        });

        // load specific user orders
        app.get('/orders/:email', async (req, res) => {
            const email = req.params.email;
            const orders = await ordersCollection.find({ email }).toArray();
            res.json(orders);
        });

        // add new order
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await ordersCollection.insertOne(order);
            res.json(result);
        });

        // delete an order
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.deleteOne(query);
            res.json(result);
        });

        // load user as admin or not
        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            let isAdmin = false;
            if (user?.role === 'admin') {
                isAdmin = true;
            }
            res.json({ admin: isAdmin });
        })

        // add an user
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.json(result);
        });

        // update user
        app.put('/users', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email };
            const options = { upsert: true };
            const updateDoc = { $set: user };
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            res.json(result);
        });

        // make admin
        app.put('/users/admin', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email };
            const updateDoc = { $set: { role: 'admin' } };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.json(result);
        });

        // Load all customer reviews
        app.get('/customerReviews', async (req, res) => {
            const cursor = customerReviewsCollection.find({});
            const customerReviews = await cursor.toArray();
            res.json(customerReviews);
        });

        // add new customer review
        app.post('/customerReviews', async (req, res) => {
            const review = req.body;
            const result = await customerReviewsCollection.insertOne(review);
            res.json(result);
        });

    }
    finally {
        // Ensures that the client will close when you finish/error.
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Smart Tech Shop!')
})

app.listen(port, () => {
    console.log(`Example app listening at ${port}`);
})