import { Link } from "react-router-dom";
import React from "react";
import style from "../styling/header.module.css";
import { Text } from "./Text";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.leftSection}>
        <img className={style.logo} src="/crop-rotation-color-icon-ok.png" alt="Crop Rotation Logo" />
        <Link to="/">
          <Text
            variant="header_title"
            as="h1">
            Crop Rotation
          </Text>
        </Link>
      </div>

      <div className={style.rigthSection}>
      <button>Overview</button>
        <Link to="about">
          <button>About me</button>
        </Link>
        <Link to="rotationplan">
          <button>Rotation Plan</button>
        </Link>
        
        <button> Login</button>
      </div>
    </header>
  );
};

export default Header;
