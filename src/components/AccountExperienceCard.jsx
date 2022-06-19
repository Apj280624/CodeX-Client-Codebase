import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Acc from "../css/account.module.css";

// my modules
import { routes, SERVER_ORIGIN } from "../utilities/ClientVarsUtility.js";
import { generateAxiosConfigHeader } from "../utilities/ClientUtility";
import Toast, { toastOptions } from "../components/Toast.js";

const axios = require("axios").default;

//////////////////////////////////////////////////////////////////////////////////////////////////////////

function AccountExperienceCard(props) {
  const [deleteCode, setDeleteCode] = useState(0);

  const navigate = useNavigate();
  function handleReadClick() {
    const id = props.id;
    navigate(`${routes.INTERVIEW_EXPERIENCE_READ}/${id}`);
  }

  function handleEditClick() {
    const id = props.id;
    navigate(`${routes.INTERVIEW_EXPERIENCE_EDIT + "/" + id}`);
  }

  async function requestServerToDeleteInterviewExperience() {
    const token = localStorage.getItem("token"); // pass token with contribution using generateAxiosConfig
    if (!token) {
      navigate(-1); // go back
    } else {
      try {
        const id = props.id;
        const response = await axios.delete(
          `${SERVER_ORIGIN}${routes.INTERVIEW_EXPERIENCE_DELETE}/${id}`,
          generateAxiosConfigHeader(token)
        );
        console.log(response);
        props.onDelete(props.id);
        toast(response.data, toastOptions);
        navigate(routes.ACCOUNT);
        // to alter parent state, we need a function
        //props.onDelete();
        // let fields remain same even if contribution is successful so user can still edit
      } catch (error) {
        console.log(error);
        toast(error.response.data, toastOptions);
      }
    }
  }

  function handleDeleteClick() {
    if (deleteCode === 0) {
      setDeleteCode(1);
      toast("Click again to confirm !", {
        ...toastOptions,
        ...{ autoClose: 1000 },
      }); // overriding close time
      setTimeout(() => {
        setDeleteCode(0);
      }, 3000);
    } else {
      console.log("deleted");
      requestServerToDeleteInterviewExperience();
    }
  }

  return (
    <div className="">
      <Toast />
      <div className={Acc.marginDiv}>
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
            <span className={Acc.boldText}>Month: </span>
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
          <button className={Acc.btn} onClick={handleReadClick}>
            Read
          </button>
          <button
            style={{ marginLeft: "2%", marginRight: "2%" }}
            className={`${Acc.midBtn} ${Acc.btn}`}
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button className={Acc.btn} onClick={handleDeleteClick}>
            {deleteCode === 0 ? "Delete" : "Sure ?"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountExperienceCard;
