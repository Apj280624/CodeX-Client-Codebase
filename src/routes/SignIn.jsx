import React, { useState } from "react";
import CredentialInput from "../components/CredentialInput";
import CredentialButton from "../components/CredentialButton";
import UserAuth from "../css/user-auth.module.css";
import PasswordInput from "../components/PasswordInput";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// my modules
import { validateSignInCredentials } from "../utilities/UserAuthUtility.js";
import { SERVER_ORIGIN } from "../utilities/ClientVarsUtility.js";
import Toast, { toastOptions } from "../components/Toast.js";

const axios = require("axios").default;

function SignIn() {
  const [userCredentials, setUserCredentials] = useState({
    emailAddress: "",
    password: "",
  });

  async function updateUserCredentials(updatedField) {
    await setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      ...updatedField,
    }));

    // console.log(userCredentials);
  }

  async function requestServerToSignUserIn() {
    // console.log(userCredentials);
    // first validate at front end, don't bother the server unnecessarily
    const { res, desc } = await validateSignInCredentials(userCredentials);
    // console.log(desc);
    if (!res) {
      // show toast for desc
      toast(desc, toastOptions);
    } else {
      // request sign in, request token from server
      // try {
      //   const response = await axios.get(SERVER_ORIGIN + "/sign-in");
      //   console.log(response);
      //   // show toast
      // } catch (error) {
      //   console.error(error);
      // }
    }
  }

  return (
    <div>
      <h1 className={UserAuth.heading}>Sign In to CodeX</h1>
      <div className={UserAuth.signInDiv}>
        <div className={UserAuth.inputDiv}>
          <CredentialInput
            type="email"
            placeholder="Email address"
            name="emailAddress"
            width="32%"
            onChange={updateUserCredentials}
          />
        </div>
        <PasswordInput name="password" onChange={updateUserCredentials} />
        <div className={UserAuth.buttonDiv}>
          <CredentialButton
            text="Sign Up"
            onClick={requestServerToSignUserIn}
            width="32%"
          />
        </div>
        <div className={UserAuth.textDiv}>
          <Link to="/forgot-password" className={UserAuth.fpText}>
            Forgot password
          </Link>
          <p className={UserAuth.dotText}> • </p>
          <Link to="/sign-up" className={UserAuth.fpText}>
            Sign Up
          </Link>
        </div>
        <Toast />
      </div>
    </div>
  );
}

export default SignIn;
