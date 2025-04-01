import React from "react";
import { Text } from "../components/Text";
import style from "../styling/about.module.css"
import farmerImage from "../assets/farmer.svg"

const About = () => {
    return (
        <>
        <section className={style.photo}>
            <Text variant="main_title">Who am I?</Text>
        </section>
        <section className={style.green_personal_info_background}>

        </section>
        </>
    );
}

export default About;