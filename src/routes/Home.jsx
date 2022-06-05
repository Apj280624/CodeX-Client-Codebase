import React from "react";
import "../css/home.css";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import SlideShow from "../components/SlideShow";
import Footer from "../components/Footer";
import POTD from "../components/POTD";
import ContributeCard from "../components/ContributeCard";
import Temp from "../components/Temp";

function Home() {
  return (
    <div>
      <Navbar />
      <SlideShow />
      <Temp />
      <ContributeCard />
      <SearchBar />
      <POTD />
      <Footer />
    </div>
  );
}

export default Home;
