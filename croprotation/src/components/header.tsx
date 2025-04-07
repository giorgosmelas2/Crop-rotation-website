import { Link } from "react-router-dom";
import React, { useState } from "react";
import style from "../styling/header.module.css";
import { Text } from "./Text";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className={style.header}>
      <div className={style.left_section}>
        <img
          className={style.logo}
          src="/crop-rotation-color-icon-ok.png"
          alt="Crop Rotation Logo"
        />
        <Link to="/">
          <Text variant="header_title" color="white" as="h1">
            Crop Rotation
          </Text>
        </Link>
      </div>

      <button
        className={style.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <div className={`${style.right_section} ${menuOpen ? style.open : ""}`}>
        <Link 
        to="overview" 
        className={style.menu_button}>
          <Text
            variant="button_text"
            color="white"
            as="span">
            Overview
          </Text>
        </Link>
        <Link 
        to="about" 
        className={style.menu_button}>
          <Text
            variant="button_text"
            color="white"
            as="span">
            About me
          </Text>
        </Link>
        <Link 
        to="rotationplan" 
        className={style.menu_button}>
          <Text
            variant="button_text"
            color="white"
            as="span">
            Rotation Plan
          </Text>
        </Link >
        <Link 
        to="login" 
        className={style.menu_button}>
          <Text
            variant="button_text"
            color="white"
            as="span">
            Login
          </Text>
        </Link>
      </div>
    </header>
  );
};

export default Header;
