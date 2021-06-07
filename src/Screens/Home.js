import React from "react";
import "../Styles/Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-heading">Hospital Management System</div>
      <div className="home-btns">
        <Link to="/doctor" className="home-btn">
          Doctor
        </Link>
        <Link to="/nurse" className="home-btn">
          Nurse
        </Link>
        <Link to="/patient" className="home-btn">
          Patient
        </Link>
        <Link to="/ambulance" className="home-btn">
          Ambulance
        </Link>
        <Link to="/ward" className="home-btn">
          Ward
        </Link>
      </div>
    </div>
  );
}
