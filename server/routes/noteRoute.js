const express = require("express");
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

router.route("/notes").post(createNote).get(getNotes);
router.route("/notes/:id").get(getNoteById).put(updateNote).delete(deleteNote);

module.exports = router;
