import React from "react";
import "../css/footer.css";

function Footer() {
  return (
    <div>
      <footer>
        <div class="footer container-fluid">
          <h3 class="footer-heading">Important links</h3>
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
        </div>
      </footer>
    </div>
  );
}

export default Footer;
