import React, { useEffect, useState } from "react";
import ContributeCard from "../components/ContributeCard";
import SearchBar from "../components/SearchBar";
import Intex from "../css/interview-experiences.module.css";
import ExperienceCard from "../components/ExperienceCard";
import Loader from "../components/Loader.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

// my modules
import { SERVER_ORIGIN, routes } from "../utilities/ClientVarsUtility.js";
import {
  generateAxiosConfigHeader,
  resizeObject,
  manipulateInteviewExperiencesRoute,
  transformToTitleCase,
} from "../utilities/ClientUtility.js";

import Toast, { toastOptions } from "../components/Toast.js";
import CredentialButton from "../components/CredentialButton";

const axios = require("axios").default;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 
inside requestServerToGetContributionDetails:
no mess, just get all the interview experiences and display them up
after fetching is completed, set isLoad ing to false, and display them on the cards

from the data array recieved from the server side, create an array of components filled with that data using map
and just return that array inside the element var
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function InterviewExperiences() {
  // when loading return a loader and when its loaded return cards

  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [arrayOfInterviewExperiences, setArrayOfInterviewExperiences] =
    useState([]);

  async function requestServerToGetInterviewExperiences() {
    try {
      var response = await axios.get(
        `${SERVER_ORIGIN}${routes.INTERVIEW_EXPERIENCES}/${"all"}`
      );

      setIsLoading(false); // set loading to false, and fill cards with data
      // console.log(response.data.arrayOfInterviewExperiences);
      setArrayOfInterviewExperiences(
        manipulateInteviewExperiencesRoute(
          response.data.arrayOfInterviewExperiences
        )
      ); // here we added a fullName field to the objects
    } catch (error) {
      // console.log(error);
    }
  }

  async function requestServerToVerifyToken(token) {
    try {
      const response = await axios.get(
        SERVER_ORIGIN + routes.VERIFY_TOKEN,
        generateAxiosConfigHeader(token)
      ); // read about Bearer schema in jwt docs
      // console.log(response);
      setIsSignedIn(true);
    } catch (error) {
      // either token is invalid or session expired, isSignedIn remains same
      // console.log(error);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top after render
    function verifySignInStatus() {
      const token = localStorage.getItem("token");
      if (!token) {
        // isSignedIn remains false
      } else {
        requestServerToVerifyToken(token);
      }
    }

    // AOS.init({
    //   offset: 300,
    //   duration: 800,
    // });

    verifySignInStatus();
    requestServerToGetInterviewExperiences();
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////

  async function requestServerToGetSearchResults(keyword) {
    keyword = keyword.trim();
    keyword = transformToTitleCase(keyword);
    // console.log(keyword);

    if (!keyword || keyword.length === 0) {
      toast("Please enter something", toastOptions); // express won't be able to handle an empty param
    } else {
      setIsLoading(true);

      try {
        var response = await axios.get(
          `${SERVER_ORIGIN}${routes.INTERVIEW_EXPERIENCES}/${keyword}`
        );

        setIsLoading(false); // set loading to false, and fill cards with data
        setIsSearched(true);
        // console.log(response.data.arrayOfInterviewExperiences);
        setArrayOfInterviewExperiences(
          manipulateInteviewExperiencesRoute(
            response.data.arrayOfInterviewExperiences
          )
        ); // here we added a fullName field to the objects
      } catch (error) {
        // console.log(error);
      }
    }
  }

  function handleClearSearchResultsClick() {
    setIsSearched(false);
    requestServerToGetInterviewExperiences();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////

  const loader = (
    <div className={Intex.loaderDiv}>
      <Loader />
    </div>
  );

  const list = arrayOfInterviewExperiences.map((interviewExperience) => (
    <div key={interviewExperience._id} className="col-lg-4 col-md-6">
      <ExperienceCard
        id={interviewExperience._id}
        companyName={interviewExperience.companyName}
        roleName={interviewExperience.roleName}
        monthName={interviewExperience.monthName}
        year={interviewExperience.year}
        opportunity={interviewExperience.opportunity}
        difficulty={interviewExperience.difficulty}
        fullName={interviewExperience.fullName}
        collegeName={interviewExperience.collegeName}
        branchName={interviewExperience.branchName}
        graduationYear={interviewExperience.graduationYear}
      />
    </div>
  ));

  const element = (
    <div className="">
      <div className={Intex.bottomDiv}>
        <div className="">
          <div className="row">
            {list.length > 0 ? (
              list
            ) : (
              <p className={Intex.emptyText}>
                {isSearched
                  ? "Sorry! we found nothing matching your search"
                  : "Hey, you have the chance to be the first one to contribute !"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar isSignedIn={isSignedIn} />
      <div className={Intex.contributeCardExtraDivIntex}>
        <ContributeCard />
      </div>
      <div className={Intex.searchBarExtraDivIntex}>
        <SearchBar onClick={requestServerToGetSearchResults} />
      </div>
      {isSearched ? (
        <div onClick={handleClearSearchResultsClick} className={Intex.clearDiv}>
          <p className={Intex.clearText}>Clear search results</p>
        </div>
      ) : null}
      {isLoading ? loader : element}
      <Toast />
      <Footer />
    </div>
  );
}

export default InterviewExperiences;

// <div className={Intex.bottomDiv}>
//       <div className="">
//         <div className="row">
//           {arrayOfInterviewExperiences.map((interviewExperience) => (
//             <div key={interviewExperience._id} className="col-lg-4 col-md-6">
//               <ExperienceCard
//                 id={interviewExperience._id}
//                 companyName={interviewExperience.companyName}
//                 roleName={interviewExperience.roleName}
//                 monthName={interviewExperience.monthName}
//                 year={interviewExperience.year}
//                 opportunity={interviewExperience.opportunity}
//                 difficulty={interviewExperience.difficulty}
//                 firstName={interviewExperience.firstName}
//                 lastName={interviewExperience.lastName}
//                 collegeName={interviewExperience.collegeName}
//                 branchName={interviewExperience.branchName}
//                 graduationYear={interviewExperience.graduationYear}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
