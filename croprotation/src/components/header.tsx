import { Link } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import style from "../styling/header.module.css";
import farmerImage from "../assets/farmer.png";
import { Text } from "./Text";
import { supabase } from "../lib/supabaseClient";

const Header = () => {

  // State to manage the menu open/close state
  // This is used for the hamburger menu on mobile devices
  const [menuOpen, setMenuOpen] = useState(false);

  // Check if the user is logged in when the component mounts
  const [isloggedIn, setIsLoggedIn] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkSession();
  }, []);

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
        aria-label="Toggle menu">
        ☰
      </button>

      <div ref={menuRef} className={`${style.right_section} ${menuOpen ? style.open : ""}`}>
        <Link
          to="overview"
          className={style.menu_button}>
          <Text
            variant="header_button_text"
            color="white"
            as="span">
            Overview
          </Text>
        </Link>
        <Link
          to="about"
          className={style.menu_button}>
          <Text
            variant="header_button_text"
            color="white"
            as="span">
            About me
          </Text>
        </Link>
        <Link
          to="rotationplan"
          className={style.menu_button}>
          <Text
            variant="header_button_text"
            color="white"
            as="span">
            Rotation Plan
          </Text>
        </Link>
        <Link to="login" className={style.menu_button}>
          <Text
            variant="header_button_text"
            color="white"
            as="span">
            {isloggedIn ? "Account" : "Log in"}
          </Text>
        </Link>
      </div>
    </header>
  );
};

export default Header;
