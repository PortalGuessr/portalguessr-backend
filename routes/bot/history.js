import { Router } from "express";
import History from "../../models/bot/history.js";
import { authenticateApiKey } from "../../middlewares/authenticate.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const amount = req.query.amount;
    const start = req.query.start;
    const ascending = req.query.order === "asc" ? 1 : -1;

    const result = await History.find()
      .sort({ createdStamp: ascending })
      .skip(start)
      .limit(amount);

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.get("/:historyId", async (req, res) => {
  try {
    const historyId = req.params.historyId;
    const result = await History.findOne({ historyId });

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.post("/", authenticateApiKey, async (req, res) => {
  try {
    const {
      total,
      solved,
      timeout,
      skipped,
      mvp,
      participators,
      chambers,
      prompterUserId,
      difficulty,
    } = req.body;
    const newHistory = new History({
      total,
      solved,
      timeout,
      skipped,
      mvp,
      participators,
      chambers,
      prompterUserId,
      difficulty,
    });
    const result = await newHistory.save();

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.patch("/:historyId", authenticateApiKey, async (req, res) => {
  try {
    const historyId = req.params.historyId;
    const {
      total,
      solved,
      timeout,
      skipped,
      mvp,
      participators,
      chambers,
      prompterUserId,
      difficulty,
    } = req.body;
    const result = await History.findOneAndUpdate(
      { historyId },
      {
        total,
        solved,
        timeout,
        skipped,
        mvp,
        participators,
        chambers,
        prompterUserId,
        difficulty,
        updatedStamp: Math.floor(Date.now() / 1000),
      }
    );

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.delete("/:historyId", authenticateApiKey, async (req, res) => {
  try {
    const historyId = req.params.historyId;
    const result = await History.findOneAndDelete({ historyId });

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

export default router;
