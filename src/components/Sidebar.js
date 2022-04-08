import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  PlusIcon,
  SparklesIcon,
  CollectionIcon,
  GiftIcon,
} from "@heroicons/react/solid";
// import Hearts from "./assets/Hearts";

function Sidebar(props) {
  return (
    <div className="sidebar">
      <header className="header">
        <Link to="/" className="heading">
          Diffuse
        </Link>
        <button onClick={props.createNewNote}>
          <PlusIcon className="add-note" />
        </button>
      </header>
      <div className="section-heading-cont">
        <div className="section-heading">
          <GiftIcon className="section-heading-icon" />
          <Link to="/favorites" className="favorites">
            Favorites
          </Link>
        </div>
      </div>
      {/* <Outlet /> */}
      <div className="note-list">{props.noteElems}</div>
    </div>
  );
}

export default Sidebar;
