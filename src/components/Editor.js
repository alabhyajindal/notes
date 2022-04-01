import React from "react";

function Editor(props) {
  const body = document.querySelector(".editor-body");
  // console.log(body.value);

  return (
    <div className="editor-cont">
      {props.currentNote() && (
        <>
          <input
            className="editor-title"
            onChange={props.updateNote}
            value={props.currentNote().title}
            name="title"
          />
          <div className="editor-body-cont">
            <textarea
              html={props.currentNote().body}
              onChange={props.updateBody}
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
