import React, { useState } from "react";
import avatar from "../assets/image-avatar.jpg";
import logo from "../assets/logo.svg";
import moon from "../assets/icon-moon.svg";
import sun from "../assets/icon-sun.svg";
// import  ille  from "../assets/";
export default function SideBar() {
  const [mode, setMode] =useState(null)
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="avatar" />
      </div>
      <img src={sun} className="avatar" alt="sun" />
      <img src={moon} className="avatar" alt="moon" />
      <img src={avatar} className="avatar" alt="avatar" />
    </div>
  );
}
