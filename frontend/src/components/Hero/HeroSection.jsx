import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="">
      <div className="heroSection">
        <div className="leftSection">
          <h1 className="HeroText">
            Building Healthier and <br /> Happier Communities
          </h1>
          <h4 className="HeroText">
            Your tireless efforts and dedication <br />
            to the medical field are the foundation <br /> of healthier and
            happier communities.
          </h4>
        </div>
        <div className="RightSection">
          <div>
            <img className="heroSectionImage" src="./HeroImage.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
