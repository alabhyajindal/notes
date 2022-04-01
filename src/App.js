import React, { useEffect, useState } from "react";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import "./style.css";
import { XIcon } from "@heroicons/react/solid";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notesData")) || [
      {
        title: `Note 1`,
        id: `1`,
        body: "",
        isCurrent: true,
      },
    ]
  );

  useEffect(() => {
    localStorage.setItem("notesData", JSON.stringify(notes));
  }, [notes]);

  const resetSelection = function () {
    const newNotes = notes.map((note) => {
      return { ...note, isCurrent: false };
    });

    setNotes([...newNotes]);
  };

  const createNewNote = function () {
    resetSelection();

    setNotes((prevState) => [
      ...prevState,
      {
        title: `Note ${notes.length + 1}`,
        id: `${notes.length + 1}`,
        body: "",
        isCurrent: true,
      },
    ]);
  };

  const selectNote = function (e) {
    const updatedNotes = notes.map((note) =>
      note.title === e.target.value
        ? { ...note, isCurrent: true }
        : { ...note, isCurrent: false }
    );
    setNotes([...updatedNotes]);
  };

  const updateNote = function (e) {
    setNotes((prevState) =>
      prevState.map((note) =>
        note.isCurrent
          ? { ...note, [e.target.name]: e.target.value }
          : { ...note }
      )
    );
  };

  const deleteNote = function (e) {
    const selectedNote = e.target.closest("div").children[0].id;
    const updatedNotes = notes.filter((note) => note.id != selectedNote);
    console.log(updatedNotes);

    setNotes([...updatedNotes]);
  };

  const noteElems = notes.map((note, i) => (
    <div
      className={`note-item-cont ${note.isCurrent ? "current-note" : ""}`}
      key={i + 1}
    >
      <input
        key={note.id}
        id={note.id}
        onClick={selectNote}
        onChange={updateNote}
        placeholder="Note's Title"
        value={note.title}
        className={`note-item ${note.isCurrent ? "current-note" : ""}`}
        name="title"
      />
      <button onClick={deleteNote}>
        <XIcon key={i} className="delete-item" />
      </button>
    </div>
  ));

  const currentNote = function () {
    return notes.find((note) => note.isCurrent);
  };

  return (
    <div className="app">
      <Sidebar createNewNote={createNewNote} noteElems={noteElems} />
      <Editor updateNote={updateNote} currentNote={currentNote} />
    </div>
  );
}

export default App;
