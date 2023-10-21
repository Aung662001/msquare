import express, { NextFunction, Request, Response } from "express";
require("dotenv").config();
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import registerRouter from "./routes/user.route";
import { ErrorMiddleware } from "./middleware/error";
import courseRouter from "./routes/course.route";
import OrderRouter from "./routes/order.route";
import NotificationRouter from "./routes/notification.route";
import AnalyticsRouter from "./routes/analytics.route"

export const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
//cors
app.use(
  cors({
    origin: ["http://localhost:5000"],
  })
);

app.use("/api/v1", registerRouter,courseRouter,OrderRouter,NotificationRouter,AnalyticsRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "Test.html"));
  } else {
    res.json({ message: "Server is working" });
  }
});

app.use(ErrorMiddleware);

app.all("*", (req: Request, res: Response) => {
  res.status(403);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else {
    res.json({ message: "404 not found" });
  }
});
