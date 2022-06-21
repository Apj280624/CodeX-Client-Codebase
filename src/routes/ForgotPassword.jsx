import React, { useEffect, useState } from "react";
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
  transformForgotPasswordObject,
} from "../utilities/ClientUtility.js";
import { SERVER_ORIGIN, routes, vars } from "../utilities/ClientVarsUtility.js";
import Toast, { toastOptions } from "../components/Toast.js";

const axios = require("axios").default;

function ForgotPassword() {
  const initialForgotPasswordObject = {
    emailAddress: "",
    password: "",
    OTP: "",
  };

  const [userCredentials, setUserCredentials] = useState(
    initialForgotPasswordObject
  );

  const [isUpdatePasswordDisabled, setIsUpdatePasswordDisabled] =
    useState(false);
  const [isOTPDisabled, setIsOTPDisabled] = useState(false);
  const [isDone, setIsDone] = useState(false);

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
      setIsOTPDisabled(true);
      try {
        const response = await axios.put(SERVER_ORIGIN + routes.FOTP, {
          emailAddress: userCredentials.emailAddress,
        });
        // console.log(response.data);
        setIsOTPDisabled(false);
        toast(response.data, toastOptions);
      } catch (error) {
        // console.log(error.response.data);
        setIsOTPDisabled(false);
        toast(error.response.data, toastOptions);
      }
    }
  }

  async function requestServerToUpdatePassword() {
    // console.log(userCredentials);
    // first transform and validate at front end, don't bother the server unnecessarily

    await setUserCredentials((prevUserCredentials) =>
      transformForgotPasswordObject(prevUserCredentials)
    );

    const { res, desc } = validateForgotPasswordCredentials(userCredentials);
    // console.log(desc);
    if (!res) {
      toast(desc, toastOptions);
    } else {
      setIsUpdatePasswordDisabled(true);
      // request password update, but first verify the otp at server side
      try {
        const response = await axios.post(
          SERVER_ORIGIN + routes.FORGOT_PASSWORD,
          userCredentials
        );
        // console.log(response);
        setUserCredentials(initialForgotPasswordObject);
        setIsUpdatePasswordDisabled(false);
        setIsDone(true);
        toast(response.data, toastOptions);
      } catch (error) {
        console.log(error);
        setIsUpdatePasswordDisabled(false);
        toast(error.response.data, toastOptions);
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top after render
  }, []); // put an empty dep array else it might run on every time you type

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
            isDone={isDone}
          />
        </div>
        <PasswordInput
          name="password"
          onChange={updateUserCredentials}
          isDone={isDone}
          text="New password"
        />

        <div className={UserAuth.otpDiv}>
          <CredentialInput
            type="text"
            placeholder="OTP"
            name="OTP"
            width="49.5%"
            maxLength={vars.maxOTPLen}
            onChange={updateUserCredentials}
            isDone={isDone}
          />
          <div className={UserAuth.otpBtnHalfInputDiv}>
            <CredentialButton
              text="Send OTP"
              onClick={requestServerToSendOTP}
              width="49.5%"
              isDisabled={isOTPDisabled}
            />
          </div>
        </div>
        <div className={UserAuth.buttonDiv}>
          <CredentialButton
            text="Update password"
            onClick={requestServerToUpdatePassword}
            width="100%"
            isDisabled={isUpdatePasswordDisabled}
          />
        </div>
        <div className={UserAuth.textDiv}>
          <Link to={routes.HOME} className={UserAuth.fpText}>
            Home
          </Link>
          <p className={UserAuth.dotText}> • </p>
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
