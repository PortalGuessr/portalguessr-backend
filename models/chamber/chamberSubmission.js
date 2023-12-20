import mongoose from "mongoose";
import crypto from "crypto";

const ChamberSubmissionSchema = new mongoose.Schema({
  submissionUrl: {
    type: String,
    required: true,
    unique: true,
  },
  submissionId: {
    type: String,
    required: true,
    unique: true,
    default: `${crypto.randomBytes(8).toString("hex")}-${new Date(Date.UTC())}`,
  },
  submissionUserId: {
    type: Number,
    unique: true,
    default: crypto.randomBytes(8).readUint32LE(0),
  },
  submissionUserDiscordId: {
    type: Number,
    unique: true,
    default: crypto.randomBytes(8).readUint32LE(0),
  },
  createdDate: {
    type: Date,
    required: true,
    default: new Date(Date.UTC()),
  },
  updatedDate: {
    type: Date,
    required: true,
    default: new Date(Date.UTC()),
  },
});

const ChamberSubmission = mongoose.model(
  "ChamberSubmission",
  ChamberSubmissionSchema
);

export default ChamberSubmission;
