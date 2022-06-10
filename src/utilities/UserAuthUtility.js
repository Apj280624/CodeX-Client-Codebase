/*
 validate lengths of each fields
 todo: perform trims on strings
*/

import { vars } from "./ClientVarsUtility.js";

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

function validateOTP(OTP) {
  if (OTP.length !== 6) {
    return getInValidObject(false, "Length of the OTP should be 6");
  }

  // make other checks like otp is numeric or not

  return getValidObject();
}

//////////////////////////////////////////// signup validation ///////////////////////////////////////////

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

  const collegeNameObject = validateName(
    userCredentials.collegeName,
    "College name",
    vars.maxCollegeNameLen
  );
  if (!collegeNameObject.res) {
    return collegeNameObject;
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

//////////////////////////////////////////// signin validation ///////////////////////////////////////////

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

//////////////////////////////////////////// forgot password validation ///////////////////////////////////////////

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

export {
  validateSignUpCredentials,
  validateSignInCredentials,
  validateForgotPasswordCredentials,
  validateEmailAddress,
};
