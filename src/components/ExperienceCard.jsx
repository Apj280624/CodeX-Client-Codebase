import React from "react";
import experienceCard from "../css/experience-card.module.css";
import { useNavigate } from "react-router-dom";

// my modules
import { routes } from "../utilities/ClientVarsUtility.js";

///////////////////////////////////////////////////////////////////////////////////////////////////////////

function resizeObject(props) {
  let resizedObject = {
    companyName: props.companyName.substring(0, 12),
    roleName: props.roleName.substring(0, 30),
    year: props.year,
    opportunity: props.opportunity.substring(0, 30),
    fullName: (props.firstName + " " + props.lastName).substring(0, 18),
    collegeName: props.collegeName,
    graduationYear: props.graduationYear.substring(2, 4),
  };

  if (props.companyName.length > 12) {
    resizedObject.companyName += "... ";
  }
  if (props.roleName.length > 30) {
    console.log(props.companyName);
    resizedObject.roleName += "... ";
  }
  if (props.opportunity.length > 30) {
    resizedObject.opportunity += "... ";
  }
  if ((props.firstName + " " + props.lastName).length > 18) {
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
    navigate(routes.INTERVIEW_EXPERIENCES + `/${id}`);
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
          {resizedObject.roleName}, {resizedObject.year}
        </p>
        <p
          className={`${experienceCard.yearText} ${experienceCard.commonText}`}
        >
          {resizedObject.opportunity}
        </p>
        <p
          className={`${experienceCard.authorText} ${experienceCard.commonText}`}
        >
          {resizedObject.fullName}, {resizedObject.collegeName} '
          {resizedObject.graduationYear}
        </p>
      </div>
    </div>
  );
}

export default ExperienceCard;
