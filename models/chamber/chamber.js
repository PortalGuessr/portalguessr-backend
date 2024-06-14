import mongoose from "mongoose";
import { generateDocumentId } from "../../utils/generateDocumentId.js";

const ChamberSchema = new mongoose.Schema({
  fileId: {
    type: String,
    default: () => generateDocumentId("CH"),
  },
  submitter: {
    type: String,
    default: "706330866267193344", // My own ID on Discord.
  },
  url: {
    type: String,
    unique: true,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  bhHash: {
    type: String,
    default: () =>
      `placeholder-${crypto.randomBytes(6).toString("hex")}-${new Date()}`,
  },
  createdStamp: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000),
  },
  updatedStamp: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000),
  },
});
const Chamber = mongoose.model("Chamber", ChamberSchema);
export default Chamber;
