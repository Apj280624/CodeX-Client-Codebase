import React from "react";
import Navbar from "../components/Navbar";
import ContributeCard from "../components/ContributeCard";
import SearchBar from "../components/SearchBar";
import "../css/interview-experiences.css";

function InterviewExperiences() {
  return (
    <div>
      <Navbar />
      <div className="contribute-card-extra-div-intex">
        <ContributeCard />
      </div>
      <div className="search-bar-extra-div-intex">
        <SearchBar />
      </div>
    </div>
  );
}

export default InterviewExperiences;
