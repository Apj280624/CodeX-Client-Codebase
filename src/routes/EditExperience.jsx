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
import {
  generateAxiosConfigHeader,
  transformInterviewExperienceObject,
  validateInterviewExperience,
} from "../utilities/ClientUtility.js";
import { SERVER_ORIGIN, routes, vars } from "../utilities/ClientVarsUtility.js";
import Toast, { toastOptions } from "../components/Toast.js";
import { useNavigate, useParams } from "react-router-dom";

const axios = require("axios").default;

/* 
a person cannot visit this page if he is not signed in, but if he signed in  and visits this page and then signs 
out from some other tab then there's no problem, user will just see an interview experience in the editable 
form, he can read and edit but cannot save changes without logging in

important case: lets say a user signs in with an email add 'X' and then visits this page and edits, logs out from
other tab and then signs in with an email 'Y' and then make an edit request then also there's no problem
because at the server side the search condition is email,id so it will ensure whether the interview
experience belongs to the email or not

refer to contribution component if need to know about resetting interview experience fields
here we are allowing the user to reedit even after saving changes

*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function EditExperience() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const initialInterviewExperienceObject = {
    companyName: "",
    roleName: "",
    monthName: "",
    year: "",
    difficulty: "",
    opportunity: "",
    experience: "",
    tip: "",
  };

  const [interviewExperience, setInterviewExperience] = useState(
    initialInterviewExperienceObject
  );

  let { id } = useParams(); // curly brackets are imp
  const navigate = useNavigate();

  /////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top after render

    async function requestServerToGetInterviewExperience(token) {
      if (!token) {
        navigate(routes.INTERVIEW_EXPERIENCES); // user might have signed out, isSignedIn remains false, navigate back
      } else {
        try {
          const response = await axios.get(
            `${
              SERVER_ORIGIN + routes.PARTICULAR_INTERVIEW_EXPERIENCE + "/" + id
            }`
          );
          setIsLoading(false); // set loading to false, and fill cards with data
          // console.log(response.data.interviewExperience); // set loading to false
          const data = await response.data.interviewExperience;
          // console.log(data);
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
        // console.log(error.response.data);
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

    // setIsDone(false);

    verifySignInStatus();
  }, [navigate, id]);

  //////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////////

  function updateInterviewExperience(updatedField) {
    setInterviewExperience((prevInterviewExperience) => ({
      ...prevInterviewExperience,
      ...updatedField,
    }));

    // console.log(interviewExperience);
  }

  async function requestServerToEditInterviewExperience() {
    // first transform and validate at front end, don't bother the server unnecessarily
    await setInterviewExperience((prevInterviewExperience) =>
      transformInterviewExperienceObject(prevInterviewExperience)
    );

    const { res, desc } = validateInterviewExperience(interviewExperience);
    if (!res) {
      toast(desc, toastOptions);
    } else {
      const token = localStorage.getItem("token"); // pass token with contribution using generateAxiosConfig
      if (!token) {
        navigate(-1); // go back
      } else {
        setIsSaveDisabled(true);
        try {
          const response = await axios.put(
            `${SERVER_ORIGIN}${routes.INTERVIEW_EXPERIENCE_EDIT}/${id}`,
            transformInterviewExperienceObject(interviewExperience),
            generateAxiosConfigHeader(token)
          );
          // console.log(response);

          setIsSaveDisabled(false);
          toast(response.data, toastOptions);
          /* let fields remain same even if edit is successful so user can still edit, if you wanna reset fields on
          refer to the contribution component
          */
        } catch (error) {
          // console.log(error);
          setIsSaveDisabled(false);
          toast(error.response.data, toastOptions); // donot reset the fields
        }
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////

  const loader = (
    <div className={contri.loaderDiv}>
      <Loader />;
    </div>
  );

  const element = (
    <div>
      <div className={contri.allDiv}>
        <div className={contri.commonDiv}>
          <div className="container-fluid">
            <p className={`${contri.headingText} ${contri.commonText}`}>
              Edit it here !
            </p>
            <p className={`${contri.alertText} ${contri.commonText}`}>
              Remember ! You must sign in to edit
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
                    initialValue={interviewExperience.companyName}
                    onChange={updateInterviewExperience}
                    isDone={isDone}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className={contri.inputDiv}>
                  <CredentialInput
                    name="roleName"
                    placeholder="Role ( e.g. SDE, SWE, MTS etc ) *"
                    width="100%"
                    initialValue={interviewExperience.roleName}
                    onChange={updateInterviewExperience}
                    isDone={isDone}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className={contri.inputDiv}>
                  <CredentialInput
                    name="monthName"
                    placeholder="Month ( e.g. Jan ) *"
                    width="100%"
                    initialValue={interviewExperience.monthName}
                    onChange={updateInterviewExperience}
                    isDone={isDone}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className={contri.inputDiv}>
                  <CredentialInput
                    name="year"
                    placeholder="Year ( e.g. 2022, 2023 etc )*"
                    width="100%"
                    initialValue={interviewExperience.year}
                    onChange={updateInterviewExperience}
                    isDone={isDone}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className={contri.inputDiv}>
                  <CredentialInput
                    name="difficulty"
                    placeholder="Difficulty level ( 1 - 5 ) *"
                    width="100%"
                    initialValue={interviewExperience.difficulty}
                    onChange={updateInterviewExperience}
                    isDone={isDone}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className={contri.inputDiv}>
                  <CredentialInput
                    name="opportunity"
                    placeholder="Opportunity / Program ( e.g. Off campus, Martians etc ) *"
                    width="100%"
                    initialValue={interviewExperience.opportunity}
                    onChange={updateInterviewExperience}
                    isDone={isDone}
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
              maxLength={vars.maxExperienceLen}
              initialValue={interviewExperience.experience}
              onChange={updateInterviewExperience}
              isDone={isDone}
            />
            <TextArea
              name="tip"
              rows="4"
              maxLength={vars.maxTipLen}
              placeholder="Concluding Tips"
              initialValue={interviewExperience.tip}
              onChange={updateInterviewExperience}
              isDone={isDone}
            />
          </div>
          <div className={contri.contriButtonDiv}>
            <div className="container-fluid">
              <CredentialButton
                text="Saves changes"
                width="100%"
                // height="50px"
                onClick={requestServerToEditInterviewExperience}
                isDisabled={isSaveDisabled}
              />
            </div>
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
