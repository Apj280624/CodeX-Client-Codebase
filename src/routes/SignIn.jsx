import React from "react";
import CredentialInput from "../components/CredentialInput";
import CredentialButton from "../components/CredentialButton";
import signInUp from "../css/sign-in-up.module.css";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div>
      {/* <Navbar /> */}
      <h1 className={signInUp.heading}>Sign In to CodeX</h1>
      <div className={signInUp.signInDiv}>
        <div className={signInUp.inputDiv}>
          <CredentialInput type="email" placeholder="Email address" />
        </div>
        <div className={signInUp.inputDiv}>
          <CredentialInput type="password" placeholder="Password" />
        </div>
        <div className={signInUp.buttonDiv}>
          <CredentialButton text="Sign In" />
        </div>
        <div className={signInUp.textDiv}>
          <Link to="/sign-up" className={signInUp.fpText}>
            Forgot password
          </Link>
          <p className={signInUp.dotText}> • </p>
          <Link to="/sign-up" className={signInUp.fpText}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
