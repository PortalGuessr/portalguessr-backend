import mongoose from "mongoose";
import { generateDocumentId } from "../../utils/generateDocumentId.js";

const SubmissionSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "pending",
  },
  url: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    require: true,
  },
  submissionId: {
    type: String,
    default: () => generateDocumentId("SB"),
  },
  submitter: {
    type: String,
    required: true,
  },
  bhHash: {
    type: String,
    default: () => `placeholder-${generateDocumentId("BH")}`,
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

const Submission = mongoose.model("Submission", SubmissionSchema);

export default Submission;
