import { Router } from "express";
import Quote from "../models/Quote.js";

const router = Router();

router.post("/", async (req, res) => {
  const { quote, author } = req.body;

  if (!quote || !author) {
    res.status(422).json({ error: "Quotation and author are mandatory!" });
    return;
  }

  const newQuote = {
    quote,
    author,
  };

  try {
    await Quote.create(newQuote);
    res.status(201).json({ ...newQuote, message: "Quote added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const quotes = await Quote.find();

    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/quote/:quote", async (req, res) => {
  try {
    const searchTerm = req.params.quote;
    const filter = { quote: new RegExp(searchTerm, "i") };
    const quotes = await Quote.find(filter);

    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/author/:author", async (req, res) => {
  try {
    const searchTerm = req.params.author;
    const filter = { author: new RegExp(searchTerm, "i") };
    const quotes = await Quote.find(filter);

    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const quote = await Quote.findOne({ _id: id });

    if (!quote) {
      res.status(422).json({ error: "Quote not found!" });
      return;
    }

    res.status(200).json(quote);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { quote, author } = req.body;
  const updateQuote = {
    quote,
    author,
  };

  try {
    const updatedQuote = await Quote.updateOne({ _id: id }, updateQuote);

    if (updatedQuote.matchedCount === 0) {
      res.status(422).json({ error: "Quote not found!" });
      return;
    }

    res
      .status(200)
      .json({ ...updateQuote, message: "Quote updated succesfully!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const quote = await Quote.findOne({ _id: id });

  if (!quote) {
    res.status(422).json({ error: "Quote not found!" });
    return;
  }

  try {
    await Quote.deleteOne({ _id: id });

    res.status(200).json({ message: "Quote deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
