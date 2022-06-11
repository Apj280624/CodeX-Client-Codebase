import React from "react";
import contriCard from "../css/contribute-card.module.css";
import featherPen from "../assets/images/feather-pen.png";

function ContributeCard() {
  return (
    <div>
      <div className="container">
        <div class="row">
          <div className="col-lg-8 col-md-12">
            <p
              className={`${contriCard.titleText} "sefkjn" ${contriCard.commonText}`}
            >
              Faced a Technical interview ?
            </p>
            <p
              className={`${contriCard.subTitleText} ${contriCard.commonText}`}
            >
              Why don't you share your experience with others. Click on the
              Feather to contribute your experience
            </p>
          </div>
          <div className="col-lg-4 col-md-12">
            <img
              alt=""
              className={contriCard.contriImage}
              src={featherPen}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContributeCard;
