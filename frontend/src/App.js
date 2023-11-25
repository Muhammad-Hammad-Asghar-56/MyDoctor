import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home/home";
import Header from "./components/Header/Adminheader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/Hero/HeroSection";
import NursesSection from "./components/AdminNursesSection/NursesSection";
import VaccineSection from "./components/AdminVaccineSection/VaccineSection";
import AddNewNurse from './components/AdminNursesSection/AddNewNurse/AddNewNurse'
import AddNewVaccine from "./components/AdminVaccineSection/AddNewVaccine/AddNewVaccine";
import Campaign from "./components/AdminCampaignSection/Campaign";
import AddNewCampaign from "./components/AdminCampaignSection/AddNewCampaign/AddNewCampaign";
import UserState from "./State/UserState";
import Login from './pages/LoginPage/LoginPage'
import NurseMainPage from "./components/Nurse/NurseMainPage";

const App = () => {
  return (
    <UserState>

      <Router>
        <div>
          <Routes>
            <Route>
              <Route path="/" element={<HeroSection />} />
              <Route path="/admin/nurses" element={<NursesSection />} />
              <Route path="/admin/vaccines" element={<VaccineSection />} />
              <Route path="/admin/newNurse" element={<AddNewNurse />} />
              <Route path="/admin/newVaccine" element={<AddNewVaccine />} />
              <Route path="/admin/Campaign" element={<Campaign />} />
              <Route path="/admin/newCampaign" element={<AddNewCampaign />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/nurse" element={<NurseMainPage/>} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </UserState>
  );
};

export default App;
