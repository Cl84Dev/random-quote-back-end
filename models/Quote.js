import mongoose from "mongoose";

const Quote = mongoose.model("Quote", {
  quote: String,
  author: String,
});

export default Quote;
