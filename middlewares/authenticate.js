const API_KEY = process.env.API_KEY;

export function authenticateApiKey(req, res, next) {
  // To make a request with this middleware in mind, put "x-api-key" in the request's headers.

  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== API_KEY) {
    return res
      .status(401)
      .json({ errno: 401, error: "You're not authorized!" });
  }

  next();
}
