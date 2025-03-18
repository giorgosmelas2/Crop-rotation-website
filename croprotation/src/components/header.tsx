import { Link } from "react-router-dom";
import React from "react";
import style from "../styling/header.module.css";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.leftSection}>
        <img className={style.logo} src="/crop-rotation-color-icon-ok.png" alt="Crop Rotation Logo" />
        <h1>Crop Rotation</h1>
      </div>

      <div className={style.rigthSection}>
        <button>About us</button>
        <button>Rotation Plan</button>
        <button> Login</button>
      </div>
    </header>
  );
};

export default Header;
