import React, { useState, useEffect } from "react";
// import "../css/home.css";
import "../css/vars.module.css";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import SlideShow from "../components/SlideShow";
import Footer from "../components/Footer";
import POTD from "../components/POTD";
import ContributeCard from "../components/ContributeCard";
import Temp from "../css/temp.module.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// my modules
import { SERVER_ORIGIN, routes } from "../utilities/ClientVarsUtility.js";
import { generateAxiosConfigHeader } from "../utilities/ClientUtility.js";
import Toast, { toastOptions } from "../components/Toast.js";

const axios = require("axios").default;

/* home page uses temp.module.css not home.css */

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  async function requestServerToVerifyToken(token) {
    try {
      const response = await axios.get(
        SERVER_ORIGIN + routes.VERIFY_TOKEN,
        generateAxiosConfigHeader(token)
      ); // read about Bearer schema in jwt docs
      // console.log(response);
      setIsSignedIn(true);
    } catch (error) {
      // either token is invalid or session expired, isSignedIn remains same
      // console.log(error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top after render
    function verifySignInStatus() {
      const token = localStorage.getItem("token");
      if (!token) {
        // isSignedIn remains false
      } else {
        requestServerToVerifyToken(token);
      }
    }

    AOS.init({
      offset: 400,
      duration: 800,
    });

    verifySignInStatus();
  }, []);

  // only the home component provides this function to navbar
  function updateSignInStatus() {
    setIsSignedIn(false);
  }

  return (
    <div>
      <Navbar isSignedIn={isSignedIn} onSignOutClick={updateSignInStatus} />
      <div className={Temp.topDiv}>
        <p className={`${Temp.topText} ${Temp.commonText}`}>
          Confused with the resources around the web. Don't worry we got you
          covered.
        </p>
      </div>

      <div className="container-fluid">
        <div className={Temp.commonDiv}>
          <div className="row">
            <div className="col-lg-6">
              <div className={Temp.marginDiv}>
                <div
                  data-aos="flip-up"
                  className={`${Temp.cardDiv} ${Temp.leftDiv}`}
                >
                  <p className={`${Temp.cardText} ${Temp.commonText}`}>
                    Stay tuned, we've got a lot more coming up for you
                  </p>
                </div>
              </div>

              <div
                data-aos="flip-up"
                className={`${Temp.cardDiv} ${Temp.rightDiv}`}
              >
                <p className={`${Temp.cardText} ${Temp.commonText}`}>
                  Just Sign Up and make your first contribution
                </p>
                <div className={Temp.visitDiv}>
                  <Link
                    to={routes.SIGN_UP}
                    className={`${Temp.cardText} ${Temp.commonText} ${Temp.visitText}`}
                  >
                    Sign Up <FontAwesomeIcon icon={faArrowRight} />{" "}
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div
                data-aos="flip-up"
                className={`${Temp.cardDiv} ${Temp.leftDiv}`}
              >
                <p className={`${Temp.cardText} ${Temp.commonText}`}>
                  We are here as a medium cease up the communication gap
                </p>
              </div>

              <div
                data-aos="flip-up"
                className={`${Temp.cardDiv} ${Temp.rightDiv}`}
              >
                <p className={`${Temp.cardText} ${Temp.commonText}`}>
                  Our Interview Experience section might help you get insights
                  of real interviews
                </p>
                <div className={Temp.visitDiv}>
                  <Link
                    to={routes.INTERVIEW_EXPERIENCES}
                    className={`${Temp.cardText} ${Temp.commonText} ${Temp.visitText}`}
                  >
                    Visit <FontAwesomeIcon icon={faArrowRight} />{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast />
      <Footer />
    </div>
  );
}

export default Home;
