import React from "react";
import { Text } from "../components/Text";
import style from "../styling/overview.module.css"
import recycleImage from "../assets/recycle.png"


const Overview = () => {
    return (
        <>
            <section className={style.title}>
                <Text
                    variant="main_title"
                    color="white"
                    as="h2">
                    Rotations, Algorithms, and a Pinch of Nature
                </Text>
            </section>
            <section className={style.content_area}>
                <div className={style.green_background}>
                    <div className={style.calligraphic}>
                    <Text variant="calligraphic_title"
                        color="white"
                        as="h3">
                            What is crop rotation?
                        </Text>
                    </div>
                    
                    <div className={style.text_box}>
                        <Text variant="main_text"
                            color="white"
                            as="p">
                            Crop rotation is a vital agricultural practice that plays a key role
                            in maintaining soil fertility, reducing pests and diseases, and
                            supporting sustainable crop production. However, designing optimal
                            crop rotation strategies that balance ecological sustainability and
                            economic viability remains a complex challenge.

                            This project explores how Artificial Life techniques—such as
                            evolutionary algorithms, agent-based modeling, and cellular
                            automata—can be leveraged to optimize crop rotation strategies.
                            By bridging the gap between computational intelligence and agricultural
                            needs, this work highlights the potential of Artificial Life in
                            enhancing sustainable farming.
                        </Text>
                    </div>
                </div>
                <div className={style.pink_icon_container}>
                    <div className={style.pink}>
                        <Text variant="main_text"
                            color="black"
                            as="p">
                            Through the development of a simulation framework,
                            the project models key environmental and biological factors,
                            including soil nutrient dynamics, crop growth cycles, weather
                            conditions, and pest populations. Using agent-based models, the
                            system simulates interactions between crops, soil, and pests, while
                            cellular automata are used to represent spatial distribution and soil.
                        </Text>
                    </div>
                    <img src={recycleImage} alt="recycle" className={style.icon} />
                    <div className={style.pink}>
                        <Text variant="main_text"
                            color="black"
                            as="p">
                            By simulating different crop rotation scenarios under varying
                            conditions, the system allows for the exploration of long-term
                            impacts without the need for real-world field trials. This enables
                            safer experimentation, supports adaptive planning, and accelerates
                            the development of more resilient agricultural strategies.
                        </Text>
                    </div>
                </div>
                <div className={style.green_background}>
                    <div className={style.text_box}>
                        <Text variant="main_text"
                            color="white"
                            as="p">
                            Advanced optimization algorithms, including genetic algorithms and
                            particle swarm optimization, are employed to evolve crop rotation
                            sequences that maximize productivity, suppress pests, and maintain
                            long-term soil health.

                            The result is a customizable and reusable decision-support tool that
                            provides optimized rotation plans tailored to specific environmental
                            conditions. This project offers valuable insights and practical
                            recommendations for farmers, researchers, and policymakers aiming to
                            promote sustainable agriculture through data-driven solutions.

                        </Text>
                    </div>
                </div>
            </section>
        </>

    );
}

export default Overview;