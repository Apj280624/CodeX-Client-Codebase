import React, { useEffect, useState } from "react";
import Loader from "../components/Loader.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import contri from "../css/contribute.module.css";

// my modules
import { generateAxiosConfigHeader } from "../utilities/ClientUtility.js";
import { SERVER_ORIGIN, routes } from "../utilities/ClientVarsUtility.js";
import Toast, { toastOptions } from "../components/Toast.js";
import { useNavigate } from "react-router-dom";

const axios = require("axios").default;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function EditExperience() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [interviewExperience, setInterviewExperience] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top after render

    async function requestServerToGetInterviewExperience(token) {
      try {
        const response = await axios.get(
          SERVER_ORIGIN + routes.PARTICULAR_INTERVIEW_EXPERIENCE,
          generateAxiosConfigHeader(token)
        );
        setIsLoading(false); // set loading to false, and fill cards with data
        // console.log(response.data.interviewExperience); // set loading to false
        const data = await response.data.interviewExperience;
        setInterviewExperience({
          companyName: data.companyName,
          roleName: data.roleName,
          monthName: data.monthName,
          year: data.year,
          difficulty: data.difficulty,
          opportunity: data.opportunity,
          experience: data.experience,
          tip: data.tip,
        });
      } catch (error) {
        // console.log(error);
        toast(error.response.data, toastOptions);
      }
    }

    async function requestServerToVerifyToken(token) {
      try {
        const response = await axios.get(
          SERVER_ORIGIN + routes.VERIFY_TOKEN,
          generateAxiosConfigHeader(token)
        ); // read about Bearer schema in jwt docs
        // console.log(response);
        setIsSignedIn(true); // the loader doesnot stop here it still has to fetch data
        requestServerToGetInterviewExperience(token);
      } catch (error) {
        // either token is invalid or session expired, isSignedIn remains same
        console.log(error.response.data);
        navigate(-1); // isSignedIn remains false, navigate back
      }
    }

    function verifySignInStatus() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate(-1); // isSignedIn remains false, navigate back
      } else {
        requestServerToVerifyToken(token);
      }
    }

    verifySignInStatus();
  }, [navigate]);

  const loader = (
    <div className={contri.loaderDiv}>
      <Loader />;
    </div>
  );

  const element = (
    <div>
      <h1>sfnkjwejnfk</h1>
    </div>
  );

  return (
    <div>
      <Navbar isSignedIn={isSignedIn} />
      {isLoading ? loader : element}
      <Footer />
      <Toast />
    </div>
  );
}

export default EditExperience;
