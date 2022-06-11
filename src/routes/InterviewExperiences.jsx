import React from "react";
import Navbar from "../components/Navbar";
import ContributeCard from "../components/ContributeCard";
import SearchBar from "../components/SearchBar";
import Intex from "../css/interview-experiences.module.css";
import ExperienceCard from "../components/ExperienceCard";

function InterviewExperiences() {
  // when loading return a spinner and when its loaded return cards

  return (
    <div>
      <Navbar />
      <div className={Intex.contributeCardExtraDivIntex}>
        <ContributeCard />
      </div>
      <div className={Intex.searchBarExtraDivIntex}>
        <SearchBar />
      </div>
      {/* <ExperienceCard /> */}
      <div className={Intex.bottomDiv}>
        <div className="container">
          <div className="row">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewExperiences;
