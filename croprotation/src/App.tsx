import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import RotationPlan from "./pages/RotatioPlan";
import Overview from "./pages/Overview";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="rotationplan" element={<RotationPlan />} />
        <Route path="overview" element={<Overview />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>
  
  );
}

export default App;
