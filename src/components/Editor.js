import React from "react";
import { MenuIcon } from "@heroicons/react/solid";

function Editor(props) {
  // Rendering the Sidebar and Editor if the notes array has more than 0
  // notes. If not then a screen with the option to create a new note is
  // rendered

  return (
    <div className="editor-cont">
      {props.currentNote() && (
        <>
          <div className="editor-title-cont">
            <input
              className="editor-title"
              onChange={props.updateNote}
              onClick={props.hideMobileMenu}
              value={props.currentNote().title}
              name="title"
              placeholder="Note's Title"
            />
            <button className="mobile-menu-cont" onClick={props.showMobileMenu}>
              <MenuIcon className="mobile-menu" />
            </button>
          </div>
          <div className="editor-body-cont">
            <textarea
              html={props.currentNote().body}
              onChange={props.updateBody}
              onClick={props.hideMobileMenu}
              onPaste={props.pastePlain}
              value={props.currentNote().body}
              className="editor-body"
              name="body"
              // placeholder="What's on your mind"
            ></textarea>
          </div>
        </>
      )}
    </div>
  );
}

export default Editor;
