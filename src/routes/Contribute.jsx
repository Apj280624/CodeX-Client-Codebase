import React, { useState, useEffect } from "react";
import contri from "../css/contribute.module.css";
import CredentialInput from "../components/CredentialInput.jsx";
import CredentialButton from "../components/CredentialButton.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import TextArea from "../components/TextArea.jsx";
import Loader from "../components/Loader.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

// my modules
import { validateContributionDetails } from "../utilities/ValidationUtility.js";
import { SERVER_ORIGIN, routes } from "../utilities/ClientVarsUtility.js";
import Toast, { toastOptions } from "../components/Toast.js";

const axios = require("axios").default;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
no one can access this page without signing in, if not signed in he will be redirected to sign in page

if someone contributes the token will be posted in header along with contribution
to know about how send body with headers: https://stackoverflow.com/questions/44617825/passing-headers-with-axios-post-request

if you dont put verifySignInStatus, navigate and requestServerToVerifyToken eslint will generate a warning near
  empty array which could be seen in detail on hovering
  has been talked about in: 
  https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
*/

function Contribute() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  function generateAxiosConfig(token) {
    const axiosConfig = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return axiosConfig;
  }

  async function requestServerToVerifyToken(token) {
    try {
      const response = await axios.get(SERVER_ORIGIN + routes.VERIFY_TOKEN, {
        headers: {
          Authorization: "Bearer " + token,
        },
      }); // read about Bearer schema in jwt docs
      console.log(response);
      setIsLoading(false); // user can access contribute page
    } catch (error) {
      // either token is invalid or session expired
      // console.log(error);
      navigate(routes.SIGN_IN); // redirect to sign in page
    }
  }

  function verifySignInStatus() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(routes.SIGN_IN); // redirect to sign in page
    } else {
      requestServerToVerifyToken(token);
    }
  }

  useEffect(() => {
    verifySignInStatus();
  }, []); // pass an empty array so that useEffect is called only on the first mount, else it will fall into an infinite loop

  const [contributionDetails, setContributionDetails] = useState({
    companyName: "",
    roleName: "",
    monthName: "",
    year: "",
    difficulty: "",
    opportunity: "",
    experience: "",
    tip: "",
  });

  function updateContributionDetails(updatedField) {
    setContributionDetails((prevContributionDetails) => ({
      ...prevContributionDetails,
      ...updatedField,
    }));

    // console.log(contributionDetails);
  }

  async function requestServerToContribute() {
    // first validate at front end, don't bother the server unnecessarily
    const { res, desc } = validateContributionDetails(contributionDetails);
    if (!res) {
      toast(desc, toastOptions);
    } else {
      try {
        // console.log(contributionDetails);
        const token = localStorage.getItem("token"); // pass token with contribution using generateAxiosConfig
        const response = await axios.post(
          SERVER_ORIGIN + routes.CONTRIBUTE,
          contributionDetails,
          generateAxiosConfig(token)
        );
        // console.log(response);
        toast(response.data, toastOptions);
        // refresh the page or reset the fields so that the user doesn't end up contributing the same thing
      } catch (error) {
        // console.error(error);
        toast(error.response.data, toastOptions);
        // dont refresh the page if error occurred, he can reuse it
      }
    }
  }

  const loader = (
    <div className={contri.loaderDiv}>
      <Loader />;
    </div>
  );

  const element = (
    <div>
      <Navbar />
      <div className={contri.commonDiv}>
        <p className={`${contri.headingText} ${contri.commonText}`}>
          We appreciate you here !
        </p>
        <p className={`${contri.alertText} ${contri.commonText}`}>
          Remember ! You must sign in to contribute
        </p>
      </div>
      <div className={`${contri.detailsDiv} ${contri.commonDiv}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className={contri.inputDiv}>
                <CredentialInput
                  name="companyName"
                  placeholder="Company name *"
                  width="100%"
                  onChange={updateContributionDetails}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className={contri.inputDiv}>
                <CredentialInput
                  name="roleName"
                  placeholder="Role ( e.g. SDE, SWE, MTS etc ) *"
                  width="100%"
                  onChange={updateContributionDetails}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className={contri.inputDiv}>
                <CredentialInput
                  name="monthName"
                  placeholder="Month ( e.g. Jan ) *"
                  width="100%"
                  onChange={updateContributionDetails}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className={contri.inputDiv}>
                <CredentialInput
                  name="year"
                  placeholder="Year ( e.g. 2022, 2023 etc ) *"
                  width="100%"
                  onChange={updateContributionDetails}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className={contri.inputDiv}>
                <CredentialInput
                  name="difficulty"
                  placeholder="Difficulty level ( 1 - 5 ) *"
                  width="100%"
                  onChange={updateContributionDetails}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className={contri.inputDiv}>
                <CredentialInput
                  name="opportunity"
                  placeholder="Opportunity / Program ( e.g. Off campus, Martians etc ) *"
                  width="100%"
                  onChange={updateContributionDetails}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={contri.commonDiv}>
        <div className="container">
          <p className={`${contri.noteText}`}>
            Tip: Please do considering using multiple paragraphs for a cleaner
            representation
          </p>
        </div>
      </div>

      <div className={`${contri.contentDiv} ${contri.commonDiv}`}>
        <div className="container">
          <TextArea
            name="experience"
            rows="8"
            placeholder="Interview Experience"
            onChange={updateContributionDetails}
          />
          <TextArea
            name="tip"
            rows="4"
            placeholder="Concluding Tips"
            onChange={updateContributionDetails}
          />
        </div>
        <div className={contri.contriButtonDiv}>
          <div className="container">
            <CredentialButton
              text="Contribute Experience"
              width="100%"
              height="100px"
              onClick={requestServerToContribute}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      {isLoading ? loader : element}
      <Footer />
      <Toast />
    </div>
  );
}

export default Contribute;
