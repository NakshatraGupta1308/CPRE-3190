/*
  Author: Nakshatra Gupta
  ISU Netid: ng1308@iastate.edu
  Date: November 17th, 2026
  Loads robots.json into the secoms319.robot collection (replaces existing data).
  Run with: npm run seed
*/
const { MongoClient } = require("mongodb");
const robots = require("./robots.json");

const url = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function seed() {
  try {
    await client.connect();
    const collection = client.db("secoms319").collection("robot");
    await collection.deleteMany({});
    const result = await collection.insertMany(robots);
    console.log(`Inserted ${result.insertedCount} robots into secoms319.robot`);
  } finally {
    await client.close();
  }
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
