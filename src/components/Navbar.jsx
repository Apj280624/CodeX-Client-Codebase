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

/* parent sets the sign in status on Navbar */

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function MyNavbar(props) {
  // console.log(props);

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
                {props.isSignedIn === true ? (
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
                {props.isSignedIn === true ? (
                  <button className="nav-btn2 btn">Sign Out</button>
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

export default MyNavbar;
