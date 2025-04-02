import React from "react";
import { Text } from "../components/Text";
import AnimatedDots from "../components/AnimatedDots"
import style from "../styling/about.module.css"
import nameImage from "../assets/name.png"
import educationImage from "../assets/education.png"
import aiImage from "../assets/ai.png"
import tractorImage from "../assets/tractor.png"

const About = () => {
    return (
        <>
            <section className={style.photo}>
                <Text 
                variant="main_title" 
                color="white"
                as="h2">Who am I?</Text>
            </section>
            <section className={style.green_personal_info_background}>
                <div className={style.info_container}>
                    <div className={style.info_box}>
                        <img src={nameImage} alt="name" />
                        <Text 
                        variant="box_text" 
                        color="white" 
                        as="p">
                            George-Serafeim Melas
                        </Text>
                    </div>
                    <div className={style.info_box}>
                        <img src={educationImage} alt="name" />
                        <Text 
                        variant="box_text" 
                        color="white" 
                        as="p">
                            Computer Engineering and Electronic Systems (IHU)
                        </Text>
                    </div>
                    <div className={style.info_box}>
                        <img src={aiImage} alt="name" />
                        <Text 
                        variant="box_text" 
                        color="white" 
                        as="p">
                            Focus on Artificial Intelligence
                        </Text>
                    </div>
                    <div className={style.info_box}>
                        <img src={tractorImage} alt="name" />
                        <Text 
                        variant="box_text" 
                        color="white" 
                        as="p">
                            From a farming family
                        </Text>
                    </div>
                </div>
            </section>
            <section className={style.info_text}>
                <Text 
                variant="secondary_title" 
                color="black"
                as="h3">
                    A Few Words About Me
                    <AnimatedDots />
                </Text>               
            </section>
        </>
    );
}

export default About;