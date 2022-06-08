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
} from "../utilities/UserAuthUtility.js";
import { SERVER_ORIGIN } from "../utilities/ClientVarsUtility.js";
import Toast, { toastOptions } from "../components/Toast.js";

const axios = require("axios").default;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SignUp() {
  const [userCredentials, setUserCredentials] = useState({
    firstName: "",
    lastName: "",
    collegeName: "",
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
    const { res, desc } = await validateEmailAddress(
      userCredentials.emailAddress
    );
    if (!res) {
      // show toast
      // console.log(desc);
      toast(desc, toastOptions);
    } else {
      try {
        const response = await axios.put(SERVER_ORIGIN + "/votp", {
          email: userCredentials.emailAddress,
        });
        console.log(response.data);
        toast("OTP has been sent successfully", toastOptions);
        // show toast
      } catch (error) {
        console.log(error.response.data);
      }
    }
  }

  async function requestServerToSignUserUp() {
    // console.log(userCredentials);
    // first validate at front end, don't bother the server unnecessarily
    const { res, desc } = await validateSignUpCredentials(userCredentials);
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
      <div className="">
        <h1 className={UserAuth.heading}>Join CodeX today</h1>
        <div className={UserAuth.signUpDiv}>
          <div className={UserAuth.otpDiv}>
            <CredentialInput
              type="text"
              placeholder="First name"
              name="firstName"
              width="49.5%"
              onChange={updateUserCredentials}
            />
            <div className={UserAuth.otpBtnHalfInputDiv}>
              <CredentialInput
                type="text"
                placeholder="Last name"
                name="lastName"
                width="49.5%"
                onChange={updateUserCredentials}
              />
            </div>
          </div>
          <div className={UserAuth.inputDiv}>
            <CredentialInput
              type="text"
              placeholder="College name"
              name="collegeName"
              width="32%"
              onChange={updateUserCredentials}
            />
          </div>
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
              text="Sign Up"
              onClick={requestServerToSignUserUp}
              width="32%"
            />
          </div>

          <div className={UserAuth.textDiv}>
            <Link to="/sign-in" className={UserAuth.fpText}>
              Sign In
            </Link>
          </div>
        </div>
        <Toast />
      </div>
    </div>
  );
}

export default SignUp;
