import React from "react";
import { Text } from "../components/Text";
import style from "../styling/rotationPlan.module.css"
import handsImage from "../assets/pappous.png"
import PolygonMap from "../components/PolygonMap";

const RotationPlan = () => {
    const handlePolygonCreate = (coords) => {
        console.log('Ο χρήστης σχεδίασε πολύγωνο με συντεταγμένες:', coords);
      };

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
                        <img src={handsImage} alt="hands" className={style.image} />
                    </div>
                </div>
                <div className={style.calligraphic}>
                    <Text variant="calligraphic_title"
                        color="white"
                        as="h3">
                        Let’s rotate it right!
                    </Text>
                </div>
            </section>
            <section className={style.field_info_container}>
                <div className={style.field_info_box}>
                    <Text variant="secondary_title"
                        color="black"
                        as="h2">
                        Draw your field on the map.
                    </Text>
                    <div className={style.map}>
                        <PolygonMap onPolygonCreate={handlePolygonCreate} />
                    </div>
                </div>

                <div className={style.field_info_box}>
                <Text variant="secondary_title"
                        color="black"
                        as="h2">
                        Draw your field on the map.
                    </Text>
                </div>
            </section>
        </>
    );
}


export default RotationPlan;