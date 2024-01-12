const API_KEY = process.env.API_KEY;

export function authenticateApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== API_KEY) {
    return res
      .status(401)
      .json({ errno: 401, error: "You're not authorized!" });
  }

  next();
}
