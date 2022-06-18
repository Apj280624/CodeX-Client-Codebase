import React, { useState } from "react";
import UserAuth from "../css/user-auth.module.css";
import CredentialInput from "../components/CredentialInput";
import CredentialButton from "../components/CredentialButton";
import PasswordInput from "../components/PasswordInput";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// my modules
import {
  validateForgotPasswordCredentials,
  validateEmailAddress,
} from "../utilities/ClientUtility.js";
import { SERVER_ORIGIN, routes, vars } from "../utilities/ClientVarsUtility.js";
import Toast, { toastOptions } from "../components/Toast.js";

const axios = require("axios").default;

function ForgotPassword() {
  const [userCredentials, setUserCredentials] = useState({
    emailAddress: "",
    password: "",
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
    // console.log(userCredentials.emailAddress);
    const { res, desc } = validateEmailAddress(userCredentials.emailAddress);
    if (!res) {
      // console.log(desc);
      toast(desc, toastOptions);
    } else {
      try {
        const response = await axios.put(SERVER_ORIGIN + routes.FOTP, {
          emailAddress: userCredentials.emailAddress,
        });
        // console.log(response.data);
        toast(response.data, toastOptions);
      } catch (error) {
        // console.log(error.response.data);
        toast(error.response.data, toastOptions);
      }
    }
  }

  async function requestServerToUpdatePassword() {
    // console.log(userCredentials);
    // first validate at front end, don't bother the server unnecessarily
    const { res, desc } = validateForgotPasswordCredentials(userCredentials);
    // console.log(desc);
    if (!res) {
      toast(desc, toastOptions);
    } else {
      // request password update, but first verify the otp at server side
      try {
        const response = await axios.post(
          SERVER_ORIGIN + routes.FORGOT_PASSWORD,
          userCredentials
        );
        // console.log(response);
        toast(response.data, toastOptions);
      } catch (error) {
        console.log(error);
        toast(error.response.data, toastOptions);
      }
    }
  }

  return (
    <div>
      <div className={UserAuth.headingDiv}>
        <p className={UserAuth.heading}>Forgot your password ?</p>
        <p className={UserAuth.heading}>Let's figure it out</p>
      </div>
      <div className={UserAuth.signUpDiv}>
        <div className={UserAuth.inputDiv}>
          <CredentialInput
            type="email"
            placeholder="Email address"
            name="emailAddress"
            width="100%"
            onChange={updateUserCredentials}
          />
        </div>
        <PasswordInput name="password" onChange={updateUserCredentials} />

        <div className={UserAuth.otpDiv}>
          <CredentialInput
            type="text"
            placeholder="OTP"
            name="OTP"
            width="49.5%"
            maxLength={vars.maxOTPLen}
            onChange={updateUserCredentials}
          />
          <div className={UserAuth.otpBtnHalfInputDiv}>
            <CredentialButton
              text="Send OTP"
              onClick={requestServerToSendOTP}
              width="49.5%"
            />
          </div>
        </div>
        <div className={UserAuth.buttonDiv}>
          <CredentialButton
            text="Update password"
            onClick={requestServerToUpdatePassword}
            width="100%"
          />
        </div>
        <div className={UserAuth.textDiv}>
          <Link to={routes.SIGN_IN} className={UserAuth.fpText}>
            Sign In
          </Link>
        </div>
        <Toast />
      </div>
    </div>
  );
}

export default ForgotPassword;
