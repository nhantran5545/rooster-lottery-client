import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./index.css";
import Welcome from "./pages/Welcome";
import TakePhoto from "./pages/TakePhoto";
import PreviewPhoto from "./pages/PreviewPhoto";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/welcome" element={<Welcome />} />
        <Route exact path="/photobooth" element={<TakePhoto />} />
        <Route exact path="/preview" element={<PreviewPhoto />} />
      </Routes>
    </Router>
  );
};

export default App;
