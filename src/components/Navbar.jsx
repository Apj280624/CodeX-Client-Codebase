import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";

// my modules
import {
  generateAxiosConfigHeader,
  routes,
  SERVER_ORIGIN,
} from "../utilities/ClientVarsUtility.js";

const axios = require("axios").default;

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Navbar(props) {
  // pick token from browser and set the loggedin status and button data
  // use link for relative paths and anchor tags for absolute ones like an external link, set routes using vars

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signOutSureText, setSignOutSureText] = useState("Sign Out");
  const navigate = useNavigate();

  async function requestServerToVerifyToken(token) {
    try {
      const response = await axios.get(
        SERVER_ORIGIN + routes.VERIFY_TOKEN,
        generateAxiosConfigHeader(token)
      );
      console.log(response);
      setIsSignedIn(true);
      props.showContributionForm();
    } catch (error) {
      console.log(error); // isSignedIn remains false
      // navigate(-1);
    }
  }

  function verifySignInStatus() {
    const token = localStorage.getItem("token");
    if (!token) {
      // isSignedIn remains false
    } else {
      requestServerToVerifyToken(token);
    }
  }

  useEffect(() => {
    verifySignInStatus();
  }, []);

  function handleClickSignOut() {
    setSignOutSureText("Sure ?");
    setTimeout(() => {
      setSignOutSureText("Sign Out");
    }, 2000);
  }

  function handleClickSure() {
    // signout now and navigate to the current route
    localStorage.removeItem("token");
  }

  return (
    <div>
      <nav className="navbar-custom navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid">
          <a className="custom-brand navbar-brand" href="/">
            <img
              src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
              className="logo d-inline-block align-top"
              alt=""
            />
            CodeX
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="alignment navbar-nav ms-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#pricing">
                  CP
                </a>
              </li>

              <li className="nav-item active">
                <a className="nav-link" href="#footer">
                  DSA
                </a>
              </li>

              <li className="nav-item active">
                <Link to={routes.INTERVIEW_EXPERIENCES} className="nav-link">
                  Interview Experiences
                </Link>
              </li>

              <li className="nav-item active">
                <a className="nav-link" href="#cta">
                  FAQ
                </a>
              </li>
            </ul>

            {/* you can put buttons in two different list item, but the one i used looks good on mobile scrn */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item active">
                {isSignedIn ? (
                  <Link to="/account" className="nav-btn1 btn">
                    Account
                  </Link>
                ) : (
                  <Link to="/auth/sign-in" className="nav-btn1 btn">
                    Sign In
                  </Link>
                )}
              </li>
              <li className="nav-item active">
                {isSignedIn ? (
                  <button
                    onClick={
                      signOutSureText === "Sign Out"
                        ? handleClickSignOut
                        : handleClickSure
                    }
                    className="nav-btn2 btn"
                  >
                    {signOutSureText}
                  </button>
                ) : (
                  <Link to="/auth/sign-up" className="nav-btn2 btn">
                    Sign Up
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
