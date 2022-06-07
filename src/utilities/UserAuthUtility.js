/*
 validate lengths of each fields
*/

const maxLen = 40;
const minPassLen = 2; // 6 for production
const maxPassLen = 16;

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

function validateName(name) {
  if (name.length > maxLen) {
    return getInValidObject(
      false,
      `Length of name should not exceed ${maxLen}`
    );
  } else if (name.length === 0) {
    return getInValidObject(false, "Name is not valid");
  }

  return getValidObject();
}

function validateEmailAddress(emailAddress) {
  if (emailAddress.length > maxLen) {
    return getInValidObject(
      false,
      `Length of email address should not exceed ${maxLen}`
    );
  } else if (emailAddress.length === 0 || !emailAddress.includes("@")) {
    return getInValidObject(false, "Email Address is not valid");
  }

  return getValidObject();
}

function validatePassword(password) {
  if (password.length > maxPassLen) {
    return getInValidObject(
      false,
      `Length of password should not exceed ${maxPassLen}`
    );
  } else if (password.length < minPassLen) {
    return getInValidObject(false, "Please choose a stronger password");
  }

  // make more checks for password like @,uppercase,lower,numbers

  return getValidObject();
}

function validateConfirmedPassword(password, confirmedPassword) {
  // if it comes here this means password is valid, so no need to validate confirmedpassword only check for equality
  if (password !== confirmedPassword) {
    return getInValidObject(
      false,
      "Password and confirmed password donot match"
    );
  }

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
  const nameObject = validateName(userCredentials.name);
  if (!nameObject.res) {
    return nameObject;
  }

  const emailAdressObject = validateEmailAddress(userCredentials.email);
  if (!emailAdressObject.res) {
    return emailAdressObject;
  }

  const passwordObject = validatePassword(userCredentials.password);
  if (!passwordObject.res) {
    return passwordObject;
  }

  const confirmedPasswordObject = validateConfirmedPassword(
    userCredentials.password,
    userCredentials.confirmedPassword
  );

  if (!confirmedPasswordObject.res) {
    return confirmedPasswordObject;
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
  const emailAdressObject = validateEmailAddress(userCredentials.email);
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
  const passwordObject = validatePassword(userCredentials.password);
  if (!passwordObject.res) {
    return passwordObject;
  }

  const confirmedPasswordObject = validateConfirmedPassword(
    userCredentials.password,
    userCredentials.confirmedPassword
  );

  if (!confirmedPasswordObject.res) {
    return confirmedPasswordObject;
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
};
