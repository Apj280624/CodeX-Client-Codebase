import React from "react";
import CredentialButton from "../components/CredentialButton.jsx";
import experienceCard from "../css/experience-card.module.css";
import { useNavigate } from "react-router-dom";

// my modules
import { routes } from "../utilities/ClientVarsUtility.js";
import { getStars } from "../utilities/ClientUtility.js";

///////////////////////////////////////////////////////////////////////////////////////////////////////////

function ExperienceCard(props) {
  const navigate = useNavigate();

  function handleReadClick() {
    const id = props.id;
    navigate(`${routes.INTERVIEW_EXPERIENCE_READ}/${id}`);
  }

  //  console.log(resizeObject);

  return (
    <div onClick={handleReadClick} className="">
      <div className={experienceCard.outerDiv}>
        <p
          className={`${experienceCard.companyText} ${experienceCard.commonText}`}
        >
          {props.companyName}
        </p>
        <p
          className={`${experienceCard.yearText} ${experienceCard.commonText}`}
        >
          {props.roleName}, {props.monthName} {props.year}
        </p>
        <p
          className={`${experienceCard.yearText} ${experienceCard.commonText}`}
        >
          {props.opportunity}
        </p>
        <p
          className={`${experienceCard.yearText} ${experienceCard.commonText}`}
        >
          {/* {`Difficulty level: ${props.difficulty}⭐`} */}
          {getStars(props.difficulty)}
        </p>
        <p
          className={`${experienceCard.authorText} ${experienceCard.commonText}`}
        >
          {props.fullName}, {props.collegeName} {props.branchName} '
          {props.graduationYear}
        </p>
        <CredentialButton width="50%" height="40px" text="Read" />
      </div>
    </div>
  );
}

export default ExperienceCard;

// function resizeObjectOld(props) {
//   let resizedObject = {
//     companyName: props.companyName.substring(0, 12),
//     roleName: props.roleName.substring(0, 28),
//     monthName: props.monthName,
//     year: props.year,
//     opportunity: props.opportunity.substring(0, 30),
//     difficulty: props.difficulty,
//     fullName: (props.firstName + " " + props.lastName).substring(0, 15),
//     collegeName: props.collegeName,
//     branchName: props.branchName,
//     graduationYear: props.graduationYear.substring(2, 4),
//   };

//   if (props.companyName.length > 12) {
//     resizedObject.companyName += "... ";
//   }
//   if (props.roleName.length > 28) {
//     resizedObject.roleName += "... ";
//   }
//   if (props.opportunity.length > 30) {
//     resizedObject.opportunity += "... ";
//   }
//   if ((props.firstName + " " + props.lastName).length > 15) {
//     resizedObject.fullName += "... ";
//   }

//   return resizedObject;
// }
