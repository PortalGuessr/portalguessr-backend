import { Router } from "express";
import Chamber from "../../models/chamber/chamber.js";
import { shuffleArray } from "../../utils/shuffleArray.js";
import { convertToEndpoints } from "../../utils/convertToEndpoints.js";

const router = Router();

// Get all chambers.
// ! GET /chambers
router.get("/", async (req, res) => {
  try {
    const result = await Chamber.find();

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

// Get a specific chamber.
// ! GET /chambers/<id>
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Chamber.findById(id);

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

// Get a random chamber, amount is the parameter for how much do we want to retrieve.
// ! GET /chambers/random/<amount>
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

// Get a random number based on the difficulty.
// ! GET /chambers/random/<amount>/<difficulty>
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

// Post a new chamber.
// ! POST /chambers/new
router.post("/new", async (req, res) => {
  try {
    const { url, difficulty, answer, bhHash } = req.body;

    const newChamber = new Chamber({
      url,
      difficulty,
      answer,
      bhHash,
    });
    const result = await newChamber.save();

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

// Delete a chamber.
// ! DELETE /chambers/<id>
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Chamber.findByIdAndDelete(id);

    res.json(result);
  } catch (error) {
    res.status(400).json({ errno: 400, error });
  }
});

// Edit an image.
// ! PATCH /chambers/<id>
router.patch("/:id", async (req, res) => {
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
