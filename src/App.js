import React, { useEffect, useState } from "react";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import "./style.css";
import { XIcon } from "@heroicons/react/solid";
import { PlusIcon } from "@heroicons/react/solid";
import { nanoid } from "nanoid";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notesData")) || [
      {
        title: `Note 1`,
        // id: `1`,
        id: nanoid(),
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
        // id: `${notes.length + 1}`,
        id: nanoid(),
        body: "",
        isCurrent: true,
      },
    ]);

    // ids = ids.slice(0, ids.length - 1);
  };

  const selectNote = function (e) {
    console.log(e.target.id);
    const updatedNotes = notes.map((note) =>
      note.id === e.target.id
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

  const updateBody = (e) => {
    setNotes((prevState) =>
      prevState.map((note) =>
        note.isCurrent
          ? { ...note, [e.target.name]: e.target.value }
          : { ...note }
      )
    );
    // const computed = window.getComputedStyle(e.target);
    // console.log(computed.height);
    // console.log(e.target.scrollHeight);
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const deleteNote = function (e) {
    const selectedNote = e.target.closest("div").children[0].id;
    const updatedNotes = notes.filter((note) => note.id != selectedNote);

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
        className={`note-item`}
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

  const pastePlain = function (e) {
    e.preventDefault();

    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  };

  const showMobileMenu = function () {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("sidebar-off");
    const body = document.querySelector(".editor-cont");
    body.classList.toggle("blur-body");
  };

  const hideMobileMenu = function () {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.add("sidebar-off");
    const body = document.querySelector(".editor-cont");
    body.classList.remove("blur-body");
  };

  return (
    <div className="app">
      {notes.length > 0 ? (
        <div>
          <Sidebar createNewNote={createNewNote} noteElems={noteElems} />
          <Editor
            updateNote={updateNote}
            updateBody={updateBody}
            currentNote={currentNote}
            pastePlain={pastePlain}
            showMobileMenu={showMobileMenu}
            hideMobileMenu={hideMobileMenu}
          />
        </div>
      ) : (
        <div className="first-note-screen">
          <h1>You have no Notes, create one now.</h1>
          <button onClick={createNewNote}>
            <PlusIcon className="first-note-btn" />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
