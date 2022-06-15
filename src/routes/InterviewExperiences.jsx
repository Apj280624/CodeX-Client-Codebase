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
  const [arrayOfInterviewExperiences, setArrayOfInterviewExperiences] =
    useState([]);

  async function requestServerToGetInterviewExperiences() {
    try {
      const response = await axios.get(
        SERVER_ORIGIN + routes.INTERVIEW_EXPERIENCES
      );
      setIsLoading(false); // set loading to false, and fill cards with data
      // console.log(response.data.arrayOfInterviewExperiences);
      setArrayOfInterviewExperiences(response.data.arrayOfInterviewExperiences);
    } catch (error) {
      // console.log(error);
    }
  }

  useEffect(() => {
    requestServerToGetInterviewExperiences();
  }, []);

  const loader = (
    <div className={Intex.loaderDiv}>
      <Loader />;
    </div>
  );

  const element = (
    <div className={Intex.bottomDiv}>
      <div className="">
        <div className="row">
          {arrayOfInterviewExperiences.map((interviewExperience) => (
            <div key={interviewExperience._id} className="col-lg-4 col-md-6">
              <ExperienceCard
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
