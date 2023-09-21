import { app } from "./app";
import { dbConnect } from "./config/db";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("server is listen at port 3000");
  dbConnect();
});
