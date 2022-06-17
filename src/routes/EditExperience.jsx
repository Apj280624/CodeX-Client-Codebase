import React, { useEffect, useState } from "react";
import Loader from "../components/Loader.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import CredentialInput from "../components/CredentialInput.jsx";
import CredentialButton from "../components/CredentialButton.jsx";
import TextArea from "../components/TextArea.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import contri from "../css/contribute.module.css";

// my modules
import { generateAxiosConfigHeader } from "../utilities/ClientUtility.js";
import { SERVER_ORIGIN, routes } from "../utilities/ClientVarsUtility.js";
import Toast, { toastOptions } from "../components/Toast.js";
import { useNavigate, useParams } from "react-router-dom";

const axios = require("axios").default;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function EditExperience() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [interviewExperience, setInterviewExperience] = useState({});

  const { id } = useParams(); // curly brackets are imp

  const navigate = useNavigate();

  /////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top after render

    async function requestServerToGetInterviewExperience(token) {
      try {
        const response = await axios.get(
          `${
            SERVER_ORIGIN + routes.PARTICULAR_INTERVIEW_EXPERIENCE + "/" + id
          }`,
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

  //////////////////////////////////////////////////////////////////////////////////////////////

  function updateInterviewExperience(updatedField) {
    setInterviewExperience((prevInterviewExperience) => ({
      ...prevInterviewExperience,
      ...updatedField,
    }));

    // console.log(interviewExperience);
  }

  const loader = (
    <div className={contri.loaderDiv}>
      <Loader />;
    </div>
  );

  const element = (
    <div>
      <div className={contri.commonDiv}>
        <div className="container-fluid">
          <p className={`${contri.headingText} ${contri.commonText}`}>
            We appreciate you here !
          </p>
          <p className={`${contri.alertText} ${contri.commonText}`}>
            Remember ! You must sign in to contribute
          </p>
        </div>
      </div>
      <div className={`${contri.detailsDiv} ${contri.commonDiv}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className={contri.inputDiv}>
                <CredentialInput
                  name="companyName"
                  placeholder="Company name *"
                  width="100%"
                  onChange={updateInterviewExperience}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className={contri.inputDiv}>
                <CredentialInput
                  name="roleName"
                  placeholder="Role ( e.g. SDE, SWE, MTS etc ) *"
                  width="100%"
                  onChange={updateInterviewExperience}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className={contri.inputDiv}>
                <CredentialInput
                  name="monthName"
                  placeholder="Month ( e.g. Jan ) *"
                  width="100%"
                  onChange={updateInterviewExperience}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className={contri.inputDiv}>
                <CredentialInput
                  name="year"
                  placeholder="Year ( e.g. 2022, 2023 etc ) *"
                  width="100%"
                  onChange={updateInterviewExperience}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className={contri.inputDiv}>
                <CredentialInput
                  name="difficulty"
                  placeholder="Difficulty level ( 1 - 5 ) *"
                  width="100%"
                  onChange={updateInterviewExperience}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className={contri.inputDiv}>
                <CredentialInput
                  name="opportunity"
                  placeholder="Opportunity / Program ( e.g. Off campus, Martians etc ) *"
                  width="100%"
                  onChange={updateInterviewExperience}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={contri.commonDiv}>
        <div className="container-fluid">
          <p className={`${contri.noteText}`}>
            Tip: Please do considering using multiple paragraphs for a cleaner
            representation
          </p>
        </div>
      </div>

      <div className={`${contri.contentDiv} ${contri.commonDiv}`}>
        <div className="container-fluid">
          <TextArea
            name="experience"
            rows="8"
            placeholder="Interview Experience"
            onChange={updateInterviewExperience}
          />
          <TextArea
            name="tip"
            rows="4"
            placeholder="Concluding Tips"
            onChange={updateInterviewExperience}
          />
        </div>
        <div className={contri.contriButtonDiv}>
          <div className="container-fluid">
            <CredentialButton
              text="Contribute Experience"
              width="100%"
              height="50px"
            />
          </div>
        </div>
      </div>
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
