import React from "react";
import "../css/contribute-card.css";

function ContributeCard() {
  return (
    <div className="container">
      <div className="row contribute-card-div">
        <div className="contribute-card-subdiv-1">
          <p className="d-text">
            Contributing your interview experience might help a lot of students
            get insights of a real interview. This could help them prepare well
            for the future interview and land a job at their dream companies.
          </p>
        </div>
        <div className="contribute-card-subdiv-2">
          <h1 className="contribute-text">Contribute</h1>
        </div>
      </div>
    </div>
  );
}

export default ContributeCard;
