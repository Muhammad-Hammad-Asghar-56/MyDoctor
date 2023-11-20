import React from "react";
import Home from './components/Home/home'
import Header from "./components/Header/header";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import HeroSection from "./components/Hero/HeroSection";

const App = () => {
  return <>
      <Router>
        <div>
          <Header/>
          <HeroSection/>
        </div>
      </Router>
  </>;
};

export default App;
