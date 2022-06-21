const SERVER_ORIGIN = "http://localhost:4000";

// vars

const vars = {
  darkPurple: "#131022",
  lightPurple: "#7026b9",
  maxNameLen: 40,
  minPassLen: 6, // 6 for production
  maxPassLen: 16,
  maxOTPLen: 6,
  maxCollegeNameLen: 60,
  maxEmailAddressLen: 400,
  maxCompanyNameLen: 60,
  maxRoleNameLen: 50,
  maxOpportunityLen: 60,
  maxExperienceLen: 10000,
  maxTipLen: 2000,
  availableCollegeNames: ["LNCT", "LNCTS", "LNCTE"],
  availableBranchNames: ["CS", "IT", "EC"],
  availableGraduationYears: ["2019", "2020", "2021", "2022", "2023"],
  availableMonthNames: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  availableInterviewExperienceYears: ["2020", "2021", "2022"],
  availableDifficulties: ["1", "2", "3", "4", "5"],
  brandName: "CodeX",
};

// routes

const routes = {
  HOME: "/",
  SIGN_UP: "/auth/sign-up",
  SIGN_IN: "/auth/sign-in",
  FORGOT_PASSWORD: "/auth/forgot-password",

  CONTRIBUTE: "/contribute",
  VOTP: "/auth/votp",
  FOTP: "/auth/fotp",
  VERIFY_TOKEN: "/verify-token",
  CONTRIBUTIONS: "/contributions",

  INTERVIEW_EXPERIENCES: "/interview-experiences",
  INTERVIEW_EXPERIENCE_READ: "/interview-experience/read",
  INTERVIEW_EXPERIENCE_EDIT: "/interview-experience/edit",
  INTERVIEW_EXPERIENCE_DELETE: "/interview-experience/delete",

  ACCOUNT: "/account",
  PARTICULAR_INTERVIEW_EXPERIENCE: "/particular-interview-experience",
};

export { SERVER_ORIGIN, routes, vars };
