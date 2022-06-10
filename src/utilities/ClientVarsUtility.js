const SERVER_ORIGIN = "http://localhost:4000";

// vars

const vars = {
  maxNameLen: 40,
  minPassLen: 2, // 6 for production
  maxPassLen: 16,
  maxCollegeNameLen: 60,
  maxEmailAddressLen: 400,
};

// routes

const routes = {
  SIGN_UP: "/auth/sign-up",
  SIGN_IN: "/auth/sign-in",
  FORGOT_PASSWORD: "/auth/forgot-password",
  INTERVIEW_EXPERIENCES: "/interview-experiences",
  VOTP: "/auth/votp",
  FOTP: "/auth/fotp",
};

export { SERVER_ORIGIN, routes, vars };
