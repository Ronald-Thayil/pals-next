import mongoose from "mongoose";
const databaseUrl = process.env.DATABASE_URL;

const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    // If a connection is already established, use that
    return mongoose;
  }

  // Otherwise, establish a new connection
  const db = await mongoose.connect(databaseUrl);
  console.log("MongoDB connected");
  return db;
};

export default connectToDatabase;
