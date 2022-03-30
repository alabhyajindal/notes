import React, { useState } from "react";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import "./style.css";
import { nanoid } from "nanoid";

function App() {
  const [notes, setNotes] = useState([
    {
      title: `Note 1`,
      body: "",
      isCurrent: true,
    },
  ]);

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
        body: "",
        isCurrent: true,
      },
    ]);
  };

  const selectNote = function (e) {
    resetSelection();

    const found = notes.find((note) => note.title === e.target.textContent);
  };

  const noteElems = notes.map((note, i) => (
    <h2
      key={nanoid()}
      onClick={selectNote}
      className={`note-item ${note.isCurrent ? "current-note" : ""}`}
    >
      {note.title}
    </h2>
  ));

  return (
    <div className="app">
      <Sidebar createNewNote={createNewNote} noteElems={noteElems} />
      <Editor />
    </div>
  );
}

export default App;
