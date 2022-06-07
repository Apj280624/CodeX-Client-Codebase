import React from "react";
import credentialButton from "../css/credential-button.module.css";

function CredentialButton(props) {
  return (
    <button
      type="button"
      className={credentialButton.credentialButton}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default CredentialButton;
