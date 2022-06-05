import React from "react";
import "../css/potd.css";
import lightBulb from "../assets/images/light-bulb.png";

function POTD() {
  return (
    <div>
      <section class="problem-section">
        <div class="problem-header">
          <h1 class="problem-heading">PROBLEM OF THE DAY</h1>
          <p class="problem-goal">
            Problem of the day is a way to bring consistency to your
            problem-solving journey
          </p>
        </div>
        <div class="row">
          <div class="problem-col1 col-lg-5">
            {/* Search bulb brain on flaticon to get this bulb image */}
            <img class="problem-image" src={lightBulb} alt="" />
          </div>
          <div class="problem-col2 col-lg-7">
            <div class="problem-col2-div">
              <div class="problem-name-div">
                <h3 class="problem-name">
                  Index of the second largest element
                </h3>
              </div>
              <button type="button" class="solve-button btn btn-lg">
                Solve Problem
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default POTD;
