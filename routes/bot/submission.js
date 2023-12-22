import { Router } from "express";
import Submission from "../../models/chamber/submission.js";
import { convertToHash } from "../../utils/convertToHash.js";
import { isBlurhashValid } from "blurhash";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await Submission.find();

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

router.post("/", async (req, res) => {
  try {
    const { url, answer, difficulty, submitter } = req.body;

    const bhHash = await convertToHash(url);

    if (!isBlurhashValid(bhHash)) {
      res.status(500).json({
        errno: 500,
        error: `Internal server error! Blurhash invalid! bhHash: ${bhHash}`,
      });

      return;
    }

    const newSubmission = new Submission({
      url,
      answer,
      difficulty,
      bhHash,
      submitter,
    });
    const result = await newSubmission.save();

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.patch("/:submissionId", async (req, res) => {
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

router.delete("/:submissionId", async (req, res) => {
  try {
    const submissionId = req.params.submissionId;
    const result = await Submission.findOneAndDelete({ submissionId });

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

export default router;
