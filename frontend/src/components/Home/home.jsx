import React from "react";
import "./home.css";

const home = () => {
  return (
    <div>
      <div className="homepage">
        <h1 className="homepageHeading"> MyDoctor.com</h1>
        <img
          className="homepageImage"
          src="./doctor-character-background_1270-84.avif"
          alt=""
        />
      </div>
    </div>
  );
};

export default home;
