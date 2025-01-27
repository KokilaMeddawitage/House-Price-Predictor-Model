import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/bg.jpg"; // Replace with your image path

function Home() {
  const navigate = useNavigate(); // Hook for navigation

  const handleNavigation = () => {
    navigate("/price-predictor"); // Navigate to the price-predictor page
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url(${image})`, // Replace with your image path
      }}
    >
      <h1>Home</h1>
      <button
        onClick={handleNavigation}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
        }}
      >
        Go to Price Predictor
      </button>
    </div>
  );
}

export default Home;
