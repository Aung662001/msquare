import { app } from "./app";
const PORT = process.env.PORT;

//server listen
app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});
