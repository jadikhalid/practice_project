import Note from "../models/Note.js";

export const getAllNotes = async (_req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json({ message: "Notes retrieved successfully", notes });
  } catch (error) {
    console.log("Error in getAllNotes", error);
    res.status(500).json({ message: "Error retrieving notes", error });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note retrieved successfully", note });
  } catch (error) {
    console.log("Error in getNoteById", error);
    res.status(500).json({ message: "Error retrieving note", error });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.log("Error in createNote", error);
    res.status(500).json({ message: "Error creating note", error });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true },
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.log("Error in updateNote", error);
    res.status(500).json({ message: "Error updating note", error });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteNote", error);
    res.status(500).json({ message: "Error deleting note", error });
  }
};
