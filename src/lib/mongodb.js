import mongoose from "mongoose";

const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    // If a connection is already established, use that
    return mongoose;
  }

  // Otherwise, establish a new connection
  const db = await mongoose.connect(
    "mongodb+srv://paluser:paluser@palscluster.d9vi3.mongodb.net/palDB"
  );
  console.log("MongoDB connected");
  return db;
};

export default connectToDatabase;
