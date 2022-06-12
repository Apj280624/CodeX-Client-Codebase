import React from "react";
import { SpinnerInfinity } from "spinners-react";

// my modules
import { vars } from "../utilities/ClientVarsUtility.js";

function Loader() {
  return (
    <SpinnerInfinity
      size="100"
      color={vars.darkPurple}
      secondaryColor={vars.lightPurple}
    />
  );
}

export default Loader;
