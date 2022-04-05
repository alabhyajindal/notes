import React from "react";
import {
  PlusIcon,
  SparklesIcon,
  CollectionIcon,
  GiftIcon,
} from "@heroicons/react/solid";

function Sidebar(props) {
  return (
    <div className="sidebar">
      <header className="header">
        <h1 className="heading">Diffuse</h1>
        <button onClick={props.createNewNote}>
          <PlusIcon className="add-note" />
        </button>
      </header>
      <div className="section-heading-cont">
        <div className="section-heading">
          <CollectionIcon className="section-heading-icon" />
          <h2 className="all-notes">All Notes</h2>
        </div>
        <div className="section-heading">
          <GiftIcon className="section-heading-icon" />
          <h2 className="favorites">Favorites</h2>
        </div>
      </div>
      <div className="note-list">{props.noteElems}</div>
    </div>
  );
}

export default Sidebar;
