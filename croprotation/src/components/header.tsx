import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import style from "../styling/header.module.css";
import { Text } from "./Text";
import { supabase } from "../lib/supabaseClient";

const Header = () => {
  // State to manage the menu open/close state
  // This is used for the hamburger menu on mobile devices
  const [menuOpen, setMenuOpen] = useState(false);

  // Check if the user is logged in when the component mounts
  const [isloggedIn, setIsLoggedIn] = useState(false);

  // Refs to manage clicks outside the menu and button
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close the menu when clicking outside of it or the button
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target as Node;
      const clickedOutsideMenu = menuRef.current && !menuRef.current.contains(target);
      const clickedOutsideButton = buttonRef.current && !buttonRef.current.contains(target);

      if (clickedOutsideMenu && clickedOutsideButton) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Check if the user is logged in when the component mounts.
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
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
        ref={buttonRef}
        className={style.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <div
        ref={menuRef}
        className={`${style.right_section} ${menuOpen ? style.open : ""}`}
      >
        <Link
          to="overview"
          className={style.menu_button}
          onClick={() => setMenuOpen(false)}
        >
          <Text variant="header_button_text" color="white" as="span">
            Επισκόπηση
          </Text>
        </Link>
        <Link
          to="about"
          className={style.menu_button}
          onClick={() => setMenuOpen(false)}
        >
          <Text variant="header_button_text" color="white" as="span">
            Προφίλ
          </Text>
        </Link>
        <Link
          to="rotationplan"
          className={style.menu_button}
          onClick={() => setMenuOpen(false)}
        >
          <Text variant="header_button_text" color="white" as="span">
            Πλάνο
          </Text>
        </Link>
        <Link
          to="login"
          className={style.menu_button}
          onClick={() => setMenuOpen(false)}
        >
          <Text variant="header_button_text" color="white" as="span">
            {isloggedIn ? "Account" : "Log in"}
          </Text>
        </Link>
      </div>
    </header>
  );
};

export default Header;
