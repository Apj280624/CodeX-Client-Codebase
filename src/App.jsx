import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import CP from "./routes/CP";
import DSA from "./routes/DSA";
import InterviewExperiences from "./routes/InterviewExperiences";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import ForgotPassword from "./routes/ForgotPassword";
import Contribute from "./routes/Contribute";
import ReadExperience from "./routes/ReadExperience";
import Account from "./routes/Account";
import EditExperience from "./routes/EditExperience";

// my modules
import { routes } from "./utilities/ClientVarsUtility.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cp" element={<CP />} />
        <Route path="/dsa" element={<DSA />} />

        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />

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
        <Route path="/contribute" element={<Contribute />} />

        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
