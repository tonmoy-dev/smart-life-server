const express = require("express");
const app = express();
const cors = require("cors");
const corsConfig = {
  origin: "*",
  credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.options("", cors(corsConfig));
app.use(cors(corsConfig));
const connectDb = require("./config/db.js");
require("dotenv").config();
const productRoutes = require("./routes/productRoutes.js");
const port = process.env.PORT || 5000;

// connect database
connectDb();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect routers
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to SmartLife Backend Server!!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
