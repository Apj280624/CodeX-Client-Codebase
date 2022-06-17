import React from "react";
import { useNavigate } from "react-router-dom";
import Acc from "../css/account.module.css";

// my modules
import { routes } from "../utilities/ClientVarsUtility.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////

function AccountExperienceCard(props) {
  const navigate = useNavigate();
  function handleReadClick() {
    const id = props.id;
    navigate(`${routes.READ}/${id}`);
  }

  return (
    <div className="">
      <div className="">
        <div className={Acc.commonDiv}>
          <p style={{ marginTop: 0 }} className={Acc.commonText}>
            <span className={Acc.boldText}>Company name: </span>
            {props.companyName}
          </p>
          <p className={Acc.commonText}>
            <span className={Acc.boldText}>Role name: </span>
            {props.roleName}
          </p>
          <p className={Acc.commonText}>
            <span className={Acc.boldText}>Month name: </span>
            {props.monthName}
          </p>
          <p className={Acc.commonText}>
            <span className={Acc.boldText}>Year: </span>
            {props.year}
          </p>
          <p style={{ marginBottom: 0 }} className={Acc.commonText}>
            <span className={Acc.boldText}>Difficulty level: </span>
            {props.difficulty}
          </p>
          <p style={{ marginBottom: 0 }} className={Acc.commonText}>
            <span className={Acc.boldText}>Opportunity: </span>
            {props.opportunity}
          </p>
          <p style={{ marginBottom: 0 }} className={Acc.commonText}>
            <span className={Acc.boldText}>Contributed on: </span>
            {props.creationTimeStamp}
          </p>
        </div>
        {/* </div> */}
        {/* <div className="col-lg-12"> */}
        <div className={`${Acc.commonDiv} ${Acc.allBtnDiv}`}>
          <button onClick={handleReadClick} className={Acc.btn}>
            Read
          </button>
          <button
            style={{ marginLeft: "2%", marginRight: "2%" }}
            className={`${Acc.midBtn} ${Acc.btn}`}
          >
            Edit
          </button>
          <button className={Acc.btn}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default AccountExperienceCard;
