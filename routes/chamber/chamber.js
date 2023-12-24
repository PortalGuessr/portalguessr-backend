import { Router } from "express";
import Chamber from "../../models/chamber/chamber.js";
import { shuffleArray } from "../../utils/shuffleArray.js";
import { convertToEndpoints } from "../../utils/convertToEndpoints.js";
import { authenticateApiKey } from "../../middlewares/authenticate.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await Chamber.find();

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Chamber.findById(id);

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.get("/random/:amount", async (req, res) => {
  const amount = req.params.amount;
  const query = { $sample: { size: parseInt(amount) } };

  try {
    const result = await Chamber.aggregate([query]);

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.get("/random/:amount/:difficulty", async (req, res) => {
  try {
    const amount = req.params.amount;
    const difficulty = req.params.difficulty;
    const difficultyContinuation = convertToEndpoints(difficulty);
    const result = await Chamber.find({ difficulty: difficultyContinuation });
    const shuffledResult = shuffleArray(result);
    const slicedResult = shuffledResult.slice(0, amount);

    res.json(slicedResult);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.post("/new", authenticateApiKey, async (req, res) => {
  try {
    const { url, difficulty, answer, bhHash, submitter } = req.body;

    const newChamber = new Chamber({
      url,
      difficulty,
      answer,
      bhHash,
      submitter,
    });
    const result = await newChamber.save();

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.delete("/:id", authenticateApiKey, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Chamber.findByIdAndDelete(id);

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

router.patch("/:id", authenticateApiKey, async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const result = await Chamber.findByIdAndUpdate(id, {
      ...body,
      updatedStamp: Math.floor(Date.now() / 1000),
    });

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

export default router;
