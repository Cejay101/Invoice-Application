import React, { useState } from "react";
import avatar from "../assets/image-avatar.jpg";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import logo from "../assets/logo.svg";
import moon from "../assets/icon-moon.svg";
import sun from "../assets/icon-sun.svg";
export default function SideBar() {
  const themeColors = ["white", "black"];
  const { changeMode, mode } = useContext(ThemeContext);
  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };
  console.log(mode);
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="avatar" />
      </div>
      <div className="toggler">
        <img
          onClick={toggleMode}
          src={mode === "dark" ? sun : moon}
          alt="mode changer"
          style={{ color: mode === "dark" ? "invert(100%)" : "invert(2%)" }}
        />
      </div>
      <div className="line"></div>
      <div>
        <img src={avatar} className="avatar" alt="avatar" />
      </div>
    </div>
  );
}
