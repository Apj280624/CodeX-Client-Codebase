import React, { useEffect } from "react";
import "../css/home.css";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import SlideShow from "../components/SlideShow";
import Footer from "../components/Footer";
import POTD from "../components/POTD";
import ContributeCard from "../components/ContributeCard";
import Temp from "../css/temp.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  useEffect(() => {
    AOS.init({
      offset: 120,
      duration: 800,
    });
  }, []);
  return (
    <div>
      <Navbar />
      <SlideShow />
      <div className="container-fluid">
        <div className={Temp.commonDiv}>
          <div className="row">
            <div className="col-lg-6">
              <div className={Temp.bigDiv}>
                <p className={`${Temp.bigText} ${Temp.commonText}`}>
                  Stay tuned, We've got a lot coming up for you
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={Temp.smallDiv}>
                <p className={`${Temp.smallText} ${Temp.commonText}`}>
                  Our Interview Experience section might help you get insights
                  of real interviews
                </p>
              </div>
              <div className={Temp.smallDiv}>
                <p className={`${Temp.smallText} ${Temp.commonText}`}>
                  We are here as a medium cease up the communication gap
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
