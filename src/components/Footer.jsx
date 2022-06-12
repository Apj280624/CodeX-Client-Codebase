import React from "react";
import "../css/footer.css";
import { vars } from "../utilities/ClientVarsUtility.js";

function Footer() {
  return (
    <div>
      <footer>
        <div class="footer container-fluid">
          <p class="footer-heading">Important links</p>
          <a class="footer-tab" href="/">
            Competitive Programming
          </a>
          <a class="footer-tab" href="/">
            Data Structures and Algorithms
          </a>
          <a class="footer-tab" href="/">
            Interview Experiences
          </a>
          <a class="footer-tab" href="/">
            Frequently Asked Questions
          </a>
          <p className="copyright-tab">{`${
            vars.brandName
          } © ${new Date().getFullYear()}`}</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
