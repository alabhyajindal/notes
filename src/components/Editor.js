import React from "react";
import { MenuIcon } from "@heroicons/react/solid";

function Editor(props) {
  const body = document.querySelector(".editor-body");

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
            ></textarea>
          </div>
        </>
      )}
    </div>
  );
}

export default Editor;
