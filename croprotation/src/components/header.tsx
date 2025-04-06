import { Link } from "react-router-dom";
import React, { useState } from "react";
import style from "../styling/header.module.css";
import { Text } from "./Text";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className={style.header}>
      <div className={style.leftSection}>
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

      <div className={`${style.rightSection} ${menuOpen ? style.open : ""}`}>
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
