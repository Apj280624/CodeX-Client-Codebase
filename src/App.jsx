import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import CP from "./routes/CP";
import DSA from "./routes/DSA";
import InterviewExperiences from "./routes/InterviewExperiences";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import ForgotPassword from "./routes/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cp" element={<CP />} />
        <Route path="/dsa" element={<DSA />} />
        <Route
          path="/interview-experiences"
          element={<InterviewExperiences />}
        />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
