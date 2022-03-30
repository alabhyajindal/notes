import React from "react";
import { PlusIcon } from "@heroicons/react/solid";

function Sidebar(props) {
  return (
    <div className="sidebar">
      <header className="header">
        <h1>Notes</h1>
        <button onClick={props.createNewNote}>
          <PlusIcon className="add-note" />
        </button>
      </header>
      <div className="note-list">{props.noteElems}</div>
    </div>
  );
}

export default Sidebar;
