import React from "react";
import credentialButton from "../css/credential-button.module.css";

function CredentialButton(props) {
  const inlineStyle = {
    width: props.width,
    height: props.height,
  };
  return (
    <button
      type="button"
      style={inlineStyle}
      className={credentialButton.credentialButton}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default CredentialButton;
