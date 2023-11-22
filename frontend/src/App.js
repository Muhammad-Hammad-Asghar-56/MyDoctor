import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home/home";
import Header from "./components/Header/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/Hero/HeroSection";
import NursesSection from "./components/NursesSection/NursesSection";
import VaccineSection from "./components/VaccineSection/VaccineSection";
import AddNewNurse from './components/NursesSection/AddNewNurse/AddNewNurse'
import AddNewVaccine from "./components/VaccineSection/AddNewVaccine/AddNewVaccine";
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
              <Route path="/newNurse" element={<AddNewNurse />} />
              <Route path="/newVaccine" element={<AddNewVaccine />} />

            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
