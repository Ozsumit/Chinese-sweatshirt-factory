import connectDB from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    await connectDB();
    res.status(200).json({ message: "Connected to MongoDB successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to connect to MongoDB", details: error.message });
  }
}
