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
  if (!name || name.length === 0) {
    return getInValidObject(false, `${what} is not valid`);
  } else if (name.length > maxLen) {
    return getInValidObject(
      false,
      `Length of ${what} should not exceed ${maxLen}`
    );
  }

  return getValidObject();
}

///////////////////////////////////////// COLLEGE, BRANCH, GRAD, MONTH, YEAR, DIFF ///////////////////////////////////////////

function validateFromAvailable(name, what, available) {
  if (!name || !available.includes(name)) {
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
  if (
    !emailAddress ||
    emailAddress.length === 0 ||
    !emailAddress.includes("@")
  ) {
    return getInValidObject(false, "Email Address is not valid");
  } else if (emailAddress.length > vars.maxEmailAddressLen) {
    return getInValidObject(
      false,
      `Length of email address should not exceed ${vars.maxEmailAddressLen}`
    );
  }

  return getValidObject();
}

//////////////////////////////////////////////// PASSWORD //////////////////////////////////////////////////

function validatePassword(password) {
  if (!password || password.length < vars.minPassLen) {
    return getInValidObject(
      false,
      `Length of password should be atleast ${vars.minPassLen}`
    );
  } else if (password.length > vars.maxPassLen) {
    return getInValidObject(
      false,
      `Length of password should not exceed ${vars.maxPassLen}`
    );
  }

  // make more checks for password like @,uppercase,lower,numbers

  return getValidObject();
}

///////////////////////////////////////////////// OTP //////////////////////////////////////////////////////

function validateOTP(OTP) {
  if (!OTP || OTP.length !== 6) {
    return getInValidObject(false, "Length of the OTP should be 6");
  }

  // make other checks like otp is numeric or not

  return getValidObject();
}

////////////////////////////////////////// EXPERIENCE AND TIPS ////////////////////////////////////////////

function validateExpTip(text, what, maxLen) {
  if (!text || text.length === 0) {
    return getInValidObject(false, `${what} should not be empty`);
  } else if (text.length > maxLen) {
    return getInValidObject(
      false,
      `Length of ${what} should not exceed ${maxLen}`
    );
  }

  // add valiators like number of words

  return getValidObject();
}

//////////////////////////////////////////// SIGNUP VALIDATION ///////////////////////////////////////////

function validateSignUpCredentials(userCredentials) {
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

function validateSignInCredentials(userCredentials) {
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

function validateForgotPasswordCredentials(userCredentials) {
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

function validateInterviewExperience(interviewExperience) {
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

function trimField(str) {
  return str ? str.trim() : str;
}

// below two functions are to be used only for first, last and company name, not for text

function keepSingleSpace(str) {
  return str.replace(/\s\s+/g, " "); // only one white space between any two words
}

function transformToTitleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  // console.log(splitStr);
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }

  var result = splitStr.join(" ");
  result = keepSingleSpace(result); // only one white space between any two words

  return result;
}

// this function doesnot convert remaining to lower case, for role name, reduces space
function capitalizeFirstLetterOfEachWord(str) {
  var splitStr = str.split(" ");
  // console.log(splitStr);
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }

  var result = splitStr.join(" ");
  result = keepSingleSpace(result); // only one white space between any two words

  return result;
}

// for opportunity, reduces space
function capitalizeFirstLetterOfString(str) {
  var splitStr = str.split(" ");

  if (splitStr && splitStr[0]) {
    splitStr[0] =
      splitStr[0].charAt(0).toUpperCase() + splitStr[0].substring(1);
  }

  var result = splitStr.join(" ");
  result = keepSingleSpace(result); // only one white space between any two words

  return result;
}

function capitalizeAllLetters(str) {
  return str ? str.toUpperCase() : str;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

function transformInterviewExperienceObject(obj) {
  obj = trimObject(obj);
  obj.companyName = transformToTitleCase(obj.companyName);
  obj.roleName = capitalizeFirstLetterOfEachWord(obj.roleName);
  obj.monthName = transformToTitleCase(obj.monthName);
  obj.opportunity = capitalizeFirstLetterOfString(obj.opportunity);

  return obj;
}

function transformSignUpObject(obj) {
  obj = trimObject(obj);
  obj.firstName = transformToTitleCase(obj.firstName);
  obj.lastName = transformToTitleCase(obj.lastName);
  obj.collegeName = capitalizeAllLetters(obj.collegeName);
  obj.branchName = capitalizeAllLetters(obj.branchName);

  return obj;
}

function transformSignInObject(obj) {
  obj = trimObject(obj);

  return obj;
}

function transformForgotPasswordObject(obj) {
  obj = trimObject(obj);

  return obj;
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
  transformToTitleCase,
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfString,
  trimObject,
  trimField,
  transformInterviewExperienceObject,
  transformSignUpObject,
  transformSignInObject,
  transformForgotPasswordObject,
};
