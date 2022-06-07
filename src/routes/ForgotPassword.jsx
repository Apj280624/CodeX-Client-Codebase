import React, { useState } from "react";
import UserAuth from "../css/user-auth.module.css";
import CredentialInput from "../components/CredentialInput";
import CredentialButton from "../components/CredentialButton";

// my modules
import { validateForgotPasswordCredentials } from "../utilities/UserAuthUtility.js";
import { SERVER_ORIGIN } from "../utilities/FrontendVarsUtility.js";

const axios = require("axios").default;

function ForgotPassword() {
  const [userCredentials, setUserCredentials] = useState({
    password: "",
    confirmedPassword: "",
    OTP: "",
  });

  async function updateUserCredentials(updatedField) {
    await setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      ...updatedField,
    }));

    // console.log(userCredentials);
  }

  async function requestServerToSendOTP() {
    // try {
    //   const response = await axios.get(SERVER_ORIGIN + "/otp");
    //   console.log(response);
    //   // show toast
    // } catch (error) {
    //   console.error(error);
    // }
  }

  async function requestServerToUpdatePassword() {
    // console.log(userCredentials);
    // first validate at front end, don't bother the server unnecessarily
    const { res, desc } = await validateForgotPasswordCredentials(
      userCredentials
    );
    console.log(desc);
    if (!res) {
      // show toast for desc
    } else {
      // request sign up, but first verify the otp at server side
      // try {
      //   const response = await axios.get(SERVER_ORIGIN + "/sign-up");
      //   console.log(response);
      //   // show toast
      // } catch (error) {
      //   console.error(error);
      // }
    }
  }

  return (
    <div>
      <h1 className={UserAuth.heading}>Forgot your password ?</h1>
      <h1 style={{ marginTop: "20px" }} className={UserAuth.heading}>
        Let's figure it out
      </h1>
      <div className={UserAuth.signUpDiv}>
        <div className={UserAuth.inputDiv}>
          <CredentialInput
            type="password"
            placeholder="Password"
            name="password"
            onChange={updateUserCredentials}
          />
        </div>
        <div className={UserAuth.inputDiv}>
          <CredentialInput
            type="password"
            placeholder="Confirm password"
            name="confirmedPassword"
            onChange={updateUserCredentials}
          />
        </div>
        <div className={UserAuth.otpDiv}>
          <CredentialInput
            type="text"
            placeholder="OTP"
            name="OTP"
            onChange={updateUserCredentials}
          />
          <button
            type="button"
            className={UserAuth.otpButton}
            onClick={requestServerToSendOTP}
          >
            Send OTP
          </button>
        </div>
        <div className={UserAuth.buttonDiv}>
          <CredentialButton
            text="Sign Up"
            onClick={requestServerToUpdatePassword}
          />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
