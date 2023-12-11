import { Router } from "express";
import Score from "../models/bot/score.js";

const router = Router();

// Get all scores from leaderboard.
// ! GET /pgbot-leaderboard/
router.get("/", async (req, res) => {
  try {
    const response = await Score.find();

    res.json(response);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

// Get a single score from leaderboard.
// ! GET /pgbot-leaderboard/<discordUserId>/
router.get("/:discordUserId", async (req, res) => {
  try {
    const discordUserId = req.params.discordUserId;
    const response = await Score.findOne({ discordUserId });

    res.json(response);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

// Add a new score to the leaderboard.
// ! POST /pgbot-leaderboard/<discordUserId>/
router.post("/:discordUserId", async (req, res) => {
  try {
    const discordUserId = req.params.discordUserId;
    const scores = req.body.scores;

    const newScore = new Score({
      discordUserId,
      scores,
    });

    const response = await newScore.save();

    res.json(response);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

// Delete an already existing score from leaderboard.
// ! DELETE /pgbot-leaderboard/<discordUserId>/
router.delete("/:discordUserId", async (req, res) => {
  try {
    const discordUserId = req.params.discordUserId;
    const response = await Score.deleteOne({ discordUserId });

    res.json(response);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

// Edit an already existing score from leaderboard.
// ! PATCH /pgbot-leaderboard/<discordUserId>/
router.patch("/:discordUserId", async (req, res) => {
  try {
    const discordUserId = req.params.discordUserId;
    const scores = req.body.scores;
    const updatedDate = new Date();

    const { id } = await Score.findOne({ discordUserId });
    const response = await Score.findByIdAndUpdate(id, { scores, updatedDate });

    res.json(response);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

export default router;
