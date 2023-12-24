import { Router } from "express";
import Statistic from "../../models/bot/statistic.js";
import { authenticateApiKey } from "../../middlewares/authenticate.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await Statistic.find();

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await Statistic.findOne({ userId });

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.post("/:userId", authenticateApiKey, async (req, res) => {
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

router.delete("/:userId", authenticateApiKey, async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await Statistic.deleteOne({ userId });

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.patch("/:userId", authenticateApiKey, async (req, res) => {
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
