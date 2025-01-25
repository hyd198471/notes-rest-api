import express from "express";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Notebook } from "./models";
export const notebookRouter = express.Router();

const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Notebook not found" });
  }
  next();
};

export const errorHandling = (err: Error, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ error: err.message });
};

notebookRouter.post("/", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ error: "'name' field is required" });
    }
    const notebook = new Notebook({ name, description });
    await notebook.save();
    res.status(201).json(notebook);
  } catch (err) {
    next(err);
  }
});

notebookRouter.get("/", async (req, res) => {
  try {
    const notebooks = await Notebook.find();
    return res.json(notebooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

notebookRouter.put("/:id", validateId, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const notebook = await Notebook.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!notebook) {
      return res.status(404).json({ error: "Notebook not found" });
    }

    return res.json(notebook);
  } catch (err) {
    next(err);
  }
});

notebookRouter.get("/:id", validateId, async (req, res, next) => {
  try {
    const notebook = await Notebook.findById(req.params.id);
    if (!notebook) {
      return res.status(404).json({ error: "Notebook not found" });
    }

    return res.json(notebook);
  } catch (err) {
    next(err);
  }
});

notebookRouter.delete("/:id", validateId, async (req, res, next) => {
  try {
    const notebook = await Notebook.findByIdAndDelete(req.params.id).maxTimeMS(10000);

    if (!notebook) {
      console.error(`Notebook with ID ${req.params.id} not found`);
      return res.status(404).json({ error: "Notebook not found" });
    }

    console.log(`Deleted notebook: ${notebook}`);
    return res.status(204).end();
  } catch (err) {
    console.error(`Error deleting notebook: ${err.message}`);
    next(err); // Ensure this is handled by an error middleware
  }
});

module.exports = {
  notebookRouter,
};
