import React from "react";
import "../css/footer.css";
import { routes, vars } from "../utilities/ClientVarsUtility.js";
import { Link } from "react-router-dom";

/* {`${
            vars.brandName
          } © ${new Date().getFullYear()}`} */

function Footer() {
  return (
    <div>
      <footer>
        <div className="footer container-fluid">
          <p className="footer-heading">Important links</p>

          <Link to={routes.INTERVIEW_EXPERIENCES} className="footer-tab">
            Interview Experiences
          </Link>
          <p className="copyright-tab">
            {vars.brandName} © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
