import React from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import SideBar from "./components/SideBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <SideBar/>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
