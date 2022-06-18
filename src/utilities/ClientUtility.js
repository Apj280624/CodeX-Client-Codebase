/*
 validate lengths of each fields
 todo: perform trims on strings
*/

import { vars } from "./ClientVarsUtility.js";

///////////////////////////////////////// VALID, INVALID OBJECTS /////////////////////////////////////////////////

function getValidObject() {
  return {
    res: true,
    desc: "All Valid",
  };
}

function getInValidObject(result, description) {
  return {
    res: result,
    desc: description,
  };
}

///////////////////////////////////////// FIRST, LAST, COMPANY, ROLE NAME //////////////////////////////////////////////////

function validateName(name, what, maxLen) {
  if (name.length > maxLen) {
    return getInValidObject(
      false,
      `Length of ${what} should not exceed ${maxLen}`
    );
  } else if (name.length === 0) {
    return getInValidObject(false, `${what} is not valid`);
  }

  return getValidObject();
}

///////////////////////////////////////// COLLEGE, BRANCH, GRAD, MONTH, YEAR, DIFF ///////////////////////////////////////////

function validateFromAvailable(name, what, available) {
  if (!available.includes(name)) {
    var desc = `${what} should match one of `;
    var n = available.length; // assuming n>=2
    for (var i = 0; i < n; i++) {
      if (i < n - 2) {
        desc += available[i] + ", ";
      } else if (i === n - 2) {
        desc += available[i] + " or ";
      } else {
        desc += available[i];
      }
    }
    return getInValidObject(false, desc);
  }

  return getValidObject();
}

///////////////////////////////////////////////// EMAIL ////////////////////////////////////////////////////

function validateEmailAddress(emailAddress) {
  if (emailAddress.length > vars.maxEmailAddressLen) {
    return getInValidObject(
      false,
      `Length of email address should not exceed ${vars.maxEmailAddressLen}`
    );
  } else if (emailAddress.length === 0 || !emailAddress.includes("@")) {
    return getInValidObject(false, "Email Address is not valid");
  }

  return getValidObject();
}

//////////////////////////////////////////////// PASSWORD //////////////////////////////////////////////////

function validatePassword(password) {
  if (password.length > vars.maxPassLen) {
    return getInValidObject(
      false,
      `Length of password should not exceed ${vars.maxPassLen}`
    );
  } else if (password.length < vars.minPassLen) {
    return getInValidObject(
      false,
      `Length of password should be atleast ${vars.minPassLen}`
    );
  }

  // make more checks for password like @,uppercase,lower,numbers

  return getValidObject();
}

///////////////////////////////////////////////// OTP //////////////////////////////////////////////////////

function validateOTP(OTP) {
  if (OTP.length !== 6) {
    return getInValidObject(false, "Length of the OTP should be 6");
  }

  // make other checks like otp is numeric or not

  return getValidObject();
}

////////////////////////////////////////// EXPERIENCE AND TIPS ////////////////////////////////////////////

function validateExpTip(text, what, maxLen) {
  if (text.length > maxLen) {
    return getInValidObject(
      false,
      `Length of ${what} should not exceed ${maxLen}`
    );
  } else if (text.length === 0) {
    return getInValidObject(false, `${what} should not be empty`);
  }

  // add valiators like number of words

  return getValidObject();
}

//////////////////////////////////////////// SIGNUP VALIDATION ///////////////////////////////////////////

function validateSignUpCredentials(constUserCredentials) {
  // the user credentials passed as an arguement are const and we cannot trim a const object so we use this way
  let userCredentials = trimObject(constUserCredentials);

  const firstNameObject = validateName(
    userCredentials.firstName,
    "First name",
    vars.maxNameLen
  );
  if (!firstNameObject.res) {
    return firstNameObject;
  }

  const lastNameObject = validateName(
    userCredentials.lastName,
    "Last name",
    vars.maxNameLen
  );
  if (!lastNameObject.res) {
    return lastNameObject;
  }

  const collegeNameObject = validateFromAvailable(
    userCredentials.collegeName,
    "College name",
    vars.availableCollegeNames
  );
  if (!collegeNameObject.res) {
    return collegeNameObject;
  }

  const branchNameObject = validateFromAvailable(
    userCredentials.branchName,
    "Branch name",
    vars.availableBranchNames
  );
  if (!branchNameObject.res) {
    return branchNameObject;
  }

  const graduationYearObject = validateFromAvailable(
    userCredentials.graduationYear,
    "Graduation year",
    vars.availableGraduationYears
  );
  if (!graduationYearObject.res) {
    return graduationYearObject;
  }

  const emailAddressObject = validateEmailAddress(userCredentials.emailAddress);
  if (!emailAddressObject.res) {
    return emailAddressObject;
  }

  const passwordObject = validatePassword(userCredentials.password);
  if (!passwordObject.res) {
    return passwordObject;
  }

  const OTPObject = validateOTP(userCredentials.OTP);
  if (!OTPObject.res) {
    return OTPObject;
  }

  // console.log("Sign Up Validated");
  return getValidObject();
}

//////////////////////////////////////////// SIGNIN VALIDATION ///////////////////////////////////////////

function validateSignInCredentials(constUserCredentials) {
  // the user credentials passed as an arguement are const and we cannot trim a const object so we use this way
  let userCredentials = trimObject(constUserCredentials);

  const emailAdressObject = validateEmailAddress(userCredentials.emailAddress);
  if (!emailAdressObject.res) {
    return emailAdressObject;
  }

  const passwordObject = validatePassword(userCredentials.password);
  if (!passwordObject.res) {
    return passwordObject;
  }

  // console.log("Sign In Validated");
  return getValidObject();
}

//////////////////////////////////////////// FORGOT PASSWORD VALIDATION ///////////////////////////////////////////

function validateForgotPasswordCredentials(constUserCredentials) {
  // the user credentials passed as an arguement are const and we cannot trim a const object so we use this way
  let userCredentials = trimObject(constUserCredentials);

  const emailAdressObject = validateEmailAddress(userCredentials.emailAddress);
  if (!emailAdressObject.res) {
    return emailAdressObject;
  }

  const passwordObject = validatePassword(userCredentials.password);
  if (!passwordObject.res) {
    return passwordObject;
  }

  const OTPObject = validateOTP(userCredentials.OTP);
  if (!OTPObject.res) {
    return OTPObject;
  }

  // console.log("Sign Up Validated");
  return getValidObject();
}

////////////////////////////////////////  CONTRIBUTION DETAILS VALIDATION //////////////////////////////////////

function validateInterviewExperience(constInterviewExperience) {
  // console.log(constInterviewExperience);
  // the user credentials passed as an arguement are const and we cannot trim a const object so we use this way
  let interviewExperience = trimObject(constInterviewExperience);

  // console.log(interviewExperience);

  const companyNameObject = validateName(
    interviewExperience.companyName,
    "Company name",
    vars.maxCompanyNameLen
  );
  if (!companyNameObject.res) {
    return companyNameObject;
  }

  const roleNameObject = validateName(
    interviewExperience.roleName,
    "Role name",
    vars.maxRoleNameLen
  );
  if (!roleNameObject.res) {
    return roleNameObject;
  }

  const monthNameObject = validateFromAvailable(
    interviewExperience.monthName,
    "Month name",
    vars.availableMonthNames
  );
  if (!monthNameObject.res) {
    return monthNameObject;
  }

  const yearObject = validateFromAvailable(
    interviewExperience.year,
    "Year",
    vars.availableInterviewExperienceYears
  );
  if (!yearObject.res) {
    return yearObject;
  }

  const difficultyObject = validateFromAvailable(
    interviewExperience.difficulty,
    "Difficulty",
    vars.availableDifficulties
  );
  if (!difficultyObject.res) {
    return difficultyObject;
  }

  const opportunityObject = validateName(
    interviewExperience.opportunity,
    "Opportunity",
    vars.maxOpportunityLen
  );
  if (!opportunityObject.res) {
    return opportunityObject;
  }

  const experienceObject = validateExpTip(
    interviewExperience.experience,
    "Interview experience",
    vars.maxExperienceLen
  );
  if (!experienceObject.res) {
    return experienceObject;
  }

  const tipObject = validateExpTip(
    interviewExperience.tip,
    "Tip",
    vars.maxTipLen
  );
  if (!tipObject.res) {
    return tipObject;
  }

  return getValidObject();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// TRIM OBJECTS /////////////////////////////////////////////

// trims ending whitespaces from each string field in the object
function trimObject(object) {
  for (const property in object) {
    // console.log(`${property}: ${object[property]}`);
    object[property] = object[property].trim();
  }

  return object;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

function getStars(n) {
  var result = "";
  for (var i = 0; i < n; i++) {
    result += "⭐";
  }

  return result;
}

function getGoodDate(isoDateString) {
  var date = new Date(isoDateString);

  const delimiter = " ";

  var result = (
    date.getDate() +
    delimiter +
    vars.availableMonthNames[date.getMonth()] +
    delimiter +
    date.getFullYear()
  ).toString(); //prints expected format.

  return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function generateAxiosConfigHeader(token) {
  const axiosConfig = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  return axiosConfig;
}

///////////////////////////////////////// DATA MANIPULATION /////////////////////////////////////////////////

function resizeField(value, startIdx, maxLen) {
  maxLen = Math.max(maxLen, 3); // to avoid any errors
  const dotString = "... ";

  if (!value) {
    return value;
  } else {
    const resizedValue =
      value.length > maxLen
        ? value.substring(startIdx, maxLen - 3) + dotString
        : value.substring(startIdx, maxLen);

    return resizedValue;
  }
}

function manipulateInteviewExperiencesRoute(dataArray) {
  // manipulate the data object itself because it has other fields also, here we have introduced a new field fullName

  const resultArray = dataArray.map((dataObject) => {
    dataObject.companyName = resizeField(dataObject.companyName, 0, 12);
    dataObject.roleName = resizeField(dataObject.roleName, 0, 28);
    dataObject.monthName = resizeField(dataObject.monthName, 0, 100); // 100 so there's no change in size
    dataObject.year = resizeField(dataObject.year, 0, 100);
    dataObject.opportunity = resizeField(dataObject.opportunity, 0, 30);
    dataObject.difficulty = resizeField(dataObject.difficulty, 0, 100);
    dataObject.fullName = resizeField(
      dataObject.firstName + " " + dataObject.lastName,
      0,
      15
    );
    dataObject.collegeName = resizeField(dataObject.collegeName, 0, 100);
    dataObject.branchName = resizeField(dataObject.branchName, 0, 100);
    dataObject.graduationYear = resizeField(dataObject.graduationYear, 2, 5);

    return dataObject;
  });

  return resultArray;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

export {
  validateSignUpCredentials,
  validateSignInCredentials,
  validateForgotPasswordCredentials,
  validateEmailAddress,
  validateInterviewExperience,
  getStars,
  getGoodDate,
  generateAxiosConfigHeader,
  manipulateInteviewExperiencesRoute,
  resizeField,
};
