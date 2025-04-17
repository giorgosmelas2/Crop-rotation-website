import React, { useState } from "react";
import { Text } from "../components/Text";
import style from "../styling/rotationPlan.module.css"
import cropRotationImage from "../assets/crop_rotation.png"
import PolygonMap from "../components/PolygonMap";
import { CheckBox } from "../components/CheckBox";

const RotationPlan = () => {
    const handlePolygonCreate = (coords) => {
        console.log('coordinates:', coords);
    };

    const [value, setValue] = useState<number>(3);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
    }

    return (
        <>
            <section className={style.green}>
                <div className={style.container}>
                    <div className={style.box}>
                        <Text
                            variant="secondary_title"
                            color="white"
                            as="h2">
                            Tell us about your field, and we’ll tell you what to grow next – smarter soil, happier harvest!
                        </Text>
                    </div>
                    <div className={style.image_box}>
                        <img src={cropRotationImage} alt="hands" className={style.image} />
                    </div>
                </div>
                <div className={style.calligraphic}>
                    <Text
                        variant="calligraphic_title"
                        color="white"
                        as="h3">
                        Let’s rotate it right!
                    </Text>
                </div>
            </section>
            <section className={style.field_info_container}>
                <div className={style.field_info_box}>
                    <Text
                        variant="secondary_title"
                        color="black"
                        as="h2">
                        Draw your field on the map.
                    </Text>
                    <div className={style.map}>
                        <PolygonMap onPolygonCreate={handlePolygonCreate} />
                    </div>
                </div>

                <div className={style.field_info_box}>
                    <Text
                        variant="secondary_title"
                        color="black"
                        as="h2">
                        Which crops do you want in rotation plan?
                    </Text>

                    <div className={style.checkBox_container}>
                        <CheckBox />
                    </div>
                </div>

                <div className={style.field_info_box}>
                    <Text
                        variant="secondary_title"
                        color="black"
                        as="h2">
                        How many years do you want to be your rotation plan?
                    </Text>
                    <input 
                        type="range"
                        min="3"
                        max="15"
                        value={value}
                        onChange={handleChange}
                        className={style.spinner}/>
                    <Text
                        variant="main_text"
                        color="black"
                        as="p">
                        {value} years
                    </Text>
                </div>
            </section>


        </>
    );
}


export default RotationPlan;