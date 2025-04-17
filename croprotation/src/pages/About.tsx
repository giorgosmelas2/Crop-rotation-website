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
            <section className={style.container}>
                {/* Section for the main title */}
                <div className={style.photo}>
                    <Text
                        variant="main_title"
                        color="white"
                        as="h2">Who am I?</Text>
                </div>

                {/* Section for displaying short personal information */}
                <div className={style.green_personal_info_background}>
                    <div className={style.short_info_container}>
                        <div className={style.short_info_box}>
                            <img
                                src={nameImage}
                                className={style.info_image}
                                alt="name" />
                            <Text
                                variant="box_text"
                                color="white"
                                as="p">
                                George-Serafeim Melas
                            </Text>
                        </div>

                        {/* Box for displaying education information */}
                        <div className={style.short_info_box}>
                            <img
                                src={educationImage}
                                className={style.info_image}
                                alt="name" />
                            <Text
                                variant="box_text"
                                color="white"
                                as="p">
                                Computer Engineering and Electronic Systems (IHU)
                            </Text>
                        </div>

                        {/* Box for displaying focus on AI */}
                        <div className={style.short_info_box}>
                            <img
                                src={aiImage}
                                className={style.info_image}
                                alt="name" />
                            <Text
                                variant="box_text"
                                color="white"
                                as="p">
                                Focus on Artificial Intelligence
                            </Text>
                        </div>
                        {/* Section for extended personal information */}
                        <div className={style.short_info_box}>
                            <img
                                src={tractorImage}
                                className={style.info_image}
                                alt="name" />
                            <Text
                                variant="box_text"
                                color="white"
                                as="p">
                                From a farming family
                            </Text>
                        </div>
                    </div>
                </div>
                <div className={style.bottom_title}>
                    <Text
                        variant="secondary_title"
                        color="black"
                        as="h2">
                        A Few Words About Me
                        <AnimatedDots />
                    </Text>

                </div>
            </section>

            {/* Container for detailed personal information */}
            <section className={style.info_text}>
                <div className={style.extended_info_container}>

                    <div className={style.extended_info_box}>
                        <Text
                            variant="main_text"
                            color="black"
                            as="p">
                            My name is George-Serafeim Melas and I am a fifth-year student at the International Hellenic University (IHU),
                            in the Department of Information and Electronic Systems Engineering.
                        </Text>
                        <Text
                            variant="main_text"
                            color="black"
                            as="p">
                            My passion for technology and computer science began at an early age
                            and has grown steadily over the years.
                            Over time, I developed a strong interest in Artificial Intelligence and
                            its potential to solve real-world problems. Coming from a farming family myself,
                            I find it especially meaningful to explore how AI can support farmers in improving
                            their production and making smarter, more sustainable decisions.
                        </Text>
                        <Text
                            variant="main_text"
                            color="black"
                            as="p">
                            This project represents my desire to combine cutting-edge technology with practical
                            agricultural needs—creating intelligent systems that promote efficiency, sustainability,
                            and resilience in farming. Through this work, I aim to contribute to the development of smart,
                            impactful solutions that make a real difference both for people and the planet.
                        </Text>
                    </div>
                </div>
            </section>
        </>
    );
}

export default About;