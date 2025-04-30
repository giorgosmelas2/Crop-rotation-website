import React, { useState } from "react";
import { Text } from "../components/Text";
import style from "../styling/rotationPlan.module.css"
import cropRotationImage from "../assets/crop_rotation.png"
import PolygonMap from "../components/PolygonMap";
import { CheckBox } from "../components/CheckBox";
import CropInputPair from "../components/CropInputPair";

const RotationPlan = () => {
    // State to manage the number of years for the rotation plan
    const [years, setyears] = useState<number>(3);

    // State to manage effective crop pairs
    const [effectivecropPairs, setEffectiveCropPairs] = useState([["", ""]]);

    // Add a new effective crop pair
    const addEffectiveCropPair = () => {
        setEffectiveCropPairs([...effectivecropPairs, ["", ""]]);
    };

    // Delete an effective crop pair by index
    const deleteEffectiveCropPair = (index) => {
        const newPairs = [...effectivecropPairs];
        newPairs.splice(index, 1);
        setEffectiveCropPairs(newPairs)
    }

    // Update an effective crop pair by index and position (0 or 1)
    const updateEffectiveCropPair = (index, position, value) => {
        const newPairs = [...effectivecropPairs];
        newPairs[index][position] = value;
        setEffectiveCropPairs(newPairs);
    }

    // State to manage uneffective crop pairs
    const [uneffectiveCropPairs, setUneffectiveCropPairs] = useState([["", ""]]);

    // Add a new uneffective crop pair
    const addUneffectiveCropPair = () => {
        setUneffectiveCropPairs([...uneffectiveCropPairs, ["", ""]]);
    }

    // Delete an uneffective crop pair by index
    const deleteUneffectiveCropPair = (index) => {
        const newPairs = [...uneffectiveCropPairs];
        newPairs.splice(index, 1);
        setUneffectiveCropPairs(newPairs);
    }

    // Update an uneffective crop pair by index and position (0 or 1)
    const updateUneffectiveCropPair = (index, position, value) => {
        const newPairs = [...uneffectiveCropPairs];
        newPairs[index][position] = value;
        setUneffectiveCropPairs(newPairs);
    }

    // Handle change in the range input for years
    const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setyears(Number(e.target.value));
    }

    // State to manage selected crops from the checkbox
    const [selectedCrops, setSelectedCrops] = useState<string[]>([]);

    // Handle polygon creation on the map
    const handlePolygonCreate = async (coords) => {
        if (!coords || coords.length === 0) return;

        const { lat, lon } = getCentroid(coords);

        try {
            const response = await fetch("http://localhost:8000/api/suggest-crops",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ lat, lon }),
            });
            const data = await response.json();
            setSelectedCrops(data.suitable_crops);
        } catch (error) {
            console.error("Error fetching suitable crops:", error);
        }
    };

    // Function to calculate the centroid of the polygon
    const getCentroid = (coords) => {
        const latSum = coords.reduce((sum, point) => sum + point.lat, 0);
        const lngSum = coords.reduce((sum, point) => sum + point.lng, 0);
        return {
            lat: latSum / coords.length,
            lon: lngSum / coords.length,
        };
    };

    return (
        <>
            {/* Section for the introduction */}
            <section className={style.green}>
                <div className={style.container}>
                    <div className={style.box}>
                        <Text
                            variant="secondary_title"
                            color="white"
                            as="h2">
                            Tell us about your field, and we'll tell you what to grow next - smarter soil, happier harvest!
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
                        Let's rotate it right!
                    </Text>
                </div>
            </section>

            {/* Section for field information */}
            <section className={style.field_info_container}>

                {/* Map drawing section */}
                <div className={style.field_info_box}>
                    <Text
                        variant="secondary_title"
                        color="black"
                        as="h2">
                        Draw your field on the map.
                    </Text>
                    <div className={style.map}>
                        <PolygonMap onPolygonCreate={(latlon) => handlePolygonCreate(latlon)} />
                    </div>
                </div>

                {/* Checkbox section */}
                <div className={style.field_info_box}>
                    <Text
                        variant="secondary_title"
                        color="black"
                        as="h2">
                        Which crops do you want in rotation plan?
                    </Text>

                    <div className={style.checkBox_container}>
                        <CheckBox crops={selectedCrops}/>
                    </div>
                </div>

                {/* Rotation plan duration section */}
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
                        value={years}
                        onChange={handleYearsChange}
                        className={style.spinner} />
                    <Text
                        variant="main_text"
                        color="black"
                        as="p">
                        {years} years
                    </Text>
                </div>

                {/* Effective crop sequence section */}
                <div className={style.field_info_box}>
                    <Text
                        variant="secondary_title"
                        color="black"
                        as="h2">
                        Share Your Effective Crop Sequence
                    </Text>
                    {effectivecropPairs.map((pair, index) => (

                        <CropInputPair
                            key={index}
                            index={index}
                            value1={pair[0]}
                            value2={pair[1]}
                            onChange={updateEffectiveCropPair}
                            onDelete={deleteEffectiveCropPair} />
                    ))}
                    <button onClick={addEffectiveCropPair} className={style.add_button}>+ Add Crops</button>
                </div>

                {/* Uneffective crop sequence section */}
                <div className={style.field_info_box}>
                    <Text
                        variant="secondary_title"
                        color="black"
                        as="h2">
                        Share Your Uneffective Crop Sequence
                    </Text>
                    {uneffectiveCropPairs.map((pair, index) => (
                        <CropInputPair
                            key={index}
                            index={index}
                            value1={pair[0]}
                            value2={pair[1]}
                            onChange={updateUneffectiveCropPair}
                            onDelete={deleteUneffectiveCropPair} />
                    ))}
                    <button onClick={addUneffectiveCropPair} className={style.add_button}>+ Add Crops</button>
                </div>
            </section>
        </>
    );
}

export default RotationPlan;