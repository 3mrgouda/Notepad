import Note from "../models/Note.js";
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }
    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json({
      success: true,
      data: note,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }
    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }
    await note.remove();
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
