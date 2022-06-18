import React, { useState } from "react";
import contri from "../css/contribute.module.css";
import { vars } from "../utilities/ClientVarsUtility";

function TextArea(props) {
  var initialValue = "";
  if (props.initialValue) {
    initialValue = props.initialValue;
  }

  const [text, setText] = useState(initialValue);

  function handleChange(evt) {
    // console.log(evt.target.value);
    setText(evt.target.value);
    // parent has provided us props.onChange to change its state
    // console.log(props.name + evt.target.name);
    props.onChange({ [props.name]: evt.target.value });
  }

  return (
    <div>
      <div className="">
        <textarea
          className={contri.contentTextArea}
          rows={props.rows}
          maxLength={props.maxLength ? props.maxLength : vars.maxExperienceLen}
          placeholder={props.placeholder}
          value={text}
          onChange={handleChange}
        ></textarea>
      </div>
    </div>
  );
}

export default TextArea;
