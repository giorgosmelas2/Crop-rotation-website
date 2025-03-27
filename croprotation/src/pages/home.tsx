import React from "react"
import style from "../styling/home.module.css"

const Home = () => {
    return (
        <div>


            <section className={style.hero}>
                <div className={style.vertical_container}>
                    <h2>Wellcome to AI-Powered Crop Rotation Advisor </h2>
                    <div className={style.greenLine}></div>
                    <h3>Let nature and AI grow your future</h3>
                </div>
            </section>
            <section>
                <div>
                <h4>Welcome to our AI-driven crop rotation recommendation system, designed to help farmers optimize their planting strategies for healthier soil, increased yields, and greater profitability.</h4>

                </div>
               
            </section>
        </div>

    );
}

export default Home;