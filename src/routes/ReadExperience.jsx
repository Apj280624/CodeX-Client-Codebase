import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Read from "../css/read-experience.module.css";
import TextArea from "../components/TextArea.jsx";
import Loader from "../components/Loader.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

// my modules
import { SERVER_ORIGIN, routes, vars } from "../utilities/ClientVarsUtility.js";
import {
  generateAxiosConfigHeader,
  getStars,
  getGoodDate,
  resizeField,
} from "../utilities/ClientUtility.js";
import Toast, { toastOptions } from "../components/Toast.js";

const axios = require("axios").default;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ReadExperience() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [interviewExperience, setInterviewExperience] = useState({});

  const { id } = useParams(); // curly brackets are imp
  // console.log(id);
  // console.log(`${SERVER_ORIGIN}${routes.READ}/${id}`);

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

    async function requestServerToGetInterviewExperience() {
      try {
        const response = await axios.get(
          `${SERVER_ORIGIN}${routes.PARTICULAR_INTERVIEW_EXPERIENCE}/${id}`
        );
        setIsLoading(false);
        // console.log(response.data.interviewExperience); // set loading to false
        const data = await response.data.interviewExperience;

        setInterviewExperience({
          companyName: resizeField(data.companyName, 0, 30),
          roleName: resizeField(data.roleName, 0, 50),
          monthName: data.monthName,
          year: data.year,
          difficulty: getStars(data.difficulty),
          opportunity: resizeField(data.opportunity, 0, 50),
          creationTimeStamp: getGoodDate(data.creationTimeStamp),
          firstName: resizeField(data.firstName, 0, 40),
          lastName: resizeField(data.lastName, 0, 40),
          collegeName: resizeField(data.collegeName, 0, 40),
          branchName: resizeField(data.branchName, 0, 40),
          graduationYear: data.graduationYear,
          experience: data.experience,
          tip: data.tip,
        });
      } catch (error) {
        console.log(error);
        toast(error.response.data, toastOptions);
      }
    }

    verifySignInStatus();
    requestServerToGetInterviewExperience();
  }, [id]);

  const loader = (
    <div className={Read.loaderDiv}>
      <Loader />;
    </div>
  );

  const element = (
    <div className={Read.allDiv}>
      <div className="container-fluid">
        <div className={Read.outlineDiv}>
          <p className={`${Read.companyText} ${Read.commonText}`}>
            {interviewExperience.companyName}
          </p>
          <p className={`${Read.roleText} ${Read.commonText}`}>
            {interviewExperience.roleName}, {interviewExperience.monthName}{" "}
            {interviewExperience.year}
          </p>
          <p className={`${Read.roleText} ${Read.commonText}`}>
            Opportunity: {interviewExperience.opportunity}
          </p>
          <p className={`${Read.roleText} ${Read.commonText}`}>
            Difficulty level: {interviewExperience.difficulty}
          </p>
          <p className={`${Read.roleText} ${Read.commonText}`}>
            Contributed on: {interviewExperience.creationTimeStamp}
          </p>

          <p className={`${Read.nameText} ${Read.commonText}`}>
            {interviewExperience.firstName} {interviewExperience.lastName},{" "}
            {interviewExperience.collegeName} {interviewExperience.branchName}'{" "}
            {interviewExperience.graduationYear}
          </p>
        </div>
        <pre className={`${Read.contentText} ${Read.commonText}`}>
          <span className={Read.specialText}>Interview Experience: </span>
          {interviewExperience.experience}
        </pre>
        <pre className={`${Read.contentText} ${Read.commonText}`}>
          <span className={Read.specialText}>Concluding Tips: </span>
          {interviewExperience.tip}
        </pre>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar isSignedIn={isSignedIn} />
      {isLoading ? loader : element}
      <Toast />
      <Footer />
    </div>
  );
}

export default ReadExperience;

// const temp = await response.data.interviewExperience;
// setInterviewExperience({
//   companyName: temp.companyName,
//   roleName: temp.roleName,
//   monthName: temp.monthName,
//   year: temp.year,
//   difficulty: getStars(temp.difficulty),
//   timeStamp: getGoodDate(temp.timeStamp),
//   firstName: temp.firstName,
//   lastName: temp.lastName,
//   collegeName: temp.collegeName,
//   branchName: temp.branchName,
//   graduationYear: temp.graduationYear,
//   experience: temp.experience,
//   tip: temp.tip,
// });

/* <div className={Read.allDiv}>
      <div className="container">
        <div className={Read.outlineDiv}>
          <p className={`${Read.companyText} ${Read.commonText}`}>Google</p>
          <p className={`${Read.roleText} ${Read.commonText}`}>SWE, Jan 2022</p>
          <p className={`${Read.roleText} ${Read.commonText}`}>
            Difficulty level: ⭐⭐⭐⭐⭐
          </p>

          <p className={`${Read.nameText} ${Read.commonText}`}>
            Apoorv Jain, LNCT CS' 23
          </p>
        </div>
        <p className={`${Read.contentText} ${Read.commonText}`}>
          <span className={Read.specialText}>Interview Experience: </span>
          Technical Interview Round 1: The interviewer did not introduce himself
          and directly asked me for my introduction (it took around 2-3 mins).
          Then he asked me a DSA problem (he put a problem statement and one
          test case on the meeting chat window) –
          https://www.geeksforgeeks.org/given-sorted-dictionary-find-precedence-characters/
          I asked a couple of questions about the given test case to understand
          the problem properly and he explained everything to me. After 10 – 15
          min of discussion, I explained to him a topological sorting approach
          and he was satisfied with it and asked me to write code for it. He
          asked me to open Ideone (online IDE) and I wrote the code for my
          approach there, I explained my code to him and he made me dry run the
          test case (It’s already been 45 mins after explaining everything). The
          questions he asked me about processes and threads. What are
          multiprocessing and multithreading? In which architecture debugging
          would be easy, multiprocessing or multithreading? (With proper
          reason). (This took 3 – 4 minutes) In the end, he asked if I had any
          questions, and I asked about the individual responsibilities of the
          MTS position and what I would be working on if I get selected.
          Technical Interview Round 2: This round took around 50 minutes First
          the interviewer started introducing herself and then asked me for my
          introduction followed by questions – What is compile time and run time
          polymorphism? She asked me for real-world examples and I was expected
          to explain them with code. I was given a choice to open any IDE (I
          chose VS Code). Then she asked basic questions on architecture like
          what is a bit? What is a byte? She kept asking details about this
          topic like (How do we represent this and how computers do understand 0
          or 1 bit, how they are useful, and how information is stored in bits
          and I explained as much as I could ) A very detailed discussion about
          array data type in C++ language followed by a question where I had to
          tell how much memory was occupied by the array (if the array contains
          5 integers and 4 characters) She kept asking a few more basic concepts
          like what is a binary system? She asked me to write a binary
          representation of 31 and asked me the procedure to obtain the result.
          Then I was given a code snippet and I had to predict the output (she
          put it on the chat window and I pasted it on my vs code)
        </p>
        <p className={`${Read.contentText} ${Read.commonText}`}>
          <span className={Read.specialText}>Concluding Tips: </span> The
          interviewer did not introduce himself and directly asked me for my
          introduction (it took around 2-3 mins). Then he asked me a DSA problem
          (he put a problem statement and one test case on the meeting chat
          window) –
          https://www.geeksforgeeks.org/given-sorted-dictionary-find-precedence-characters/
          I asked a couple of questions about the given test case to understand
          the problem properly and he explained everything to me. After 10 – 15
          min of discussion, I explained to him a topological sorting approach
          and he was satisfied with it and asked me to write code for it. He
          asked me to open Ideone (online IDE) and I wrote the code for my
          approach there, I explained my code to him and he made me dry run the
          test case (It’s already been 45 mins after explaining everything). The
          questions he asked me about processes and threads. What are
          multiprocessing and multithreading? In which architecture debugging
          would be easy, multiprocessing or multithreading? (With proper
          reason). (This took 3 – 4 minutes) In the end, he asked if I had any
          questions, and I asked about the individual responsibilities of the
          MTS position and what I would be working on if I get selected.
          Technical Interview Round 2: This round took around 50 minutes First
          the interviewer started introducing herself and then asked me for my
          introduction followed by questions – What is compile time and run time
          polymorphism? She asked me for real-world examples and I was expected
          to explain them with code. I was given a choice to open any IDE (I
          chose VS Code). Then she asked basic questions on architecture like
          what is a bit? What is a byte? She kept asking details about this
          topic like (How do we represent this and how computers do understand 0
          or 1 bit, how they are useful, and how information is stored in bits
          and I explained as much as I could ) A very detailed discussion about
          array data type in C++ language followed by a question where I had to
          tell how much memory was occupied by the array (if the array contains
          5 integers and 4 characters) She kept asking a few more basic concepts
          like what is a binary system? She asked me to write a binary
          representation of 31 and asked me the procedure to obtain the result.
          Then I was given a code snippet and I had to predict the output (she
          put it on the chat window and I pasted it on my vs code)
        </p>
      </div>
    </div> */
