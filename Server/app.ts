import express, { Request, Response } from "express";
require("dotenv").config();
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

export const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5000"],
  })
);

app.all("*", (req: Request, res: Response) => {
  res.status(403);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  }
});
