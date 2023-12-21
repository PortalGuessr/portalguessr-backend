import { Router } from "express";
import History from "../../models/bot/history.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await History.find();
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

router.post("/", async (req, res) => {
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
    });
    const result = await newHistory.save();
    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.patch("/:historyId", async (req, res) => {
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
        updatedStamp: Math.floor(Date.now() / 1000),
      }
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.delete("/:historyId", async (req, res) => {
  try {
    const historyId = req.params.historyId;
    const result = await History.findOneAndDelete({ historyId });
    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

export default router;
