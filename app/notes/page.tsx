/* eslint-disable no-console */
"use client";

import { Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const NotesPage = () => {
  const apiBase = useMemo(
    () => process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000",
    [],
  );
  const [notes, setNotes] = useState<
    Array<{ id: string; title: string; content: string }>
  >([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const loadNotes = async () => {
    try {
      const response = await fetch(`${apiBase}/api/v1/notes`, {
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log("[notes] GET /api/v1/notes", data);
      setNotes(data?.notes || []);
    } catch (fetchError) {
      console.error("[notes] fetch error", fetchError);
      setError("Failed to load notes.");
    }
  };

  useEffect(() => {
    loadNotes();
  }, [apiBase]);

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      setError("Please enter a title or content.");
      return;
    }

    setIsSaving(true);
    setError("");
    try {
      const response = await fetch(`${apiBase}/api/v1/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), content: content.trim() }),
      });
      const data = await response.json();
      console.log("[notes] POST /api/v1/notes", data);
      setTitle("");
      setContent("");
      await loadNotes();
    } catch (saveError) {
      console.error("[notes] save error", saveError);
      setError("Failed to save note.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setError("");
    try {
      const response = await fetch(`${apiBase}/api/v1/notes/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log("[notes] DELETE /api/v1/notes/:id", data);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (deleteError) {
      console.error("[notes] delete error", deleteError);
      setError("Failed to delete note.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold">Notes</h1>
      <p className="mt-2 text-sm text-gray-600">Add the notes below.</p>

      <div className="mx-auto mt-6 flex w-full max-w-6xl flex-col gap-6 md:flex-row">
        <section className="w-full flex-1 rounded-lg border bg-white p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Note title"
            className="mt-2 w-full rounded-md border px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
          />

          <label className="mt-4 block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write something..."
            rows={4}
            className="mt-2 w-full rounded-md border px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
          />

          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="mt-4 inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSaving ? "Saving..." : "Save Note"}
          </button>
        </section>

        <section className="w-full flex-1">
          <h2 className="text-lg font-semibold">Saved Notes</h2>
          {notes.length === 0 ? (
            <p className="mt-3 text-sm text-gray-600">No notes yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {notes.map((note) => (
                <article
                  key={note.id}
                  className="rounded-md border bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold">
                      {note.title || "Untitled"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleDelete(note.id)}
                      disabled={deletingId === note.id}
                      aria-label="Delete note"
                      className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  {note.content ? (
                    <p className="mt-2 text-sm text-gray-700">{note.content}</p>
                  ) : (
                    <p className="mt-2 text-sm text-gray-400">No content</p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default NotesPage;
