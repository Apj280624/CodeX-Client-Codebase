import React, { useEffect, useState } from "react";
import ContributeCard from "../components/ContributeCard";
import SearchBar from "../components/SearchBar";
import Intex from "../css/interview-experiences.module.css";
import ExperienceCard from "../components/ExperienceCard";
import Loader from "../components/Loader.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

// my modules
import { SERVER_ORIGIN, routes } from "../utilities/ClientVarsUtility.js";

const axios = require("axios").default;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 
inside requestServerToGetContributionDetails:
no mess, just get all the interview experiences and display them up
after fetching is completed, set isLoad ing to false, and display them on the cards

from the data array recieved from the server side, create an array of components filled with that data using map
and just return that array inside the element var
*/

function InterviewExperiences() {
  // when loading return a loader and when its loaded return cards

  const [isLoading, setIsLoading] = useState(true);
  const [arrayOfContributionDetails, setArrayOfContributionDetails] = useState(
    []
  );

  async function requestServerToGetContributionDetails() {
    try {
      const response = await axios.get(SERVER_ORIGIN + routes.CONTRIBUTIONS);
      await setIsLoading(false); // set loading to false, and fill cards with data
      console.log(response.data.arrayOfContributionDetails);
      setArrayOfContributionDetails(response.data.arrayOfContributionDetails);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    requestServerToGetContributionDetails();
  }, []);

  const loader = (
    <div className={Intex.loaderDiv}>
      <Loader />;
    </div>
  );

  const element = (
    <div className={Intex.bottomDiv}>
      <div className="container">
        <div className="row">
          {arrayOfContributionDetails.map((contributionDetails) => (
            <div key={contributionDetails._id} className="col-lg-4 col-md-6">
              <ExperienceCard
                id={contributionDetails._id}
                companyName={contributionDetails.companyName}
                roleName={contributionDetails.roleName}
                year={contributionDetails.year}
                opportunity={contributionDetails.opportunity}
                firstName={contributionDetails.firstName}
                lastName={contributionDetails.lastName}
                collegeName={contributionDetails.collegeName}
                graduationYear={contributionDetails.graduationYear}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className={Intex.contributeCardExtraDivIntex}>
        <ContributeCard />
      </div>
      <div className={Intex.searchBarExtraDivIntex}>
        <SearchBar />
      </div>
      {isLoading ? loader : element}
      <Footer />
    </div>
  );
}

export default InterviewExperiences;

/*
          <div className="col-lg-4">
            <ExperienceCard />
          </div>
          <div className="col-lg-4">
            <ExperienceCard />
          </div>
          <div className="col-lg-4">
            <ExperienceCard />
          </div>
          <div className="col-lg-4">
            <ExperienceCard />
          </div>
          <div className="col-lg-4">
            <ExperienceCard />
          </div>
          <div className="col-lg-4">
            <ExperienceCard />
          </div>
          <div className="col-lg-4">
            <ExperienceCard />
          </div>
          <div className="col-lg-4">
            <ExperienceCard />
          </div>
          <div className="col-lg-4">
            <ExperienceCard />
          </div>
          <div className="col-lg-4">
            <ExperienceCard />
          </div>
          <div className="col-lg-4">
            <ExperienceCard />
          </div>
          <div className="col-lg-4">
            <ExperienceCard />
          </div> */

// <div className={Intex.bottomDiv}>
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//           </div>
//         </div>
//       </div>

// <div className={Intex.contributeCardExtraDivIntex}>
//         <ContributeCard />
//       </div>
//       <div className={Intex.searchBarExtraDivIntex}>
//         <SearchBar />
//       </div>

//       <div className={Intex.bottomDiv}>
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//             <div className="col-lg-4">
//               <ExperienceCard />
//             </div>
//           </div>
//         </div>
//       </div>
