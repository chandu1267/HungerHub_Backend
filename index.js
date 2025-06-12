const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = 8080;
const body_parser = require("body-parser");
const vendorRoutes = require("./routes/vendorRoutes");
const firmRoutes = require("./routes/firmRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const path = require('path');

const mongoose = require("mongoose");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongodb is Connected "))
  .catch((err) => console.log(err));

app.use(body_parser.json());
app.use("/vendor", vendorRoutes);
app.use("/firm",firmRoutes);
app.use("/product",productRoutes);
app.use("uploads/",express.static('/uploads'));


app.listen(port, () => {
  console.log(`This server running on ${port}`);
});
