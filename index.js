/* 
================================================================================
Copyright (c) 2023 XnonXte
This project is released under MIT License.
GitHub repo: https://github.com/PortalGuessr/PortalGuessr-Backend
================================================================================
*/

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import chamberRoute from "./routes/chamber/chamber.js";
import statisticRoute from "./routes/bot/statistic.js";
import historyRoute from "./routes/bot/history.js";
import submissionRoute from "./routes/bot/submission.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/chambers", chamberRoute);
app.use("/bot/lb", statisticRoute);
app.use("/bot/histories", historyRoute);
app.use("/bot/submissions", submissionRoute);

dotenv.config();
const DATABASE_URI = process.env.MONGODB_DATABASE_URL;
const PORT = process.env.SERVER_PORT || 443;

const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
const IMGBB_URL = process.env.IMGBB_URL;

export { IMGBB_API_KEY, IMGBB_URL };

// Connecting to MongoDB then establishing a connection.
async function main(url, port) {
  try {
    connectMongoDB(url);

    await new Promise((resolve, reject) => {
      mongoose.connection.on("open", resolve).on("error", reject);
    });

    startServer(port);
  } catch (error) {
    console.error(error.message);
  }
}

async function connectMongoDB(url) {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.error(error.message);
  }
}

function startServer(port) {
  app.listen(port, () => {
    console.log(
      `Database connected! - Server connection has been established on PORT: ${port}`
    );
  });
}

main(DATABASE_URI, PORT);
