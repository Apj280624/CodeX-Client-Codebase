import React from "react";
import styles from "../css/credential-input.module.css";

function CredentialInput(props) {
  return (
    <div>
      <div className={styles.credentialInputDiv}>
        <input
          className={styles.credentialInput}
          type={props.type}
          placeholder={props.placeholder}
        ></input>
      </div>
    </div>
  );
}

export default CredentialInput;
