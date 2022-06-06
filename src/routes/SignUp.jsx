import React from "react";
import CredentialInput from "../components/CredentialInput";
import CredentialButton from "../components/CredentialButton";
import signInUp from "../css/sign-in-up.module.css";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div>
      <div className="">
        <h1 className={signInUp.heading}>Join CodeX today</h1>
        <div className={signInUp.signUpDiv}>
          <div className={signInUp.inputDiv}>
            <CredentialInput type="text" placeholder="Name" />
          </div>
          <div className={signInUp.inputDiv}>
            <CredentialInput type="email" placeholder="Email address" />
          </div>
          <div className={signInUp.inputDiv}>
            <CredentialInput type="password" placeholder="Password" />
          </div>
          <div className={signInUp.inputDiv}>
            <CredentialInput type="password" placeholder="Confirm password" />
          </div>

          {/* removed the outer div of credinput and credbutton */}
          <div className={signInUp.otpDiv}>
            <CredentialInput type="text" placeholder="OTP" />
            <button type="button" className={signInUp.otpButton}>
              Send OTP
            </button>
          </div>

          <div className={`${signInUp.buttonDiv} ${signInUp.temp}`}>
            <CredentialButton text="Sign Up" />
          </div>

          <div className={signInUp.textDiv}>
            <Link to="/sign-in" className={signInUp.fpText}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
