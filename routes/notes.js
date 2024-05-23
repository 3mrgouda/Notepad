import express from "express";
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from "../controllers/notes.js";

const router = express.Router();

router.route("/").get(getNotes).post(createNote);
router.route("/:id").get(getNote).put(updateNote).delete(deleteNote);

export default router;
