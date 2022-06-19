import React, { useEffect, useState } from "react";
import Acc from "../css/account.module.css";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonalDetailsCard from "../components/PersonalDetailsCard.jsx";
import AccountExperienceCard from "../components/AccountExperienceCard.jsx";

// my modules
import { SERVER_ORIGIN, routes } from "../utilities/ClientVarsUtility.js";
import {
  generateAxiosConfigHeader,
  getGoodDate,
  resizeField,
} from "../utilities/ClientUtility.js";
import Toast, { toastOptions } from "../components/Toast.js";

const axios = require("axios").default;

/*
user data could be displayed only if he is signed in
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Account() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({});
  const [arrayOfInterviewExperiences, setArrayOfInterviewExperiences] =
    useState([]);

  const navigate = useNavigate();

  async function requestServerToGetAccountDetails(token) {
    try {
      const response = await axios.get(
        SERVER_ORIGIN + routes.ACCOUNT,
        generateAxiosConfigHeader(token)
      );

      setIsLoading(false); // set loading to false, and fill cards with data

      // console.log(response.data.arrayOfInterviewExperiences);
      const accountDetails = response.data;
      // console.log(accountDetails);
      setPersonalDetails(accountDetails.personalDetails);
      setArrayOfInterviewExperiences(
        accountDetails.arrayOfInterviewExperiences
      );
    } catch (error) {
      // console.log(error);
      toast(error.response.data, toastOptions);
    }
  }

  function deleteInterviewExperienceFromArray(id) {
    console.log(id);
    setArrayOfInterviewExperiences((prevArray) => {
      return prevArray.filter(
        (prevInterviewExperience) => prevInterviewExperience._id !== id
      );
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top after render

    async function requestServerToVerifyToken(token) {
      try {
        const response = await axios.get(
          SERVER_ORIGIN + routes.VERIFY_TOKEN,
          generateAxiosConfigHeader(token)
        ); // read about Bearer schema in jwt docs
        // console.log(response);
        setIsSignedIn(true); // the loader doesnot stop here it still has to fetch data
        requestServerToGetAccountDetails(token);
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

  ////////////////////////////////////////////////////////////////////////////////////////////

  const loader = (
    <div className={Acc.loaderDiv}>
      <Loader />
    </div>
  );

  const element = (
    <div className={Acc.allDiv}>
      <div className="container-fluid">
        <p className={`${Acc.headingText} ${Acc.commonText}`}>
          Here's your Personal details
        </p>
        <div className={Acc.detailsDiv}>
          <div class={Acc.marginDiv}>
            <PersonalDetailsCard
              firstName={personalDetails.firstName}
              lastName={personalDetails.lastName}
              emailAddress={personalDetails.emailAddress}
              collegeName={personalDetails.collegeName}
              branchName={personalDetails.branchName}
              graduationYear={personalDetails.graduationYear}
              creationTimeStamp={getGoodDate(personalDetails.creationTimeStamp)}
              noOfContributions={personalDetails.noOfContributions}
            />
          </div>
        </div>
        <p
          style={{ marginTop: "50px" }}
          className={`${Acc.headingText} ${Acc.commonText}`}
        >
          {arrayOfInterviewExperiences.length > 0
            ? "Here are your Contributions"
            : "No contributions yet"}
        </p>
        <div className={Acc.detailsDiv}>
          <div className="row">
            {arrayOfInterviewExperiences.map((interviewExperience) => (
              <div key={interviewExperience._id} className="col-lg-12">
                <AccountExperienceCard
                  id={interviewExperience._id}
                  companyName={resizeField(
                    interviewExperience.companyName,
                    0,
                    50
                  )}
                  roleName={resizeField(interviewExperience.roleName, 0, 50)}
                  monthName={interviewExperience.monthName}
                  year={interviewExperience.year}
                  opportunity={resizeField(
                    interviewExperience.opportunity,
                    0,
                    50
                  )}
                  difficulty={interviewExperience.difficulty}
                  firstName={interviewExperience.firstName}
                  lastName={interviewExperience.lastName}
                  collegeName={interviewExperience.collegeName}
                  branchName={interviewExperience.branchName}
                  graduationYear={interviewExperience.graduationYear}
                  creationTimeStamp={getGoodDate(
                    interviewExperience.creationTimeStamp
                  )}
                  onDelete={deleteInterviewExperienceFromArray}
                />
              </div>
            ))}
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

export default Account;
