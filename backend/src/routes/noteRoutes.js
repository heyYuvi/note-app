import express from "express";
import { createNote, deleteNote, getAllNotes, getSingleNote, updateNote } from "../controllers/noteController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/notes", protect, getAllNotes);
router.get("/note/:id", protect, getSingleNote);
router.post("/note", protect, createNote);
router.put("/note/:id", protect, updateNote);
router.delete("/note/:id", protect, deleteNote);

export default router;