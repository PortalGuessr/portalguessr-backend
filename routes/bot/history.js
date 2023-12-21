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
    const { totalGuessrs, finishedGuessrs, chambersHistory, sessionHistory } =
      req.body;
    const newHistory = new History({
      totalGuessrs,
      finishedGuessrs,
      chambersHistory,
      sessionHistory,
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
    const { totalGuessrs, finishedGuessrs, chambersHistory, sessionHistory } =
      req.body;
    const result = await History.findOneAndUpdate(
      { historyId },
      {
        totalGuessrs,
        finishedGuessrs,
        chambersHistory,
        sessionHistory,
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
