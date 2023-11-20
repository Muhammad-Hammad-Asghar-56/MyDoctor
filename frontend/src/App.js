import React from "react";
import Home from "./components/Home/home";
import Header from "./components/Header/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/Hero/HeroSection";
import NursesSection from "./components/NursesSection/NursesSection";
import VaccineSection from "./components/VaccineSection/VaccineSection";
import AddNewNurseSection from "./components/NursesSection/AddNewNurse/AddNewNurse";

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route>
              <Route path="/" element={<HeroSection />} />
              <Route path="/nurses" element={<NursesSection />} />
              <Route path="/vaccines" element={<VaccineSection />} />
              <Route path="/newNurse" element={<AddNewNurseSection />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
