import React from "react";
import experienceCard from "../css/experience-card.module.css";
import { useNavigate } from "react-router-dom";

// my modules
import { routes } from "../utilities/ClientVarsUtility.js";

///////////////////////////////////////////////////////////////////////////////////////////////////////////

function resizeObject(props) {
  let resizedObject = {
    companyName: props.companyName.substring(0, 12),
    roleName: props.roleName.substring(0, 28),
    monthName: props.monthName,
    year: props.year,
    opportunity: props.opportunity.substring(0, 30),
    difficulty: props.difficulty,
    fullName: (props.firstName + " " + props.lastName).substring(0, 15),
    collegeName: props.collegeName,
    branchName: props.branchName,
    graduationYear: props.graduationYear.substring(2, 4),
  };

  if (props.companyName.length > 12) {
    resizedObject.companyName += "... ";
  }
  if (props.roleName.length > 28) {
    resizedObject.roleName += "... ";
  }
  if (props.opportunity.length > 30) {
    resizedObject.opportunity += "... ";
  }
  if ((props.firstName + " " + props.lastName).length > 15) {
    resizedObject.fullName += "... ";
  }

  return resizedObject;
}

function ExperienceCard(props) {
  const resizedObject = resizeObject(props);
  const navigate = useNavigate();

  function handleClick() {
    //  const navigate = useNavigate();
    const id = props.id;
    navigate(`${routes.READ}/${id}`);
  }

  //  console.log(resizeObject);

  return (
    <div onClick={handleClick} className="">
      <div className={experienceCard.outerDiv}>
        <p
          className={`${experienceCard.companyText} ${experienceCard.commonText}`}
        >
          {resizedObject.companyName}
        </p>
        <p
          className={`${experienceCard.yearText} ${experienceCard.commonText}`}
        >
          {resizedObject.roleName}, {resizedObject.monthName}{" "}
          {resizedObject.year}
        </p>
        <p
          className={`${experienceCard.yearText} ${experienceCard.commonText}`}
        >
          {resizedObject.opportunity}
        </p>
        <p
          className={`${experienceCard.yearText} ${experienceCard.commonText}`}
        >
          {`Difficulty level: ${props.difficulty}⭐`}
        </p>
        <p
          className={`${experienceCard.authorText} ${experienceCard.commonText}`}
        >
          {resizedObject.fullName}, {resizedObject.collegeName}{" "}
          {resizedObject.branchName} '{resizedObject.graduationYear}
        </p>
      </div>
    </div>
  );
}

export default ExperienceCard;
