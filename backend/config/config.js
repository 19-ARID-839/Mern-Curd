import mongoose from "mongoose";
 export default function dbConnector() {
  mongoose.set("strictQuery", false);
  MONGO_URL = "mongodb://localhost:27017/e-commerece";
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log("Connected to database");
      app.listen("8000", () => console.log("server is running"));
    })
    .catch((err) => console.log(err));
  // export { dbConnector };
}
