import React, { useState } from "react";
import UserAuth from "../css/user-auth.module.css";
import CredentialInput from "../components/CredentialInput";
import CredentialButton from "../components/CredentialButton";
import PasswordInput from "../components/PasswordInput";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// my modules
import { validateForgotPasswordCredentials } from "../utilities/ValidationUtility.js";
import { SERVER_ORIGIN } from "../utilities/ClientVarsUtility.js";
import Toast, { toastOptions } from "../components/Toast.js";

const axios = require("axios").default;

function ForgotPassword() {
  const [userCredentials, setUserCredentials] = useState({
    emailAddress: "",
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
    //take reference from signup otp code
  }

  async function requestServerToUpdatePassword() {
    // console.log(userCredentials);
    // first validate at front end, don't bother the server unnecessarily
    const { res, desc } = await validateForgotPasswordCredentials(
      userCredentials
    );
    // console.log(desc);
    if (!res) {
      // show toast for desc
      toast(desc, toastOptions);
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
            type="email"
            placeholder="Email address"
            name="emailAddress"
            width="32%"
            onChange={updateUserCredentials}
          />
        </div>
        <PasswordInput name="password" onChange={updateUserCredentials} />

        <div className={UserAuth.otpDiv}>
          <CredentialInput
            type="text"
            placeholder="OTP"
            name="OTP"
            width="32%"
            onChange={updateUserCredentials}
          />
          <div className={UserAuth.otpBtnHalfInputDiv}>
            <CredentialButton
              text="Send OTP"
              onClick={requestServerToSendOTP}
              width="67%"
            />
          </div>
        </div>
        <div className={UserAuth.buttonDiv}>
          <CredentialButton
            text="Update password"
            onClick={requestServerToUpdatePassword}
            width="32%"
          />
        </div>
        <div className={UserAuth.textDiv}>
          <Link to="/auth/sign-in" className={UserAuth.fpText}>
            Sign In
          </Link>
        </div>
        <Toast />
      </div>
    </div>
  );
}

export default ForgotPassword;
