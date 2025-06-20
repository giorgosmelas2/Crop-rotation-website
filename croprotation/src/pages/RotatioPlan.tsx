import React, { useState, useEffect, useRef } from "react";
import { Text } from "../components/Text";
import { CheckBox } from "../components/CheckBox";
import * as turf from "@turf/turf";
import type { Feature, Polygon } from "geojson";
import style from "../styling/rotationPlan.module.css";
import cropRotationImage from "../assets/crop_rotation.png";
import PolygonMap from "../components/PolygonMap";
import CropInputPair from "../components/CropInputPair";
import { s } from "framer-motion/client";

type Crop = { id: string; name: string };

const RotationPlan = () => {
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
    const [years, setyears] = useState<number>(3);
    const [area, setArea] = useState<number>(0);
    const [texture, setTexture] = useState("");
    const [irrigation, setIrrigation] = useState<number>(-1);
    const [fertilization, setFertilization] = useState<number>(-1);
    const [spraying, setSpraying] = useState<number>(-1);
    const [nitrogenValue, setNitrogenValue] = useState("");
    const [phosphorusValue, setPhosphorusValue] = useState("");
    const [potassiumValue, setPotassiumValue] = useState("");
    const [pHValue, setPHValue] = useState("");

    const [pastYearCrop3, setPastYearCrop3] = useState("");
    const [pastYearCrop2, setPastYearCrop2] = useState("");
    const [pastYearCrop1, setPastYearCrop1] = useState("");

    const [effectivecropPairs, setEffectiveCropPairs] = useState([
        { crop1: "", crop2: "", value: 2 },
    ]);
    const [uneffectiveCropPairs, setUneffectiveCropPairs] = useState([
        { crop1: "", crop2: "", value: 2 },
    ]);

    const [soilCategories, setSoilCategories] = useState<string[]>([]);
    const [crops, setCrops] = useState<Crop[]>([]);
    const [allCrops, setAllCrops] = useState<string[]>([]);
    const [suggestedCrops, setSuggestedCropsCrops] = useState<string[]>([]);
    const [machinery, setMachinery] = useState<string[]>([]);
    const [machineryByCropId, setMachineryByCropId] = useState<Record<string, string[]>>({});
    const [selectedSuggestedCrops, setSelectedSuggestedCrops] = useState<string[]>([]);
    const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
    const [selectedMachinery, setSelectedMachinery] = useState<string[]>([]);

    // Options for fertilization, irrigation, and spraying. The user selects an option 
    // and that option is converted to a coefficient for the prediction model

    const optionsFertilization = [
        { label: "Select fertilization", value: -1 },
        { label: "No fertilization", value: 0 },
        { label: "Limited fertilization", value: 1 },
        { label: "Fertilized", value: 2 },
        { label: "Fully fertilized", value: 3 }
    ]

    const optionsIrrigation = [
        { label: "Select irrigation", value: -1 },
        { label: "No irrigation", value: 0 },
        { label: "Limited irrigation", value: 1 },
        { label: "Irrigated", value: 2 },
        { label: "Fully irrigated", value: 3 }
    ]

    const optionsSpraying = [
        { label: "Select sraying", value: -1 },
        { label: "No sraying", value: 0 },
        { label: "Limited sraying", value: 1 },
        { label: "Srayted", value: 2 },
        { label: "Fully srayted", value: 3 }
    ]

    // Add a new effective crop pair
    const addEffectiveCropPair = () => {
        setEffectiveCropPairs([
            ...effectivecropPairs,
            { crop1: "", crop2: "", value: 2 },
        ]);
    };

    // Delete an effective crop pair by index
    const deleteEffectiveCropPair = (index) => {
        const newPairs = [...effectivecropPairs];
        newPairs.splice(index, 1);
        setEffectiveCropPairs(newPairs);
    };

    // Update an effective crop pair by index and position (0 or 1)
    const updateEffectiveCropPair = (index, position, value) => {
        const newPairs = [...effectivecropPairs];
        newPairs[index][position === 0 ? "crop1" : "crop2"] = value;
        setEffectiveCropPairs(newPairs);
    };

    //Update effective crop pair value
    const updateEffectiveCropPairValue = (index, value) => {
        const newPairs = [...effectivecropPairs];
        newPairs[index].value = value;
        setEffectiveCropPairs(newPairs);
    };

    // Add a new uneffective crop pair
    const addUneffectiveCropPair = () => {
        setUneffectiveCropPairs([
            ...uneffectiveCropPairs,
            { crop1: "", crop2: "", value: 2 },
        ]);
    };

    // Delete an uneffective crop pair by index
    const deleteUneffectiveCropPair = (index) => {
        const newPairs = [...uneffectiveCropPairs];
        newPairs.splice(index, 1);
        setUneffectiveCropPairs(newPairs);
    };

    // Update an uneffective crop pair by index and position (0 or 1)
    const updateUneffectiveCropPair = (index, position, value) => {
        const newPairs = [...uneffectiveCropPairs];
        newPairs[index][position === 0 ? "crop1" : "crop2"] = value;
        setUneffectiveCropPairs(newPairs);
    };

    //Update uneffective crop pair value
    const updateUneffectiveCropPairValue = (index, value) => {
        const newPairs = [...uneffectiveCropPairs];
        newPairs[index].value = value;
        setUneffectiveCropPairs(newPairs);
    };

    // Handle change in the range input for years
    const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setyears(Number(e.target.value));
    };

    // Fetch soil categories from the database on component mount
    useEffect(() => {
        const fetchSoilInfo = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/soil-categories",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const soilCategories = await response.json();
                setSoilCategories(soilCategories);
            } catch (error) {
                console.error("Failed to fetch soil data on page load:", error);
            }
        };

        fetchSoilInfo();
    }, []);

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
                const data = await response.json();
                const cropArray = Object.entries(data).map(([id, name]) => ({
                    id,
                    name: String(name),
                }));
                cropArray.unshift({ id: "__all__", name: "All" });
                setCrops(cropArray);
                setAllCrops(cropArray.map((crop) => crop.name));
            } catch (error) {
                console.error("Failed to fetch all crops:", error);
            }
        };
        fetchAllCrops();
    }, []);

    // Fetch crop requiered machinery when crops are selected
    useEffect(() => {
        const selectedCropIds = crops
            .filter((crop) => selectedCrops.includes(crop.name))
            .map((crop) => crop.id);

        const fetchMachinery = async () => {
            const updatedMap: Record<string, string[]> = { ...machineryByCropId };
            for (const id of selectedCropIds) {
                try {
                    const response = await fetch(
                        `http://localhost:8000/api/crop-machinery?id=${id}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    const data = await response.json();
                    updatedMap[id] = data;
                    setMachinery((prev) => [...new Set([...prev, ...data])]);
                } catch (error) {
                    console.error("Failed to fetch machinery for crop", id, error);
                }

                if (selectedCropIds.includes("__all__")) return;
            }
            setMachineryByCropId(updatedMap);
        };
        if (selectedCropIds.length > 0) {
            fetchMachinery();
        }
    }, [selectedCrops, crops]);

    // Delete machinery when crops are unselected
    useEffect(() => {
        const selectedIds = crops
            .filter((crop) => selectedCrops.includes(crop.name))
            .map((crop) => crop.id);

        const allMachines = selectedIds.flatMap(
            (id) => machineryByCropId[id] || []
        );

        const unique = Array.from(new Set(allMachines));

        setMachinery(unique);
    }, [selectedCrops, machineryByCropId, crops]);

    // Handle polygon creation on the map
    const handlePolygonCreate = async (coords) => {
        if (!coords || coords.length === 0) return;

        const { lat, lng } = getCentroid(coords);
        console.log("Centroid coordinates:", { lat, lng });
        setCoordinates({ lat, lng})
        console.log("coordinates:", coordinates);

        const geojson: Feature<Polygon> = {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        ...coords.map((p) => [p.lng, p.lat]),
                        [coords[0].lng, coords[0].lat],
                    ],
                ],
            },
            properties: {},
        };

        // Calculation of total acres of field
        const areaM2 = turf.area(geojson);
        const areaInAcres = areaM2 / 1000;
        areaInAcres.toFixed(2)
        setArea(areaInAcres);

        try {
            // Fetch suitable crops
            const response = await fetch("http://localhost:8000/api/suggest-crops", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ lat, lng }),
            });
            const { suitable_crops } = await response.json();
            const names = suitable_crops.map((crop) => crop.name);
            setSuggestedCropsCrops(["All", ...names]);
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
            lng: lngSum / coords.length,
        };
    };

    const handleSubmit = async () => {
        const cleanedCrops = [
            ...new Set([...selectedSuggestedCrops, ...selectedCrops]),
        ].filter((crop) => crop !== "All");
        const payload = {
            crops: cleanedCrops,
            coordinates: coordinates,
            area: area,
            soil_type: texture,
            irrigation: irrigation,
            fertilization: fertilization,
            spraying: spraying,
            n: nitrogenValue,
            p: phosphorusValue,
            k: potassiumValue,
            ph: pHValue,
            machinery: selectedMachinery,
            past_crops: [pastYearCrop3, pastYearCrop2, pastYearCrop1].filter(Boolean),
            effective_pairs: effectivecropPairs.filter(
                (pair) => pair.crop1 && pair.crop2
            ),
            uneffective_pairs: uneffectiveCropPairs.filter(
                (pair) => pair.crop1 && pair.crop2
            ),
            years: years,
        };

        console.log("Payload to be sent:", payload);

        try {
            const res = await fetch("http://localhost:8000/api/rotation-plan", {
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
                        <Text variant="secondary_title" color="white" as="h2">
                            Tell us about your field, and we'll tell you what to grow next -
                            smarter soil, happier harvest!
                        </Text>
                    </div>
                    <div className={style.image_box}>
                        <img src={cropRotationImage} alt="hands" className={style.image} />
                    </div>
                </div>
                <div className={style.calligraphic}>
                    <Text variant="calligraphic_title" color="white" as="h3">
                        Let's rotate it right!
                    </Text>
                </div>
            </section>

            {/* Section for field information */}
            <section className={style.field_info_container}>
                {/* Map drawing section */}
                <div className={style.field_info_box}>
                    <Text variant="secondary_title" color="black" as="h2">
                        Map Your Field.
                    </Text>
                    <div className={style.map}>
                        <PolygonMap
                            onPolygonCreate={(latlon) => handlePolygonCreate(latlon)}
                        />
                    </div>
                </div>

                {/* Suggested crops */}
                {suggestedCrops.length > 0 && (
                    <div className={style.field_info_box}>
                        <Text variant="secondary_title" color="black" as="h2">
                            Smart Crop Picks
                        </Text>

                        <div className={style.checkBox_container}>
                            <CheckBox
                                items={suggestedCrops}
                                selected={selectedSuggestedCrops}
                                setSelected={setSelectedSuggestedCrops}
                            />
                        </div>
                    </div>
                )}

                {/* All crops */}
                <div className={style.field_info_box}>
                    <Text variant="secondary_title" color="black" as="h2">
                        Pick Your Own
                    </Text>

                    <div className={style.checkBox_container}>
                        <CheckBox
                            items={allCrops}
                            selected={selectedCrops}
                            setSelected={setSelectedCrops}
                        />
                    </div>
                </div>

                {/* Machinery section */}
                {machinery.length > 0 && (
                    <div className={style.field_info_box}>
                        <Text variant="secondary_title" color="black" as="h2">
                            Required Machinery
                        </Text>
                        <div className={style.checkBox_container}>
                            <CheckBox
                                items={machinery}
                                selected={selectedMachinery}
                                setSelected={setSelectedMachinery}
                            />
                        </div>
                    </div>
                )}

                {/* Rotation plan duration section */}
                <div className={style.field_info_box}>
                    <Text variant="secondary_title" color="black" as="h2">
                        How many years do you want to be your rotation plan?
                    </Text>
                    <input
                        type="range"
                        min="3"
                        max="15"
                        value={years}
                        onChange={handleYearsChange}
                        className={style.spinner}
                    />
                    <Text variant="main_text" color="black" as="p">
                        {years} years
                    </Text>
                </div>

                {/*Soil info */}
                <div className={style.field_info_box}>
                    <Text variant="secondary_title" color="black" as="h2">
                        Enter your soil information
                    </Text>
                    <div className={style.soil_info_container}>
                        <div className={style.soil_info_box}>
                            <Text variant="label" color="black" as="label">
                                Texture
                            </Text>
                            <select
                                value={texture}
                                onChange={(e) => setTexture(e.target.value)}
                                className={style.select_input}
                            >
                                <option>Select texture</option>
                                {soilCategories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={style.soil_info_box}>
                            <Text variant="label" color="black" as="label">
                                Irrigation
                            </Text>
                            <select
                                value={irrigation}
                                onChange={(e) => setIrrigation(Number(e.target.value))}
                                className={style.select_input}
                            >
                                {optionsIrrigation.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={style.soil_info_container}>
                        <div className={style.soil_info_box}>
                            <Text variant="label" color="black" as="label">
                                Fertilization
                            </Text>
                            <select
                                value={fertilization}
                                onChange={(e) => setFertilization(Number(e.target.value))}
                                className={style.select_input}
                            >
                                {optionsFertilization.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={style.soil_info_box}>
                            <Text variant="label" color="black" as="label">
                                Crop spraying
                            </Text>
                            <select
                                value={spraying}
                                onChange={(e) => setSpraying(Number(e.target.value))}
                                className={style.select_input}
                            >
                                {optionsSpraying.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={style.soil_info_container}>
                        <div className={style.soil_info_box}>
                            <Text variant="label" color="black" as="label">
                                Nitrogen
                            </Text>
                            <input
                                value={nitrogenValue}
                                onChange={(e) => setNitrogenValue(e.target.value)}
                                type="text"
                                className={style.soi_inputs}
                                placeholder="0.0 g/kg "
                            />
                        </div>
                        <div className={style.soil_info_box}>
                            <Text variant="label" color="black" as="label">
                                Potassium
                            </Text>
                            <input
                                value={potassiumValue}
                                onChange={(e) => setPotassiumValue(e.target.value)}
                                type="text"
                                className={style.soi_inputs}
                                placeholder="0.0 mg/kg "
                            />
                        </div>
                    </div>
                    <div className={style.soil_info_container}>
                        <div className={style.soil_info_box}>
                            <Text variant="label" color="black" as="label">
                                Phosphorus
                            </Text>
                            <input
                                value={phosphorusValue}
                                onChange={(e) => setPhosphorusValue(e.target.value)}
                                type="text"
                                className={style.soi_inputs}
                                placeholder="0.0 mg/kg"
                            />
                        </div>
                        <div className={style.soil_info_box}>
                            <Text variant="label" color="black" as="label">
                                pH
                            </Text>
                            <input
                                value={pHValue}
                                onChange={(e) => setPHValue(e.target.value)}
                                type="text"
                                className={style.soi_inputs}
                                placeholder="0.0"
                            />
                        </div>
                    </div>
                </div>

                {/* Past crops section */}
                <div className={style.field_info_box}>
                    <Text variant="secondary_title" color="black" as="h2">
                        Add your last 3 years of crops to help with rotation planning
                    </Text>
                    <select
                        value={pastYearCrop3}
                        onChange={(e) => setPastYearCrop3(e.target.value)}
                        className={style.select_input}
                        style={{ marginBottom: "1.5rem" }}
                    >
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
                        style={{ marginBottom: "1.5rem" }}
                    >
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
                        style={{ marginBottom: "1.5rem" }}
                    >
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
                    <Text variant="secondary_title" color="black" as="h2">
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
                            onDelete={deleteEffectiveCropPair}
                        />
                    ))}
                    <button onClick={addEffectiveCropPair} className={style.add_button}>
                        + Add Crops
                    </button>
                </div>

                {/* Uneffective crop sequence section */}
                <div className={style.field_info_box}>
                    <Text variant="secondary_title" color="black" as="h2">
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
                            onDelete={deleteUneffectiveCropPair}
                        />
                    ))}
                    <button onClick={addUneffectiveCropPair} className={style.add_button}>
                        + Add Crops
                    </button>
                </div>
                <button className={style.submit_button} onClick={handleSubmit}>
                    Submit
                </button>
            </section>
        </>
    );
};

export default RotationPlan;
