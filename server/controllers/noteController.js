let nextId = 1;
const notes = [];

const createNote = (req, res) => {
  const { title = "", content = "" } = req.body || {};

  if (!title && !content) {
    return res
      .status(400)
      .json({ success: false, message: "Title or content is required." });
  }

  const note = {
    id: String(nextId++),
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  notes.push(note);
  console.log("[notes] created", note);

  return res.status(201).json({ success: true, note });
};

const getNotes = (req, res) => {
  console.log("[notes] list", { count: notes.length });
  return res.status(200).json({ success: true, notes });
};

const getNoteById = (req, res) => {
  const { id } = req.params;
  const note = notes.find((item) => item.id === id);

  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found." });
  }

  console.log("[notes] get", note);
  return res.status(200).json({ success: true, note });
};

const updateNote = (req, res) => {
  const { id } = req.params;
  const note = notes.find((item) => item.id === id);

  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found." });
  }

  const { title, content } = req.body || {};

  if (typeof title === "string") {
    note.title = title;
  }
  if (typeof content === "string") {
    note.content = content;
  }

  note.updatedAt = new Date().toISOString();

  console.log("[notes] updated", note);
  return res.status(200).json({ success: true, note });
};

const deleteNote = (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Note not found." });
  }

  const [removed] = notes.splice(index, 1);
  console.log("[notes] deleted", removed);
  return res.status(200).json({ success: true, note: removed });
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
