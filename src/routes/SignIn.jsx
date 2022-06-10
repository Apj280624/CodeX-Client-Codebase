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
import { SERVER_ORIGIN, routes } from "../utilities/ClientVarsUtility.js";
import Toast, { toastOptions } from "../components/Toast.js";

const axios = require("axios").default;

function SignIn() {
  /*
  one case could be if the user is already signed in and tries to come to the sign in route, in such case we can
   check if the user is signed in and redirect him to the interview experience route before even rendering the
   sign in component
  */

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
      try {
        const response = await axios.post(
          SERVER_ORIGIN + routes.SIGN_IN,
          userCredentials
        );
        // console.log(response.data);
        if (response.data.token) {
          // console.log(response.data.token);
          localStorage.setItem("token", response.data.token); // store or replace token on client side
          toast(response.data.statusText);
          // navigate after signing in
        }
      } catch (error) {
        console.log(error);
        toast(error.response.data);
      }
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
            text="Sign In"
            onClick={requestServerToSignUserIn}
            width="32%"
          />
        </div>
        <div className={UserAuth.textDiv}>
          <Link to={routes.FORGOT_PASSWORD} className={UserAuth.fpText}>
            Forgot password
          </Link>
          <p className={UserAuth.dotText}> • </p>
          <Link to={routes.SIGN_UP} className={UserAuth.fpText}>
            Sign Up
          </Link>
        </div>
        <Toast />
      </div>
    </div>
  );
}

export default SignIn;
