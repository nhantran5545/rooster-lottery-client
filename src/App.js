import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import BetPage from "./pages/BetPage";
import HistoryPage from "./pages/HistoryPage";
import "./index.css";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/bet" element={<BetPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
