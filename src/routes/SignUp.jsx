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
            <CredentialInput type="text" placeholder="Name" />
          </div>
          <div className={signIn.inputDiv}>
            <CredentialInput type="email" placeholder="Email address" />
          </div>
          <div className={signIn.inputDiv}>
            <CredentialInput type="password" placeholder="Password" />
          </div>
          <div className={signIn.inputDiv}>
            <CredentialInput type="password" placeholder="Confirm password" />
          </div>
          <div className={`${signIn.buttonDiv} ${signIn.temp}`}>
            <CredentialButton text="Sign Up" />
          </div>
          <div className={signIn.buttonDiv}>
            <CredentialButton text="Sign Up" />
          </div>
          <div className={signIn.textDiv}>
            <p className={signIn.fpText}>Sign In</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
