import { Router } from "express";
import Statistic from "../../models/bot/statistic.js";

const router = Router();

// Get all scores from Statistic.
// ! GET /bot/lb/
router.get("/", async (req, res) => {
  try {
    const result = await Statistic.find();
    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

// Get a single score from Statistic.
// ! GET /bot/lb/<userId>/
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await Statistic.findOne({ userId });
    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

// Add a new score to the Statistic.
// ! POST /bot/lb/<userId>/
router.post("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const scores = req.body.scores;
    const newScore = new Statistic({
      userId,
      scores,
    });
    const result = await newScore.save();
    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

// Delete an already existing score from Statistic.
// ! DELETE /bot/lb/<userId>/
router.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await Statistic.deleteOne({ userId });
    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

// Edit an already existing score from Statistic.
// ! PATCH /bot/lb/<userId>/
router.patch("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const scores = req.body.scores;
    const result = await Statistic.findOneAndUpdate(
      { userId },
      { scores, updatedStamp: Math.floor(Date.now() / 1000) }
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

export default router;
