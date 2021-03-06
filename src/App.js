import React, { useEffect, useState } from "react";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import { Link, Outlet } from "react-router-dom";
import "./style.css";
import { XIcon, PlusIcon, HeartIcon } from "@heroicons/react/solid";
import { nanoid } from "nanoid";

function App() {
  // Initialized State to track all notes' details. The initial value is taken from the localState if it exists, if not then the state is initialized as an empty array
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notesData")) || []
  );

  // Storing the notes' data on localStorage. Dependencies array includes the notes State. This means the data gets updated to localStorage whenever there is a change in the notes data
  useEffect(() => {
    localStorage.setItem("notesData", JSON.stringify(notes));
  }, [notes]);

  // Isolated function which resets active note. Thus ensuring that there are no active note on the app
  const resetSelection = function () {
    const newNotes = notes.map((note) => {
      return { ...note, isCurrent: false };
    });

    setNotes([...newNotes]);
  };

  // Create a new note
  const createNewNote = function () {
    resetSelection();

    setNotes((prevState) => [
      ...prevState,
      {
        id: nanoid(),
        title: `Note ${notes.length + 1}`,
        body: "",
        isCurrent: true,
        isFavorite: false,
      },
    ]);

    // ids = ids.slice(0, ids.length - 1);
  };

  // Select a note
  const selectNote = function (e) {
    const updatedNotes = notes.map((note) =>
      note.id === e.target.id
        ? { ...note, isCurrent: true }
        : { ...note, isCurrent: false }
    );
    setNotes([...updatedNotes]);
  };

  // Update the title of the note, passed to Editor
  const updateNote = function (e) {
    setNotes((prevState) =>
      prevState.map((note) =>
        note.isCurrent
          ? { ...note, [e.target.name]: e.target.value }
          : { ...note }
      )
    );
  };

  // Update the body of the note, passed to Editor
  const updateBody = (e) => {
    setNotes((prevState) =>
      prevState.map((note) =>
        note.isCurrent
          ? { ...note, [e.target.name]: e.target.value }
          : { ...note }
      )
    );
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Delete a note when the XIcon is clicked
  const deleteNote = function (e) {
    const selectedNote = e.target.closest("div").children[1].id;
    const updatedNotes = notes.filter((note) => note.id !== selectedNote);

    setNotes([...updatedNotes]);
  };

  // Find out the current note in the app
  const currentNote = function () {
    return notes.find((note) => note.isCurrent);
  };

  // Ensures that text pasted from other sources in to the app lose their formatting
  const pastePlain = function (e) {
    e.preventDefault();

    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  };

  // Toggle function for the mobile menu
  const showMobileMenu = function () {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("sidebar-off");
    const body = document.querySelector(".editor-cont");
    body.classList.toggle("blur-body");
  };

  // Hiding the mobile menu when the user clicks on the Editor's title or body
  const hideMobileMenu = function () {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.add("sidebar-off");
    const body = document.querySelector(".editor-cont");
    body.classList.remove("blur-body");
  };

  const favoriteNote = function (e) {
    // Selecting the id of the input tag beacuse e.target will return the SVG of the HeartIcon
    const selectedNote = e.target.closest("div").children[1].id;
    // A method of updating state copied from the selectNote function above
    const updatedNotes = notes.map((note) =>
      note.id == selectedNote
        ? { ...note, isFavorite: !note.isFavorite }
        : { ...note }
    );
    setNotes([...updatedNotes]);
  };

  // Mapping over the notes array and returning a JSX object - a single input tag
  const noteElems = notes.map((note, i) => (
    <div
      className={`note-item-cont ${note.isCurrent ? "current-note" : ""}`}
      key={i + 1}
    >
      <button onClick={favoriteNote}>
        <HeartIcon
          className={`favorite-item ${
            note.isFavorite ? "favorite-item-filled" : ""
          }`}
        />
      </button>
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
        <XIcon className="delete-item" />
      </button>
    </div>
  ));

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
