import React, { useState } from "react";
import styles from "../css/credential-input.module.css";
import UserAuth from "../css/user-auth.module.css";
import credentialButton from "../css/credential-button.module.css";

function PasswordInput(props) {
  const [inputValue, setInputValue] = useState("");
  const [hidden, setHidden] = useState(true); // hidden means password is hidden

  function handleChange(evt) {
    setInputValue(evt.target.value);
    props.onChange({ [props.name]: evt.target.value });
  }

  function handleClick() {
    setHidden((prevHidden) => !prevHidden);
  }

  return (
    <div className={UserAuth.passwordDiv}>
      <input
        className={styles.credentialInput}
        style={{ width: "67%" }}
        type={hidden ? "password" : "text"}
        placeholder="Password"
        value={inputValue}
        onChange={handleChange}
      />
      <button
        type="button"
        className={credentialButton.credentialButton}
        style={{ marginLeft: "1%", width: "32%" }}
        onClick={handleClick}
      >
        {hidden ? "Show" : "Hide"}
      </button>
    </div>
  );
}

export default PasswordInput;
