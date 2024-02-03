const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/AuthRoutes");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// We are connecting this node.js app with mongodb by using mongoose connect method
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster2024.wc0g5os.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

// app.use(): This method in Express.js is used to mount middleware functions or middleware routers in the application's request processing pipeline.

app.use(cors());

app.use(cookieParser());
// This line adds the cookieParser middleware to your Express application. cookieParser is a middleware that parses cookies attached to the client's request and makes them available in the req.cookies object. It simplifies working with cookies in your application.

app.use(express.json());
//  This line adds the express.json() middleware to your Express application. When a client sends a request with a JSON payload (e.g., in a POST or PUT request), this middleware parses the JSON data and makes it available in req.body for further processing in your route handlers.

app.use("/", authRoutes);
// authRoutes: This is a router that will be executed for requests matching the root path ('/'). authRoutes is a router object created using express.Router()

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
