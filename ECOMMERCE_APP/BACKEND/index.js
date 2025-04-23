require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(express.json());

var corsOptions = {
  origin: "http://localhost:4200",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  //credentials: true,
};
app.use(cors(corsOptions));

// Routes
const inventoryRoutes = require("./routing/inventoryRoutes");
app.use("/api", inventoryRoutes);

const productRoutes = require("./routing/productRoutes");
app.use("/api", productRoutes);

const cartRoutes = require("./routing/cartRoute");
app.use('/api', cartRoutes);

const checkoutRoutes = require("./routing/checkoutRoute");
app.use('/api', checkoutRoutes);

//Mongo DB connection

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
.then(() => console.log("✅ Connected to MongoDB Atlas!"))
.catch(err => console.error("❌ Error connecting to MongoDB:", err));

app.get('/', (req, res) => {
  res.send('Server and DB are working!');
});

app.listen(4100, () => {
  console.log("Server is running on http://localhost:4100");
});
