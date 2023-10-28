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
import LayourRouter from "./routes/layout.route"

export const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
//cors
var whitelist = ['http://localhost:3000', 'http://example2.com']
app.use(
  cors({
    origin: function (origin, callback) {
      console.log(origin)
      if (whitelist.indexOf(origin as string) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials:true,
    optionsSuccessStatus:200,
  })
);

app.use("/api/v1", registerRouter,courseRouter,OrderRouter,NotificationRouter,AnalyticsRouter,LayourRouter);

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
