import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(418).json({ message: "Feature haven't been implemented!" });
});

export default router;
