import mongoose from "mongoose";

const Quote = mongoose.model("Quote", {
  quotation: String,
  author: String,
});

export default Quote;
