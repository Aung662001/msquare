import { Request, Response } from "express";
import { app } from "./app";
require("dotenv").config();

const PORT = process.env.PORT;

app.get("", (req: Request, res: Response) => {
  res.json({ message: "hello" });
});
app.listen(PORT, () => {
  console.log("server is listen at port 3000");
});
