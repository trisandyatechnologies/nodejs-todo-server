const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/todoapp";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("todoapp");
    const collection = db.collection("todos");

    // Find the first document in the collection
    const first = await collection.insertMany([
      { text: "First Todo", active: true },
      { text: "Second Todo", active: true },
      { text: "Third Todo", active: true },
      { text: "Fourth Todo", active: true },
    ]);
    console.log(first);
  } finally {
    // Close the database connection when finished or an error occurs
    await client.close();
  }
}

run();

module.exports = client;
