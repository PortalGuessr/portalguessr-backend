import { Router } from "express";
import Statistic from "../../models/bot/statistic.js";
import { authenticateApiKey } from "../../middlewares/authenticate.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const amount = req.query.amount;
    const start = req.query.start;
    const ascending = req.query.order === "asc" ? true : false;
    const result = await Statistic.find();
    const sorted = result.slice().sort((user1, user2) => {
      const eloCountUser1 =
        user1.scores.Easy * 3 +
        user1.scores.Medium * 5 +
        user1.scores.Hard * 10 +
        user1.scores["Very Hard"] * 15;
      const eloCountUser2 =
        user2.scores.Easy * 3 +
        user2.scores.Medium * 5 +
        user2.scores.Hard * 10 +
        user2.scores["Very Hard"] * 15;
      return ascending
        ? eloCountUser1 - eloCountUser2
        : eloCountUser2 - eloCountUser1;
    });
    res.json(sorted.slice(start - 1, start - 1 + amount));
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
      { scores, updatedStamp: Math.floor(Date.now() / 1000) },
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

export default router;
