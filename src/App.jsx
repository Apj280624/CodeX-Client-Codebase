import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import InterviewExperiences from "./routes/InterviewExperiences";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import ForgotPassword from "./routes/ForgotPassword";
import Contribute from "./routes/Contribute";
import ReadExperience from "./routes/ReadExperience";
import Account from "./routes/Account";
import EditExperience from "./routes/EditExperience";

// my modules
import { routes, vars } from "./utilities/ClientVarsUtility.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path={routes.HOME} element={<Home />} />

        {/* <Route path="/auth/sign-in" element={<SignIn />} /> */}
        <Route path={routes.SIGN_IN} element={<SignIn />} />

        {/* <Route path="/auth/sign-up" element={<SignUp />} /> */}
        <Route path={routes.SIGN_UP} element={<SignUp />} />

        {/* <Route path="/auth/forgot-password" element={<ForgotPassword />} /> */}
        <Route path={routes.FORGOT_PASSWORD} element={<ForgotPassword />} />

        <Route
          path={routes.INTERVIEW_EXPERIENCES}
          element={<InterviewExperiences />}
        />
        <Route
          path={`${routes.INTERVIEW_EXPERIENCE_READ}/:id`}
          element={<ReadExperience />}
        />
        <Route
          path={`${routes.INTERVIEW_EXPERIENCE_EDIT}/:id`}
          element={<EditExperience />}
        />

        {/* <Route path="/contribute" element={<Contribute />} /> */}
        <Route path={routes.CONTRIBUTE} element={<Contribute />} />

        {/* <Route path="/account" element={<Account />} /> */}
        <Route path={routes.ACCOUNT} element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
