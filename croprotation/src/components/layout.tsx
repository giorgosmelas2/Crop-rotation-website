import React from "react";
import Header from "./header";
import { Outlet } from "react-router-dom";
import style from "../styling/layout.module.css"


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