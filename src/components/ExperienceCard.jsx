import React from "react";
import experienceCard from "../css/experience-card.module.css";

function ExperienceCard() {
  return (
    <div className="">
      <div className={experienceCard.outerDiv}>
        <p
          className={`${experienceCard.companyText} ${experienceCard.commonText}`}
        >
          Facebook
        </p>
        <p
          className={`${experienceCard.yearText} ${experienceCard.commonText}`}
        >
          in 2023
        </p>
        <p
          className={`${experienceCard.authorText} ${experienceCard.commonText}`}
        >
          Apoorv Jain, LNCT '23
        </p>
      </div>
    </div>
  );
}

export default ExperienceCard;
