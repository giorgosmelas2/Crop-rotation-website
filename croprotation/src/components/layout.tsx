import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import style from "../styling/layout.module.css"

// Layout component that wraps the main content with a header
// This is used to maintain a consistent layout across different pages
const Layout = () => {
    return (
        <>
            <Header />
            <div className={style.content}>
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    );

}

export default Layout;