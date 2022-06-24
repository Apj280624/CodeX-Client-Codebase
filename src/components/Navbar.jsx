import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// my modules
import {
  generateAxiosConfigHeader,
  routes,
  SERVER_ORIGIN,
  vars,
} from "../utilities/ClientVarsUtility.js";
import Toast, { toastOptions } from "../components/Toast.js";

const axios = require("axios").default;

/* parent sets the sign in status on Navbar */

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function MyNavbar(props) {
  // console.log(props);

  const [signOutCode, setSignOutCode] = useState(0);

  const navigate = useNavigate();

  function handleSignOutClick() {
    if (signOutCode === 0) {
      setSignOutCode(1);

      // console.log(signOutCode);

      toast("Click again to confirm !", {
        ...toastOptions,
        ...{ autoClose: 1000 },
        position: "bottom-center",
      }); // overriding close time

      setTimeout(() => {
        setSignOutCode(0);
      }, 3000);
    } else {
      // console.log("deleted");

      localStorage.removeItem("token");
      if (props.onSignOutClick) {
        /* this check is imp because only the home function provides this function as a prop, because we do navigate 
      to  homepage on signout, but if we signout from the home page itself navbar account/signout button wont update
      to signin/signout, that's why we have passed a function from home, which allow navbar to alter its state
      */
        props.onSignOutClick();
      }
      navigate(routes.HOME);
    }
  }

  return (
    <div>
      <nav className="navbar-custom navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid">
          <Link className="custom-brand navbar-brand" to={routes.HOME}>
            <p className="brand-name">{vars.brandName}</p>
          </Link>

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
                <Link to={routes.INTERVIEW_EXPERIENCES} className="nav-link">
                  Interview Experiences
                </Link>
              </li>

              <li className="nav-item">
                <Link to="#" className="nav-link">
                  Coming Soon
                </Link>
              </li>
            </ul>

            {/* you can put buttons in two different list item, but the one i used looks good on mobile scrn */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item active">
                {props.isSignedIn === true ? (
                  <Link to={routes.ACCOUNT} className="btn nav-btn1">
                    Account
                  </Link>
                ) : (
                  <Link to={routes.SIGN_IN} className="nav-btn1 btn">
                    Sign In
                  </Link>
                )}
              </li>
              <li className="nav-item active">
                {props.isSignedIn === true ? (
                  <button className="nav-btn2 btn" onClick={handleSignOutClick}>
                    {signOutCode === 0 ? "Sign Out" : "Sure ?"}
                  </button>
                ) : (
                  <Link to={routes.SIGN_UP} className="nav-btn2 btn">
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

// dont include a toast here parent already has one

export default MyNavbar;
