/**
 * Convert to continuation of the type GuessrDifficulty.
 * @param {"e"|"m"|"h"|"vh"} difficulty - the difficulty (e/m/h/vh).
 */
export function convertToEndpoints(difficulty) {
  let difficultyContinuation;

  switch (difficulty) {
    case "e":
      difficultyContinuation = "Easy";
      break;
    case "m":
      difficultyContinuation = "Medium";
      break;
    case "h":
      difficultyContinuation = "Hard";
      break;
    case "vh":
      difficultyContinuation = "Very Hard";
      break;
  }

  return difficultyContinuation;
}
