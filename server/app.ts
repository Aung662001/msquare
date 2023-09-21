import express from "express";
require("dotenv").config();
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";
export const app = express();
//cookies
app.use(cookieParser());
//json
app.use(express.json({ limit: "50mb" }));
//cors
app.use(cors(corsOptions));
