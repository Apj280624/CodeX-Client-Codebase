import React from "react";
import Navbar from "../components/Navbar";
import CredentialInput from "../components/CredentialInput";
import CredentialButton from "../components/CredentialButton";
import signIn from "../css/sign-in.module.css";

function SignIn() {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="">
        <form className={signIn.form}>
          <div className={signIn.inputDiv}>
            <CredentialInput type="email" placeholder="Email address" />
          </div>
          <div className={signIn.inputDiv}>
            <CredentialInput type="password" placeholder="Password" />
          </div>
          <div className={signIn.buttonDiv}>
            <CredentialButton text="Sign In" />
          </div>
          <div className={signIn.textDiv}>
            <p className={signIn.fpText}>Forgot password</p>
            <p className={signIn.dotText}> • </p>
            <p className={signIn.fpText}>Sign Up</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
