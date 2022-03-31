import React from "react";

function Editor(props) {
  return (
    <div className="editor-cont">
      <input
        className="editor-title"
        onChange={props.updateNote}
        value={props.currentNote().title}
        name="title"
      />
      <input
        className="editor-body"
        onChange={props.updateNote}
        value={props.currentNote().body}
        name="body"
      />
    </div>
  );
}

export default Editor;
