import mongoose from "mongoose";
const URL = process.env.MONGODB_URL || "";
const dbConnect = async () => {
  try {
    await mongoose.connect(URL).then((data) => {
      console.log("Database connect with " + data.connection.host);
    });
  } catch (err: any) {
    console.log(err);
    setTimeout(dbConnect, 5000);
  }
};
export { dbConnect };
