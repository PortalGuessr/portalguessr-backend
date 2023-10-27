/* 
================================================================================
Copyright (c) 2023 XnonXte
This project is released under MIT License.
GitHub repo: https://github.com/XnonXte/PortalGuessr-FullStack
================================================================================
*/

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import chamberRoute from "./routes/chamber.route.js";
import userRouter from "./routes/user.route.js";

const app = express();
dotenv.config();

const PORT = process.env.SERVER_PORT;
const DATABASE_URI = process.env.MONGODB_DATABASE_URL;

// Connecting to MongoDB.
async function main() {
  try {
    await mongoose.connect(DATABASE_URI);
  } catch (error) {
    throw new Error(`An error occurred: ${error}`);
  }
}

main();

mongoose.connection
  .on("open", () => console.log("Database connected!"))
  .on("error", (err) => console.error(err.message));

app.use(cors());
app.use(express.json());

app.use("/chambers", chamberRoute);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}/`);
});
