import React from "react";
import Acc from "../css/account.module.css";

function PersonalDetailsCard(props) {
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className={Acc.commonDiv}>
          <p style={{ marginTop: 0 }} className={Acc.commonText}>
            <span className={Acc.boldText}>Name: </span>
            {`${props.firstName} ${props.lastName}`}
          </p>
          <p className={Acc.commonText}>
            <span className={Acc.boldText}>Email Address: </span>
            {props.emailAddress}
          </p>
          <p className={Acc.commonText}>
            <span className={Acc.boldText}>College name: </span>
            {props.collegeName}
          </p>

          <p className={Acc.commonText}>
            <span className={Acc.boldText}>Branch: </span>
            {props.branchName}
          </p>
          <p style={{ marginBottom: 0 }} className={Acc.commonText}>
            <span className={Acc.boldText}>Graduation year: </span>
            {props.graduationYear}
          </p>
        </div>
      </div>
      <div className="col-lg-4">
        <div className={Acc.commonDiv}>
          <p
            style={{ marginTop: 0 }}
            className={`${Acc.contriText} ${Acc.commonText} `}
          >
            <span className={Acc.boldText}>Joined us on: </span>
            {props.timeStamp}
          </p>
          <p className={`${Acc.contriText} ${Acc.commonText}`}>
            <span className={Acc.boldText}>Contributions </span>
          </p>
          <div className={Acc.circleDiv}>
            <p className={`${Acc.countText} ${Acc.commonText}`}>
              {props.noOfContributions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetailsCard;
