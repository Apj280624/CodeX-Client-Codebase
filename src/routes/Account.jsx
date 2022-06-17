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
        SERVER_ORIGIN + routes.ACCOUNT_INTERVIEW_EXPERIENCES,
        generateAxiosConfigHeader(token)
      );
      setIsLoading(false); // set loading to false, and fill cards with data

      // console.log(response.data.arrayOfInterviewExperiences);
      const accountDetails = response.data;
      setPersonalDetails(accountDetails.personalDetails);
      setArrayOfInterviewExperiences(
        accountDetails.arrayOfInterviewExperiences
      );
    } catch (error) {
      // console.log(error);
      toast(error.response.data, toastOptions);
    }
  }

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

  const loader = (
    <div className={Acc.loaderDiv}>
      <Loader />
    </div>
  );

  const element = (
    <div className={Acc.allDiv}>
      <div className="container-fluid">
        <p
          style={{ marginTop: "150px" }}
          className={`${Acc.headingText} ${Acc.commonText}`}
        >
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
          Here are your Contributions
        </p>
        <div className={Acc.detailsDiv}>
          <div className="row">
            {arrayOfInterviewExperiences.map((interviewExperience) => (
              <div key={interviewExperience._id} class={Acc.marginDiv}>
                <AccountExperienceCard
                  id={interviewExperience._id}
                  companyName={interviewExperience.companyName}
                  roleName={interviewExperience.roleName}
                  monthName={interviewExperience.monthName}
                  year={interviewExperience.year}
                  opportunity={interviewExperience.opportunity}
                  difficulty={interviewExperience.difficulty}
                  firstName={interviewExperience.firstName}
                  lastName={interviewExperience.lastName}
                  collegeName={interviewExperience.collegeName}
                  branchName={interviewExperience.branchName}
                  graduationYear={interviewExperience.graduationYear}
                  creationTimeStamp={getGoodDate(
                    interviewExperience.creationTimeStamp
                  )}
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

// function PersonalDetails(props) {
//   return (
//     <div className="row">
//       <div className="col-lg-8">
//         <div className={Acc.commonDiv}>
//           <p style={{ marginTop: 0 }} className={Acc.commonText}>
//             <span className={Acc.boldText}>Name: </span>
//             {`${props.firstName} ${props.lastName}`}
//           </p>
//           <p className={Acc.commonText}>
//             <span className={Acc.boldText}>Email Address: </span>
//             {props.emailAddress}
//           </p>
//           <p className={Acc.commonText}>
//             <span className={Acc.boldText}>College name: </span>
//             {props.collegeName}
//           </p>

//           <p className={Acc.commonText}>
//             <span className={Acc.boldText}>Branch: </span>
//             {props.branchName}
//           </p>
//           <p style={{ marginBottom: 0 }} className={Acc.commonText}>
//             <span className={Acc.boldText}>Graduation year: </span>
//             {props.graduationYear}
//           </p>
//         </div>
//       </div>
//       <div className="col-lg-4">
//         <div className={Acc.commonDiv}>
//           <p
//             style={{ marginTop: 0 }}
//             className={`${Acc.contriText} ${Acc.commonText} `}
//           >
//             <span className={Acc.boldText}>Joined us on: </span>
//             {props.timeStamp}
//           </p>
//           <p className={`${Acc.contriText} ${Acc.commonText}`}>
//             <span className={Acc.boldText}>Contributions </span>
//           </p>
//           <div className={Acc.circleDiv}>
//             <p className={`${Acc.countText} ${Acc.commonText}`}>
//               {props.noOfContributions}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InterviewExperienceDetails() {
//   return (
//     <div className="row">
//       <div className="col-lg-12">
//         <div className={Acc.commonDiv}>
//           <p style={{ marginTop: 0 }} className={Acc.commonText}>
//             <span className={Acc.boldText}>Company name: </span> Google
//           </p>
//           <p className={Acc.commonText}>
//             <span className={Acc.boldText}>Role name: </span>
//             SWE
//           </p>
//           <p className={Acc.commonText}>
//             <span className={Acc.boldText}>Month name: </span>
//             Mar
//           </p>
//           <p className={Acc.commonText}>
//             <span className={Acc.boldText}>Year: </span>
//             2023
//           </p>
//           <p style={{ marginBottom: 0 }} className={Acc.commonText}>
//             <span className={Acc.boldText}>Difficulty level: </span>5
//           </p>
//           <p style={{ marginBottom: 0 }} className={Acc.commonText}>
//             <span className={Acc.boldText}>Opportunity: </span>
//             On Campus
//           </p>
//           <p style={{ marginBottom: 0 }} className={Acc.commonText}>
//             <span className={Acc.boldText}>Contributed on: </span>
//             20-04-2023
//           </p>
//         </div>
//       </div>
//       <div className="col-lg-12">
//         <div className={`${Acc.commonDiv} ${Acc.allBtnDiv}`}>
//           <button className={Acc.btn}>Read</button>
//           <button
//             style={{ marginLeft: "2%", marginRight: "2%" }}
//             className={`${Acc.midBtn} ${Acc.btn}`}
//           >
//             Edit
//           </button>
//           <button className={Acc.btn}>Delete</button>
//         </div>
//       </div>
//     </div>
//   );
// }
