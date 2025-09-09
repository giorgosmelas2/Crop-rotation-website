import React, { useEffect, useState } from "react";
import { Text } from "../components/Text";
import style from "../styling/login.module.css";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const animationClass =
    activeTab === "login" ? style["slide-left"] : style["slide-right"];
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  // Check if the user is already logged in when the component mounts
  // If logged in, redirect to the account page
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        navigate("/account");
      }
    };
    checkSession();
  }, []);

  // Handle form submission for login or signup
  const handleSubmit = async () => {
    setServerMessage("");

    if (activeTab === "signup") {
      if (password !== confirmPassword) {
        setServerMessage("Passwords do not match!");
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      });

      if (error) {
        setServerMessage(error.message);
      } else {
        setServerMessage("Check your email for the confirmation link!");
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setServerMessage(error.message);
      } else {
        navigate("/account");
      }
    }
  };

  return (
    <section className={style.container}>
      <div className={style.green}>
        <Text variant="main_title" color="white" as="h2">
          {activeTab === "login" ? "Log in" : "Sign up"}
        </Text>

        <div className={style.toggle_container}>
          <button
            className={`${style.toggle_btn} ${
              activeTab === "login" ? style.active : ""
            }`}
            id="loginBtn"
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`${style.toggle_btn} ${
              activeTab === "signup" ? style.active : ""
            }`}
            id="signupBtn"
            onClick={() => setActiveTab("signup")}
          >
            Signup
          </button>
        </div>
        <form style={{ marginBottom: "1rem" }}>
          <div style={{ marginBottom: "1rem" }} className={animationClass}>
            <input
              type="email"
              id="email"
              placeholder="e-mail "
              className={style.input}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {activeTab === "signup" && (
            <div style={{ marginBottom: "1rem" }} className={animationClass}>
              <input
                type="text"
                id="username"
                placeholder="username"
                className={style.input}
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div style={{ marginBottom: "1rem" }} className={animationClass}>
            <input
              type="password"
              id="password"
              placeholder="password"
              className={style.input}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {activeTab === "signup" && (
            <div style={{ marginBottom: "1rem" }} className={animationClass}>
              <input
                type="password"
                id="confirmPassword"
                placeholder="confirm password"
                className={style.input}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
        </form>

        <button
          className={style.submit_btn}
          type="submit"
          onClick={handleSubmit}
        >
          Υποβολή
        </button>

        {serverMessage && (
          <Text
            variant="small_text"
            color="red"
            as="p"
            style={{ marginTop: "1rem", color: "red", textAlign: "center" }}
          >
            {serverMessage}
          </Text>
        )}
      </div>
    </section>
  );
};

export default Login;
