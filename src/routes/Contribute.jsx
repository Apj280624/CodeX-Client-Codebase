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
import {
  validateInterviewExperience,
  generateAxiosConfigHeader,
} from "../utilities/ClientUtility.js";
import { SERVER_ORIGIN, routes } from "../utilities/ClientVarsUtility.js";
import Toast, { toastOptions } from "../components/Toast.js";

const axios = require("axios").default;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
no one can access this page without signing in, if not signed in he will be redirected to sign in page

if someone contributes the token will be posted in header along with interview experience
to know about how send body with headers: https://stackoverflow.com/questions/44617825/passing-headers-with-axios-post-request

if you dont put verifySignInStatus, navigate and requestServerToVerifyToken eslint will generate a warning near
  empty array which could be seen in detail on hovering
  has been talked about in: 
  https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Contribute() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top after render

    async function requestServerToVerifyToken(token) {
      try {
        const response = await axios.get(
          SERVER_ORIGIN + routes.VERIFY_TOKEN,
          generateAxiosConfigHeader(token)
        ); // read about Bearer schema in jwt docs
        // console.log(response);
        setIsLoading(false); // user can access contribute page
        setIsSignedIn(true);
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

    verifySignInStatus();
  }, [navigate]); // pass an empty array so that useEffect is called only on the first mount, else it will fall into an infinite loop

  const initialInterviewExperience = {
    companyName: "",
    roleName: "",
    monthName: "",
    year: "",
    difficulty: "",
    opportunity: "",
    experience: "",
    tip: "",
  };

  // you can also pass an empty object instead of initialInterviewExperience
  const [interviewExperience, setInterviewExperience] = useState(
    initialInterviewExperience
  );

  function updateInterviewExperience(updatedField) {
    setInterviewExperience((prevInterviewExperience) => ({
      ...prevInterviewExperience,
      ...updatedField,
    }));

    // console.log(interviewExperience);
  }

  async function requestServerToContribute() {
    // first validate at front end, don't bother the server unnecessarily
    const { res, desc } = validateInterviewExperience(interviewExperience);
    if (!res) {
      toast(desc, toastOptions);
    } else {
      try {
        // console.log(interviewExperience);
        const token = localStorage.getItem("token"); // pass token with contribution using generateAxiosConfig
        const response = await axios.post(
          SERVER_ORIGIN + routes.CONTRIBUTE,
          interviewExperience,
          generateAxiosConfigHeader(token)
        );
        // console.log(response);
        toast(response.data, toastOptions);
        // setInterviewExperience(initialInterviewExperience);
        // reset fields if contribution is successful so user cannot contribute the same thing
      } catch (error) {
        // console.log(error);
        toast(error.response.data, toastOptions);
        // dont refresh the page if error occurred, user can reuse it
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
      <div className={contri.commonDiv}>
        <div className="container-fluid">
          <p className={`${contri.headingText} ${contri.commonText}`}>
            We appreciate you here !
          </p>
          <p className={`${contri.alertText} ${contri.commonText}`}>
            Remember ! You must sign in to contribute
          </p>
        </div>
      </div>
      <div className={`${contri.detailsDiv} ${contri.commonDiv}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className={contri.inputDiv}>
                <CredentialInput
                  name="companyName"
                  placeholder="Company name *"
                  width="100%"
                  onChange={updateInterviewExperience}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className={contri.inputDiv}>
                <CredentialInput
                  name="roleName"
                  placeholder="Role ( e.g. SDE, SWE, MTS etc ) *"
                  width="100%"
                  onChange={updateInterviewExperience}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className={contri.inputDiv}>
                <CredentialInput
                  name="monthName"
                  placeholder="Month ( e.g. Jan ) *"
                  width="100%"
                  onChange={updateInterviewExperience}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className={contri.inputDiv}>
                <CredentialInput
                  name="year"
                  placeholder="Year ( e.g. 2022, 2023 etc ) *"
                  width="100%"
                  onChange={updateInterviewExperience}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className={contri.inputDiv}>
                <CredentialInput
                  name="difficulty"
                  placeholder="Difficulty level ( 1 - 5 ) *"
                  width="100%"
                  onChange={updateInterviewExperience}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className={contri.inputDiv}>
                <CredentialInput
                  name="opportunity"
                  placeholder="Opportunity / Program ( e.g. Off campus, Martians etc ) *"
                  width="100%"
                  onChange={updateInterviewExperience}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={contri.commonDiv}>
        <div className="container-fluid">
          <p className={`${contri.noteText}`}>
            Tip: Please do considering using multiple paragraphs for a cleaner
            representation
          </p>
        </div>
      </div>

      <div className={`${contri.contentDiv} ${contri.commonDiv}`}>
        <div className="container-fluid">
          <TextArea
            name="experience"
            rows="8"
            placeholder="Interview Experience"
            onChange={updateInterviewExperience}
          />
          <TextArea
            name="tip"
            rows="4"
            placeholder="Concluding Tips"
            onChange={updateInterviewExperience}
          />
        </div>
        <div className={contri.contriButtonDiv}>
          <div className="container-fluid">
            <CredentialButton
              text="Contribute Experience"
              width="100%"
              height="50px"
              onClick={requestServerToContribute}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar isSignedIn={isSignedIn} />
      {isLoading ? loader : element}
      <Footer />
      <Toast />
    </div>
  );
}

export default Contribute;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function Contribute() {
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   async function requestServerToVerifyToken(token) {
//     try {
//       const response = await axios.get(
//         SERVER_ORIGIN + routes.VERIFY_TOKEN,
//         generateAxiosConfigHeader(token)
//       ); // read about Bearer schema in jwt docs
//       // console.log(response);
//       setIsLoading(false); // user can access contribute page
//     } catch (error) {
//       // either token is invalid or session expired
//       // console.log(error);
//       navigate(routes.SIGN_IN); // redirect to sign in page
//     }
//   }

//   function verifySignInStatus() {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate(routes.SIGN_IN); // redirect to sign in page
//     } else {
//       requestServerToVerifyToken(token);
//     }
//   }

//   useEffect(() => {
//     // verifySignInStatus();
//   }, []); // pass an empty array so that useEffect is called only on the first mount, else it will fall into an infinite loop

//   function showContributionForm() {
//     setIsLoading(false);
//   }

//   const initialInterviewExperience = {
//     companyName: "",
//     roleName: "",
//     monthName: "",
//     year: "",
//     difficulty: "",
//     opportunity: "",
//     experience: "",
//     tip: "",
//   };
//   const [interviewExperience, setInterviewExperience] = useState(
//     initialInterviewExperience
//   );

//   function updateInterviewExperience(updatedField) {
//     setInterviewExperience((prevInterviewExperience) => ({
//       ...prevInterviewExperience,
//       ...updatedField,
//     }));

//     // console.log(interviewExperience);
//   }

//   async function requestServerToContribute() {
//     // first validate at front end, don't bother the server unnecessarily
//     const { res, desc } = validateInterviewExperience(interviewExperience);
//     if (!res) {
//       toast(desc, toastOptions);
//     } else {
//       try {
//         // console.log(interviewExperience);
//         const token = localStorage.getItem("token"); // pass token with contribution using generateAxiosConfig
//         const response = await axios.post(
//           SERVER_ORIGIN + routes.CONTRIBUTE,
//           interviewExperience,
//           generateAxiosConfigHeader(token)
//         );
//         // console.log(response);
//         toast(response.data, toastOptions);
//         // setInterviewExperience(initialInterviewExperience);
//         // reset fields if contribution is successful so user cannot contribute the same thing
//       } catch (error) {
//         // console.log(error);
//         toast(error.response.data, toastOptions);
//         // dont refresh the page if error occurred, he can reuse it
//       }
//     }
//   }

//   const loader = (
//     <div className={contri.loaderDiv}>
//       <Loader />;
//     </div>
//   );

//   const element = (
//     <div>
//       <Navbar />
//       <div className={contri.commonDiv}>
//         <div className="container-fluid">
//           <p className={`${contri.headingText} ${contri.commonText}`}>
//             We appreciate you here !
//           </p>
//           <p className={`${contri.alertText} ${contri.commonText}`}>
//             Remember ! You must sign in to contribute
//           </p>
//         </div>
//       </div>
//       <div className={`${contri.detailsDiv} ${contri.commonDiv}`}>
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-lg-6">
//               <div className={contri.inputDiv}>
//                 <CredentialInput
//                   name="companyName"
//                   placeholder="Company name *"
//                   width="100%"
//                   onChange={updateInterviewExperience}
//                 />
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className={contri.inputDiv}>
//                 <CredentialInput
//                   name="roleName"
//                   placeholder="Role ( e.g. SDE, SWE, MTS etc ) *"
//                   width="100%"
//                   onChange={updateInterviewExperience}
//                 />
//               </div>
//             </div>

//             <div className="col-lg-6">
//               <div className={contri.inputDiv}>
//                 <CredentialInput
//                   name="monthName"
//                   placeholder="Month ( e.g. Jan ) *"
//                   width="100%"
//                   onChange={updateInterviewExperience}
//                 />
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className={contri.inputDiv}>
//                 <CredentialInput
//                   name="year"
//                   placeholder="Year ( e.g. 2022, 2023 etc ) *"
//                   width="100%"
//                   onChange={updateInterviewExperience}
//                 />
//               </div>
//             </div>

//             <div className="col-lg-6">
//               <div className={contri.inputDiv}>
//                 <CredentialInput
//                   name="difficulty"
//                   placeholder="Difficulty level ( 1 - 5 ) *"
//                   width="100%"
//                   onChange={updateInterviewExperience}
//                 />
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className={contri.inputDiv}>
//                 <CredentialInput
//                   name="opportunity"
//                   placeholder="Opportunity / Program ( e.g. Off campus, Martians etc ) *"
//                   width="100%"
//                   onChange={updateInterviewExperience}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className={contri.commonDiv}>
//         <div className="container-fluid">
//           <p className={`${contri.noteText}`}>
//             Tip: Please do considering using multiple paragraphs for a cleaner
//             representation
//           </p>
//         </div>
//       </div>

//       <div className={`${contri.contentDiv} ${contri.commonDiv}`}>
//         <div className="container-fluid">
//           <TextArea
//             name="experience"
//             rows="8"
//             placeholder="Interview Experience"
//             onChange={updateInterviewExperience}
//           />
//           <TextArea
//             name="tip"
//             rows="4"
//             placeholder="Concluding Tips"
//             onChange={updateInterviewExperience}
//           />
//         </div>
//         <div className={contri.contriButtonDiv}>
//           <div className="container-fluid">
//             <CredentialButton
//               text="Contribute Experience"
//               width="100%"
//               height="50px"
//               onClick={requestServerToContribute}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div>
//       <Navbar showContributionForm={showContributionForm} />
//       {isLoading ? loader : element}
//       <Footer />
//       <Toast />
//     </div>
//   );
// }

// export default Contribute;
