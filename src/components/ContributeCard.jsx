import React from "react";
import contriCard from "../css/contribute-card.module.css";
import featherPen from "../assets/images/feather-pen.png";
import { Link } from "react-router-dom";

// my modules
import { routes } from "../utilities/ClientVarsUtility.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ContributeCard() {
  return (
    <div className="">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 col-md-8">
            <p
              className={`${contriCard.titleText} "sefkjn" ${contriCard.commonText}`}
            >
              Faced a Technical interview ?
            </p>
            <p
              className={`${contriCard.subTitleText} ${contriCard.commonText}`}
            >
              Why don't you share your experience with others. Click on the
              Feather to contribute your experience. Please Sign in to
              contribute.
            </p>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="">
              <Link to={routes.CONTRIBUTE}>
                <img
                  alt="contribute-img"
                  className={contriCard.contriImage}
                  src={featherPen}
                ></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContributeCard;
