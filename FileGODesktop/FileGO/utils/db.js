const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://user:P8YdloVSn3k8Iia8@users.xzbd8u1.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const client = new MongoClient(uri, {
      maxIdleTimeMS: 80000,
      serverSelectionTimeoutMS: 80000,
      connectTimeoutMS: 80000, // Adjust the value as needed
    });

    await client.connect();
    console.log("MongoDB connected");

    const db = client.db(); // Get the database object

    // Listen for connection events
    client.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });
    client.on("close", () => {
      console.log("MongoDB connection closed");
    });

    // Optionally, you can also listen for the "open" event if needed
    // client.on("open", () => {
    //   console.log("MongoDB connection opened");
    // });

    // Perform any further operations with the "db" object
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // Set exit code to 1 (failure)
    process.exitCode = 1;
  }
};

module.exports = connectDB;
