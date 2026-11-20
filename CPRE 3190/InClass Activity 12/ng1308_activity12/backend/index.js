/*
  Author: Nakshatra Gupta
  ISU Netid: ng1308@iastate.edu
  Date: November 17th, 2026
  Activity 12 - Request Methods GET, POST, PUT, DELETE using Express and MongoDB
*/
var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const port = "8080";
const host = "localhost";

// Add MongoDB
const { MongoClient } = require("mongodb");

// Add Constants
const url = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
const dbName = "secoms319";
const client = new MongoClient(url);
const db = client.db(dbName);

// GET - read all robots
app.get("/listRobots", async (req, res) => {
  try {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
      .collection("robot")
      .find(query)
      .limit(100)
      .toArray();
    console.log(results);
    res.status(200).send(results);
  } catch (error) {
    console.error("Error reading robots:", error);
    res.status(500).send({ error: "An internal server error occurred" });
  }
});

// GET /:id - read one robot by its id
app.get("/:id", async (req, res) => {
  try {
    const robotid = Number(req.params.id);
    console.log("Robot to find :", robotid);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = { id: robotid };
    const results = await db.collection("robot").findOne(query);
    console.log("Results :", results);
    if (!results) res.status(404).send({ message: "Robot not found" });
    else res.status(200).send(results);
  } catch (error) {
    console.error("Error reading robot:", error);
    res.status(500).send({ error: "An internal server error occurred" });
  }
});

// POST - add a new robot
app.post("/addRobots", async (req, res) => {
  try {
    await client.connect();
    const newDocument = {
      id: Number(req.body.id),
      name: req.body.name,
      price: Number(req.body.price),
      description: req.body.description,
      imageUrl: req.body.imageUrl,
    };

    if (Number.isNaN(newDocument.id) || Number.isNaN(newDocument.price)) {
      return res.status(400).send({ error: "id and price must be numbers" });
    }

    // 409 Conflict if a robot with the same id already exists
    const existing = await db.collection("robot").findOne({ id: newDocument.id });
    if (existing) {
      return res
        .status(409)
        .send({ error: `A robot with id ${newDocument.id} already exists` });
    }

    console.log(newDocument);
    const result = await db.collection("robot").insertOne(newDocument);
    res.status(200).send(result);
  } catch (error) {
    console.error("Could not add the new Robot " + error);
    res.status(500).send({ error: "Error adding new robot" });
  }
});

// PUT - update an existing robot (e.g. its price) by id
app.put("/updateRobot/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const query = { id: id };
    await client.connect();
    console.log("Robot to Update :", id);

    // Data for updating the document comes from the request body.
    // Only the attributes that were sent are changed, so a body of
    // { "price": 48.90 } modifies just the price.
    console.log(req.body);
    const fields = {};
    if (req.body.name !== undefined && req.body.name !== "") fields.name = req.body.name;
    if (req.body.price !== undefined && req.body.price !== "") fields.price = Number(req.body.price);
    if (req.body.description !== undefined && req.body.description !== "")
      fields.description = req.body.description;
    if (req.body.imageUrl !== undefined && req.body.imageUrl !== "")
      fields.imageUrl = req.body.imageUrl;

    if (Object.keys(fields).length === 0) {
      return res.status(400).send({ message: "No attributes to update" });
    }
    if (fields.price !== undefined && Number.isNaN(fields.price)) {
      return res.status(400).send({ message: "price must be a number" });
    }

    const updateData = { $set: fields };
    const options = {};
    const results = await db.collection("robot").updateOne(query, updateData, options);

    // If no document was found to update, send a 404
    if (results.matchedCount === 0) {
      return res.status(404).send({ message: "Robot not found" });
    }

    // Send back the robot data just updated
    const robotUpdated = await db.collection("robot").findOne(query);
    res.status(200).send(robotUpdated);
  } catch (error) {
    console.error("Error updating robot:", error);
    res.status(500).send({ error: "An internal server error occurred" });
  }
});

// DELETE - remove a robot by id
app.delete("/deleteRobot/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await client.connect();
    console.log("Robot to delete :", id);
    const query = { id: id };
    // read data from robot to delete to send it to frontend
    const robotDeleted = await db.collection("robot").findOne(query);
    if (robotDeleted) {
      // delete
      await db.collection("robot").deleteOne(query);
      res.status(200).send(robotDeleted);
    } else {
      res.status(404).send({ message: "Robot Not Found" });
    }
  } catch (error) {
    console.error("Error deleting robot:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});
