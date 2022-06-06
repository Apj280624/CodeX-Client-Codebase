import React from "react";
import styles from "../css/credential-input.module.css";

function CredentialInput(props) {
  return (
    <input
      className={styles.credentialInput}
      type={props.type}
      placeholder={props.placeholder}
    ></input>
  );
}

export default CredentialInput;
