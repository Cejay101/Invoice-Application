import React from "react";
import "./App.css";

import Dashboard from "./Dashboard";
import SideBar from "./components/SideBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { mode } = useTheme();
  return (
    <div className={`App ${mode}`}>
      <SideBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
