import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  donation: { type: Number, required: true }, // Correct type for floats
  // Add other fields as necessary
});

// Use a consistent model name
const Leaderboard =
  mongoose.models.Leaderboard ||
  mongoose.model("Leaderboard", leaderboardSchema);

export default Leaderboard;
