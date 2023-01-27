import express from "express";
import mongoose from "mongoose";
import router from "./routes/quoteRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use("/quote", router);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@random-quotes.jdnoreo.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("We connected to MongoDB!");
    app.listen(process.env.PORT);
  })
  .catch((err) => console.log(err));
