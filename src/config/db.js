const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const dbName = "Nucleon";

let dbClient;
let db;
async function connectDB() {
  if (dbClient) return db;

  dbClient = new MongoClient(uri);

  try {
    await dbClient.connect();
    console.log("Connected to DB");
    db = dbClient.db(dbName);
    return db;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

function getDB() {
  if (!db) throw new Error("Database connection failed.");
  return db;
}


module.exports = { connectDB, getDB };
