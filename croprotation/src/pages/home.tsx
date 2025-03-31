import React from "react"
import { motion } from "framer-motion";
import style from "../styling/home.module.css"
import soilImage from "../assets/soil.png";
import climateImage from "../assets/climate.png"
import { Text } from "../components/Text";

const Home = () => {
    return (
        <div>
            <motion.section
                className={style.photo}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: "easeOut" }}>
                <motion.div
                    className={style.photo_motion}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}>
                    <div className={style.vertical_container}>
                        <Text
                            variant="main_title"
                            as="h2">
                            Wellcome to AI-Powered Crop Rotation Advisor
                        </Text>
                        <div className={style.green_line}></div>
                        <Text
                            variant="secondary_title"
                            color="secondary_title"
                            as="h3">
                            Let nature and AI grow your future
                        </Text>
                    </div>
                </motion.div>
            </motion.section>
            <section className={style.info}>
                <div className={style.vertical_container}>
                    <Text
                        variant="main_text"
                        as="h4">
                        This AI-driven crop rotation recommendation system,
                        designed to help farmers optimize their planting strategies
                        for healthier soil, increased yields, and greater profitability.
                        Our intelligent model analyzes soil nutrients, local climate conditions,
                        and market demand to suggest the ideal crop sequence,
                        ensuring sustainable farming practices and maximizing efficiency.
                    </Text>
                    <div className={style.horizontally_container}>
                        <div className={style.green_box}>
                            <Text
                                variant="box_title"
                                as="h4">
                                Soil
                            </Text>
                            <img src={soilImage} alt="soilImg" />
                            <Text
                                variant="box_text"
                                as="p">
                                Preserve soil health with scientifically optimized crop rotations.
                            </Text>
                        </div>
                        <div className={style.green_box}>
                            <Text
                                variant="box_title"
                                as="h4">
                                Climate
                            </Text>
                            <img src={climateImage} alt="soilImg" />
                            <Text
                                variant="box_text"
                                as="p">
                                Adapt to changing climate conditions for better resilience.
                                Align your crops with market demand to boost profitability.
                            </Text>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;