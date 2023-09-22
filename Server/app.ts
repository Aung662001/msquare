import express, { NextFunction, Request, Response } from "express";
require("dotenv").config();
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { ErrorMiddleware } from "./middleware/error";
import registerRouter from "./routes/user.route";

export const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
//cors
app.use(
  cors({
    origin: ["http://localhost:5000"],
  })
);

//regisger user route
app.use("/api/v1", registerRouter);

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  throw new Error("test error");
});

app.use(ErrorMiddleware);

app.all("*", (req: Request, res: Response) => {
  res.status(403);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  }
});
