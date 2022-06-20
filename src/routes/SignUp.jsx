import React, { useState } from "react";
import CredentialInput from "../components/CredentialInput";
import CredentialButton from "../components/CredentialButton";
import PasswordInput from "../components/PasswordInput";
import UserAuth from "../css/user-auth.module.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// my modules
import {
  validateSignUpCredentials,
  validateEmailAddress,
  transformSignUpObject,
  trimField,
} from "../utilities/ClientUtility.js";
import { SERVER_ORIGIN, routes, vars } from "../utilities/ClientVarsUtility.js";
import Toast, { toastOptions } from "../components/Toast.js";

const axios = require("axios").default;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SignUp() {
  const [isSignUpDisabled, setIsSignUpDisabled] = useState(false);
  const [isOTPDisabled, setIsOTPDisabled] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const [userCredentials, setUserCredentials] = useState({
    firstName: "",
    lastName: "",
    collegeName: "",
    branchName: "",
    graduationYear: "",
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
    // no need to transform object here
    const { res, desc } = validateEmailAddress(
      trimField(userCredentials.emailAddress)
    );
    if (!res) {
      // console.log(desc);
      toast(desc, toastOptions);
    } else {
      setIsOTPDisabled(true);
      try {
        const response = await axios.put(SERVER_ORIGIN + routes.VOTP, {
          emailAddress: trimField(userCredentials.emailAddress),
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

  async function requestServerToSignUserUp() {
    // console.log(userCredentials);
    // first transform and validate at front end, don't bother the server unnecessarily

    await setUserCredentials((prevUserCredentials) =>
      transformSignUpObject(prevUserCredentials)
    );

    const { res, desc } = validateSignUpCredentials(userCredentials);

    // console.log(desc);
    if (!res) {
      toast(desc, toastOptions);
    } else {
      // console.log(userCredentials);
      setIsSignUpDisabled(true);
      try {
        const response = await axios.post(
          SERVER_ORIGIN + routes.SIGN_UP,
          userCredentials
        );
        // console.log(response);
        setIsSignUpDisabled(false);
        setIsDone(true);
        toast(response.data, toastOptions);
      } catch (error) {
        // console.log(error);
        setIsSignUpDisabled(false);
        toast(error.response.data, toastOptions);
      }
    }
  }

  return (
    <div>
      <div className={UserAuth.headingDiv}>
        <p className={UserAuth.heading}>Join CodeX today</p>
      </div>
      <div className={UserAuth.signUpDiv}>
        <div className={UserAuth.otpDiv}>
          <CredentialInput
            type="text"
            placeholder="First name"
            name="firstName"
            width="49.5%"
            maxLength={vars.maxNameLen}
            isDone={isDone}
            onChange={updateUserCredentials}
          />
          <div className={UserAuth.otpBtnHalfInputDiv}>
            <CredentialInput
              type="text"
              placeholder="Last name"
              name="lastName"
              width="49.5%"
              maxLength={vars.maxNameLen}
              isDone={isDone}
              onChange={updateUserCredentials}
            />
          </div>
        </div>

        <div className={UserAuth.inputDiv}>
          <CredentialInput
            type="text"
            placeholder="College name ( only LNCT / LNCTS / LNCTE )"
            name="collegeName"
            width="100%"
            isDone={isDone}
            onChange={updateUserCredentials}
          />
        </div>

        <div className={UserAuth.inputDiv}>
          <CredentialInput
            type="text"
            placeholder="Branch name ( e.g. CS, IT, EC etc )"
            name="branchName"
            width="100%"
            isDone={isDone}
            onChange={updateUserCredentials}
          />
        </div>

        <div className={UserAuth.inputDiv}>
          <CredentialInput
            type="text"
            placeholder="Graduation year ( e.g. 2022, 2023 etc )"
            name="graduationYear"
            width="100%"
            isDone={isDone}
            onChange={updateUserCredentials}
          />
        </div>

        <div className={UserAuth.inputDiv}>
          <CredentialInput
            type="email"
            placeholder="Email address"
            name="emailAddress"
            width="100%"
            isDone={isDone}
            onChange={updateUserCredentials}
          />
        </div>
        <PasswordInput
          name="password"
          onChange={updateUserCredentials}
          isDone={isDone}
        />

        <div className={UserAuth.otpDiv}>
          <CredentialInput
            type="text"
            placeholder="OTP"
            name="OTP"
            width="49.5%"
            maxLength={vars.maxOTPLen}
            isDone={isDone}
            onChange={updateUserCredentials}
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
            text="Sign Up"
            onClick={requestServerToSignUserUp}
            width="100%"
            isDisabled={isSignUpDisabled}
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
      </div>
      <Toast />
    </div>
  );
}

export default SignUp;
