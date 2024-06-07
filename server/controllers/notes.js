import mongoose from "mongoose";
import Note from "../models/Note.js";

// Helper function to check ObjectId validity
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Get all notes
export const getNotes = async (req, res) => {
  const userId = req.user;
  try {
    const notes = await Note.find({ userId });
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single note by ID
export const getNote = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res
      .status(404)
      .json({ success: false, message: "No note with that ID" });
  }

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  const userId = req.user;

  try {
    const note = await Note.create({ ...req.body, userId });
    res.status(201).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an existing note
export const updateNote = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res
      .status(404)
      .json({ success: false, message: "No note with that ID" });
  }

  try {
    const note = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a note by ID
export const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res
      .status(404)
      .json({ success: false, message: "No note with that ID" });
  }

  try {
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
