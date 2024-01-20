import { Router } from "express";
import Submission from "../../models/chamber/submission.js";
import { convertToHash } from "../../utils/convertToHash.js";
import { authenticateApiKey } from "../../middlewares/authenticate.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const amount = req.query.amount;
    const start = req.query.start;
    const ascending = req.query.order === "asc" ? 1 : -1;

    const result = await Submission.find()
      .sort({ createdStamp: ascending })
      .skip(start)
      .limit(amount);

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.get("/:submissionId", async (req, res) => {
  try {
    const submissionId = req.params.submissionId;
    const result = await Submission.findOne({ submissionId });

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.get("/status/:status", async (req, res) => {
  try {
    const status = req.params.status;
    const result = await Submission.find({ status });

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.post("/", authenticateApiKey, async (req, res) => {
  try {
    const { url, answer, difficulty, submitter } = req.body;
    const bhHash = await convertToHash(url);

    const newSubmission = new Submission({
      url,
      answer,
      difficulty,
      submitter,
      bhHash,
    });
    const result = await newSubmission.save();

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.patch("/:submissionId", authenticateApiKey, async (req, res) => {
  try {
    const submissionId = req.params.submissionId;
    const status = req.body.status;
    const result = await Submission.findOneAndUpdate(
      { submissionId },
      { status }
    );

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.delete("/:submissionId", authenticateApiKey, async (req, res) => {
  try {
    const submissionId = req.params.submissionId;
    const result = await Submission.findOneAndDelete({ submissionId });

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

export default router;
