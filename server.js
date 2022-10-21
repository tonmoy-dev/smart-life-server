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


app.get('/', (req, res) => {
  res.send('Smart Tech Shop!!')
})

app.listen(port, () => {
    console.log(`Example app listening at ${port}`);
})