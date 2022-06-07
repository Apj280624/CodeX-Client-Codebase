import React, { useState } from "react";
import CredentialInput from "../components/CredentialInput";
import CredentialButton from "../components/CredentialButton";
import UserAuth from "../css/user-auth.module.css";
import { Link } from "react-router-dom";

// my modules
import { validateSignInCredentials } from "../utilities/UserAuthUtility.js";
import { SERVER_ORIGIN } from "../utilities/FrontendVarsUtility.js";

const axios = require("axios").default;

function SignIn() {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  async function updateUserCredentials(updatedField) {
    await setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      ...updatedField,
    }));

    console.log(userCredentials);
  }

  async function signUserIn() {
    // console.log(userCredentials);
    // first validate at front end, don't bother the server unnecessarily
    const { res, desc } = await validateSignInCredentials(userCredentials);
    console.log(desc);
    if (!res) {
      // show toast for desc
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
            name="email"
            onChange={updateUserCredentials}
          />
        </div>
        <div className={UserAuth.inputDiv}>
          <CredentialInput
            type="password"
            placeholder="Password"
            name="password"
            onChange={updateUserCredentials}
          />
        </div>
        <div className={UserAuth.buttonDiv}>
          <CredentialButton text="Sign In" onClick={signUserIn} />
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
      </div>
    </div>
  );
}

export default SignIn;
