import React, { useState, useEffect } from "react";
import { Text } from "../components/Text";
import { CheckBox } from "../components/CheckBox";
import { supabase } from "../lib/supabaseClient";
import style from "../styling/rotationPlan.module.css"
import cropRotationImage from "../assets/crop_rotation.png"
import PolygonMap from "../components/PolygonMap";

import CropInputPair from "../components/CropInputPair";
import { map } from "framer-motion/client";

const RotationPlan = () => {
    const [years, setyears] = useState<number>(3);
    const [texture, setTexture] = useState("");
    const [irrigation, setIrrigation] = useState("");
    const [nitrogenValue, setNitrogenValue] = useState("");
    const [phosphorusValue, setPhosphorusValue] = useState("");
    const [potassiumValue, setPotassiumValue] = useState("");
    const [pHValue, setPHValue] = useState("");

    const [pastYearCrop3, setPastYearCrop3] = useState("");
    const [pastYearCrop2, setPastYearCrop2] = useState("");
    const [pastYearCrop1, setPastYearCrop1] = useState("");

    const [effectivecropPairs, setEffectiveCropPairs] = useState([
        {crop1: "", crop2: "", value: 2}
    ]);
    const [uneffectiveCropPairs, setUneffectiveCropPairs] = useState([
        {crop1: "", crop2: "", value: 2}
    ]);

    const [soilCategories, setSoilCategories] = useState<string[]>([]);
    const [allCrops, setAllCrops] = useState<string[]>([]);
    const [suggestedCrops, setSuggestedCropsCrops] = useState<string[]>([]);

    const [selectedSuggestedCrops, setSelectedSuggestedCrops] = useState<string[]>([]);
    const [selectedAllCrops, setSelectedAllCrops] = useState<string[]>([]);

    // Add a new effective crop pair
    const addEffectiveCropPair = () => {
        setEffectiveCropPairs([...effectivecropPairs, { crop1: "", crop2: "", value: 2 }]);
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
        newPairs[index][position === 0 ? "crop1" : "crop2"] = value;
        setEffectiveCropPairs(newPairs);
    }

    // Add a new uneffective crop pair
    const addUneffectiveCropPair = () => {
        setUneffectiveCropPairs([...uneffectiveCropPairs, { crop1: "", crop2: "", value: 2 }]);
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
        newPairs[index][position === 0 ? "crop1" : "crop2"] = value;
        setUneffectiveCropPairs(newPairs);
    }

    //Update effective crop pair value
    const updateEffectiveCropPairValue = (index, value) => {
        const newPairs = [ ...effectivecropPairs];
        newPairs[index].value = value;
        setEffectiveCropPairs(newPairs);
    }

    //Update uneffective crop pair value
    const updateUneffectiveCropPairValue = (index, value) => {  
        const newPairs = [ ...uneffectiveCropPairs];
        newPairs[index].value = value;
        setUneffectiveCropPairs(newPairs);
    }

    // Handle change in the range input for years
    const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setyears(Number(e.target.value));
    }

    // Fetch soil categories from the database on component mount
    useEffect(() => {
        const fetchSoilInfo = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/soil-categories", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const soilCategories = await response.json();
                setSoilCategories(soilCategories);
            } catch (error) {
                console.error("Failed to fetch soil data on page load:", error);
            }
        };

        fetchSoilInfo();
    }, [])


    // Fetch all crops from the database on component mount
    useEffect(() => {
        const fetchAllCrops = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/all-crops", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const allCrops = await response.json();
                setAllCrops(allCrops);
            } catch (error) {
                console.error("Failed to fetch all crops:", error);
            }
        };
        fetchAllCrops();
    }, [])

    // Handle polygon creation on the map
    const handlePolygonCreate = async (coords) => {
        if (!coords || coords.length === 0) return;

        const { lat, lon } = getCentroid(coords);

        try {
            // Fetch suitable crops
            const response = await fetch("http://localhost:8000/api/suggest-crops", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ lat, lon }),
            });
            const data = await response.json();
            setSuggestedCropsCrops(data.suitable_crops);

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

    const handleSubmit = async () => {
        const cleanedCrops = [...new Set([...selectedSuggestedCrops, ...selectedAllCrops])].filter((crop) => crop !== "All crops");

        const payload = {
            crops: cleanedCrops,
            texture: texture,
            irrigation: irrigation,
            nitrogen: nitrogenValue,
            phosphorus: phosphorusValue,
            potassium: potassiumValue,
            pH: pHValue,
            past_crops: [pastYearCrop3, pastYearCrop2, pastYearCrop1].filter(Boolean),
            effective_pairs: effectivecropPairs.filter(pair => pair.crop1 && pair.crop2),
            uneffective_pairs: uneffectiveCropPairs.filter(pair => pair.crop1 && pair.crop2),
            years: years
        };

        console.log("Payload to be sent:", payload);

        try {
            const res = await fetch("http://localhost:8000/api/rotation-info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            console.log("Response from backend:", data);
        } catch (err) {
            console.error("Submission failed:", err);
        }
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
                        Map Your Field.
                    </Text>
                    <div className={style.map}>
                        <PolygonMap onPolygonCreate={(latlon) => handlePolygonCreate(latlon)} />
                    </div>
                </div>

                {/* Suggested crops */}
                {suggestedCrops.length > 0 && (
                    <div className={style.field_info_box}>
                        <Text
                            variant="secondary_title"
                            color="black"
                            as="h2">
                            Smart Crop Picks
                        </Text>

                        <div className={style.checkBox_container}>
                            <CheckBox
                                crops={suggestedCrops}
                                selected={selectedSuggestedCrops}
                                setSelected={setSelectedSuggestedCrops} />
                        </div>
                    </div>
                )}

                {/* All crops */}
                <div className={style.field_info_box}>
                    <Text
                        variant="secondary_title"
                        color="black"
                        as="h2">
                        Pick Your Own
                    </Text>

                    <div className={style.checkBox_container}>
                        <CheckBox
                            crops={allCrops}
                            selected={selectedAllCrops}
                            setSelected={setSelectedAllCrops} />
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

                {/*Soil info */}
                <div className={style.field_info_box}>
                    <Text
                        variant="secondary_title"
                        color="black"
                        as="h2">
                        Enter your soil information
                    </Text>
                    <div className={style.soil_info_container}>
                        <div className={style.soil_info_box}>
                            <Text
                                variant="label"
                                color="black"
                                as="label">
                                Texture
                            </Text>
                            <select
                                value={texture}
                                onChange={(e) => setTexture(e.target.value)}
                                className={style.select_input}>
                                <option>Select texture</option>
                                {soilCategories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={style.soil_info_box}>
                            <Text
                                variant="label"
                                color="black"
                                as="label">
                                Irrigation
                            </Text>
                            <select
                                value={irrigation}
                                onChange={(e) => setIrrigation(e.target.value)}
                                className={style.select_input}>
                                <option>Select texture</option>
                                <option>No irrigation</option>
                                <option>Limited irrigation </option>
                                <option>Irrigated</option>
                                <option>Full irrigation </option>
                            </select>
                        </div>
                    </div>
                    <div className={style.soil_info_container}>
                    <div className={style.soil_info_box}>
                            <Text
                                variant="label"
                                color="black"
                                as="label">
                                fertilization
                            </Text>
                            <select
                                value={irrigation}
                                onChange={(e) => setIrrigation(e.target.value)}
                                className={style.select_input}>
                                <option>Select texture</option>
                                <option>No fertilization</option>
                                <option>Limited fertilization </option>
                                <option>Fertilized</option>
                                <option>Fully fertilized </option>
                            </select>
                        </div>
                    
                        <div className={style.soil_info_box}>
                            <Text
                                variant="label"
                                color="black"
                                as="label">
                                Nitrogen
                            </Text>
                            <input
                                value={nitrogenValue}
                                onChange={(e) => setNitrogenValue(e.target.value)}
                                type="text"
                                className={style.soi_inputs}
                                placeholder="0.0 g/kg " />
                        </div>
                    </div>
                    <div className={style.soil_info_container}>
                    <div className={style.soil_info_box}>
                            <Text
                                variant="label"
                                color="black"
                                as="label">
                                Potassium
                            </Text>
                            <input
                                value={potassiumValue}
                                onChange={(e) => setPotassiumValue(e.target.value)}
                                type="text"
                                className={style.soi_inputs}
                                placeholder="0.0 mg/kg " />
                        </div>
                        <div className={style.soil_info_box}>
                            <Text
                                variant="label"
                                color="black"
                                as="label">
                                Phosphorus
                            </Text>
                            <input
                                value={phosphorusValue}
                                onChange={(e) => setPhosphorusValue(e.target.value)}
                                type="text"
                                className={style.soi_inputs}
                                placeholder="0.0 mg/kg" />
                        </div>
                    </div>
                    <div className={style.soil_info_container}>
                        <div className={style.soil_info_box}>
                            <Text
                                variant="label"
                                color="black"
                                as="label">
                                pH
                            </Text>
                            <input
                                value={pHValue}
                                onChange={(e) => setPHValue(e.target.value)}
                                type="text"
                                className={style.soi_inputs}
                                placeholder="0.0" />
                        </div>
                    </div>

                </div>

                {/* Past crops section */}
                <div className={style.field_info_box}>
                    <Text
                        variant="secondary_title"
                        color="black"
                        as="h2">
                        Add your last 3 years of crops to help with rotation planning
                    </Text>
                    <select
                        value={pastYearCrop3}
                        onChange={(e) => setPastYearCrop3(e.target.value)}
                        className={style.select_input}
                        style={{ marginBottom: "1.5rem" }} >
                        <option>3 years ago</option>
                        {allCrops.map((crop, index) => (
                            <option key={index} value={crop}>
                                {crop}
                            </option>
                        ))}
                    </select>
                    <select
                        value={pastYearCrop2}
                        onChange={(e) => setPastYearCrop2(e.target.value)}
                        className={style.select_input}
                        style={{ marginBottom: "1.5rem" }}>
                        <option>2 years ago</option>
                        {allCrops.map((crop, index) => (
                            <option key={index} value={crop}>
                                {crop}
                            </option>
                        ))}
                    </select>
                    <select
                        value={pastYearCrop1}
                        onChange={(e) => setPastYearCrop1(e.target.value)}
                        className={style.select_input}
                        style={{ marginBottom: "1.5rem" }}>
                        <option>Last year</option>
                        {allCrops.map((crop, index) => (
                            <option key={index} value={crop}>
                                {crop}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Effective crop sequence section */}
                <div className={style.field_info_box}>
                    <Text
                        variant="secondary_title"
                        color="black"
                        as="h2">
                        Share your effective crop sequence
                    </Text>
                    {effectivecropPairs.map((pair, index) => (
                        <CropInputPair
                            key={index}
                            index={index}
                            value1={pair.crop1}
                            value2={pair.crop2}
                            value={pair.value}
                            crops={allCrops}
                            whichPair={"effective"}
                            onChange={updateEffectiveCropPair}
                            onValueChange={updateEffectiveCropPairValue}
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
                        Share your uneffective crop sequence
                    </Text>
                    {uneffectiveCropPairs.map((pair, index) => (
                        <CropInputPair
                            key={index}
                            index={index}
                            value1={pair.crop1}
                            value2={pair.crop2}
                            value={pair.value}
                            crops={allCrops}
                            whichPair={"uneffective"}
                            onChange={updateUneffectiveCropPair}
                            onValueChange={updateUneffectiveCropPairValue}
                            onDelete={deleteUneffectiveCropPair} />
                    ))}
                    <button onClick={addUneffectiveCropPair} className={style.add_button}>+ Add Crops</button>
                </div>
                <button 
                    className={style.submit_button}
                    onClick={handleSubmit}>
                    Submit
                </button>
            </section>
        </>
    );
}

export default RotationPlan;