// pages/api/updateDonation.js
import connectDB from "../../lib/connectdb";
import User from "../../models/user"; // Adjust this path according to your setup

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { name, donation } = req.body;

      console.log("Received Data:", name, donation); // Log to check received data

      // Update or create the user in the database
      const user = await User.findOneAndUpdate(
        { name: name }, // Search by username
        { $set: { donation: donation } }, // Update the donation field
        { new: true, upsert: true } // Create a new user if one doesn't exist
      );

      res.status(200).json({ message: "User updated", user });
    } catch (error) {
      console.error("Error updating/creating user:", error);
      res.status(500).json({ message: "Error updating user" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
  console.log("Request Body:", req.body);
}
