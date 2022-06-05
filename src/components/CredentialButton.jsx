import React from "react";
import credentialButton from "../css/credential-button.module.css";

function CredentialButton(props) {
  return (
    <div className={credentialButton.credentialButtonDiv}>
      <button type="button" className={credentialButton.credentialButton}>
        {props.text}
      </button>
    </div>
  );
}

export default CredentialButton;
