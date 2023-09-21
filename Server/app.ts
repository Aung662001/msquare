import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: ["http://localhost:5000"],
  })
);
app.use(cookieParser());
