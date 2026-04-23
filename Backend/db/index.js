import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

async function connectDB() {
  try {
    await mongoose
      .connect(`${process.env.DB_URL}/${DB_NAME}`)
      .then(() => {
        console.log("Connected to DB");
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

export default connectDB;
