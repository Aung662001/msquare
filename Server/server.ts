import { app } from "./app";
import { dbConnect } from "./config/db";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is listen at port  http://localhost:${PORT}`);
  dbConnect();
});
