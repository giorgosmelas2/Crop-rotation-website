import React, { useState, useEffect } from "react";
import { Text } from "../components/Text";
import { CheckBox } from "../components/CheckBox";
import  LoadingIcon  from "../components/Loading";
import { supabase } from "../lib/supabaseClient";
import toast from 'react-hot-toast';
import * as turf from "@turf/turf";
import type { Feature, Polygon } from "geojson";
import style from "../styling/rotationPlan.module.css";
import cropRotationImage from "../assets/crop_rotation.png";
import PolygonMap from "../components/PolygonMap";
import CropInputPair from "../components/CropInputPair";

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

    const [loading, setLoading] = useState(false);


    // Options for fertilization, irrigation, and spraying. The user selects an option 
    // and that option is converted to a coefficient for the prediction model

    const optionsFertilization = [
        { label: "Επιλογή", value: -1 },
        { label: "Καθόλου", value: 0 },
        { label: "Περιορισμένη", value: 1 },
        { label: "Καλή", value: 2 },
        { label: "Πλήρως", value: 3 }
    ]

    const optionsIrrigation = [
        { label: "Επιλογή", value: -1 },
        { label: "Καθόλου", value: 0 },
        { label: "Περιορισμένη", value: 1 },
        { label: "Καλή", value: 2 },
        { label: "Πλήρως", value: 3 }
    ]

    const optionsSpraying = [
        { label: "Επιλογή", value: -1 },
        { label: "Καθόλου", value: 0 },
        { label: "Περιορισμένος", value: 1 },
        { label: "Καλός", value: 2 },
        { label: "Πλήρως", value: 3 }
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
        setCoordinates({ lat, lng })
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
        const isLoggedIn = await checkUserLoggedIn();
        if (!isLoggedIn) {
            toast.error("Πρέπει να είσαι συνδεμένος στον λογαριασμό σου για να δεις το πλάνο αμειψισποράς σου");
            return;
        }

        setLoading(true);

        try {
            const {
                data: { user }
            } = await supabase.auth.getUser();

            if (!user) {
                toast.error("Δεν βρέθηκε χρήστης.");
                setLoading(false);
                return;
            }

            if (checkRotationValues()) {
                const cleanedCrops = [...new Set([...selectedSuggestedCrops, ...selectedCrops])]
                    .filter((crop) => crop !== "All");

                const payload = {
                    user_id: user.id,
                    crops: cleanedCrops,
                    coordinates,
                    area,
                    soil_type: texture,
                    irrigation,
                    fertilization,
                    spraying,
                    n: nitrogenValue,
                    p: phosphorusValue,
                    k: potassiumValue,
                    ph: pHValue,
                    machinery: selectedMachinery,
                    past_crops: [pastYearCrop2, pastYearCrop1].filter(Boolean),
                    effective_pairs: effectivecropPairs.filter(pair => pair.crop1 && pair.crop2),
                    uneffective_pairs: uneffectiveCropPairs.filter(pair => pair.crop1 && pair.crop2),
                    years,
                };

                const res = await fetch("http://localhost:8000/api/rotation-plan", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                const data = await res.json();
                console.log("Response from backend:", data);
                toast.success("Το πλάνο σου ειναι ετοιμο στον λογαριασμό σου!");
            } else {
                toast.error("Κάποια από τις τιμές που έδωσες δεν είναι έγκυρη!");
            }
        } catch (err) {
            console.error("Submission failed:", err);
            toast.error("Κάτι πήγε στραβά.");
        } finally {
            setLoading(false);
        }
    };

    const checkRotationValues = () => {
        const n = parseFloat(nitrogenValue)
        const p = parseFloat(phosphorusValue)
        const k = parseFloat(potassiumValue)
        const ph = parseFloat(pHValue)

        if (0 <= n && 0 <= p && 0 <= k && 0 <= ph && ph <= 14 && area != 0) {
            return true
        }
    }

    const checkUserLoggedIn = async () => {
        const {
            data: { session },
            error,
        } = await supabase.auth.getSession();

        if (session && session.user) {
            console.log('User is logged in:', session.user);
            return true;
        } else {
            console.log('User is NOT logged in');
            return false;
        }
    };

    return (
        <>
            {/* Section for the introduction */}
            <section className={style.green}>
                <div className={style.container}>
                    <div className={style.box}>
                        <Text variant="secondary_title" color="white" as="h2">
                            Εσύ δίνεις τα στοιχεία, εμείς δίνουμε τη σοδειά — έξυπνα χωράφια,
                            ικανοποιημένοι αγρότες!
                        </Text>
                    </div>
                    <div className={style.image_box}>
                        <img src={cropRotationImage} alt="hands" className={style.image} />
                    </div>
                </div>
                <div className={style.calligraphic}>
                    <Text variant="calligraphic_title" color="white" as="h3">
                        Πάμε για την πιο έξυπνη αμειψισπορά!
                    </Text>
                </div>
            </section>

            {/* Section for field information */}
            <section className={style.field_info_container}>
                {/* Map drawing section */}
                <div className={style.field_info_box}>
                    <Text variant="secondary_title" color="black" as="h2">
                        Πες μας πού σπέρνεις, να σου πούμε τι να κάνεις.
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
                            Οι καλλιέργειες που ταιριάζουν στο χωράφι σου
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
                        Διάλεξε τις καλλιέργειες που θες
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
                            Πες μας τι σου λείπει και θα το λάβουμε υπόψη.
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
                        Για πόσα χρόνια θέλεις να είναι το πλάνο αμειψισποράς σου;
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
                        {years} χρόνια
                    </Text>
                </div>

                {/*Soil info */}
                <div className={style.field_info_box}>
                    <Text variant="secondary_title" color="black" as="h2">
                        Πες μας λίγα πράγματα για το έδαφός σου
                    </Text>
                    <div className={style.soil_info_container}>
                        <div className={style.soil_info_box}>
                            <Text variant="label" color="black" as="label">
                                Υφή
                            </Text>

                            <select
                                value={texture}
                                onChange={(e) => setTexture(e.target.value)}
                                className={style.select_input}
                            >
                                <option> Επιλογή</option>
                                {soilCategories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={style.soil_info_box}>
                            <Text variant="label" color="black" as="label">
                                Άρδευση
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
                                Λίπανση
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
                                Ψεκασμός
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
                                Άζωτο
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
                                Κάλιο
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
                                Φώσφορος
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
                        Συμπλήρωσε τις προηγούμενες καλλιέργειες για πιο σωστό πλάνο αμειψισποράς
                    </Text>

                    <select
                        value={pastYearCrop2}
                        onChange={(e) => setPastYearCrop2(e.target.value)}
                        className={style.select_input}
                        style={{ marginBottom: "1.5rem" }}
                    >
                        <option>Πρόπερσι</option>
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
                        <option>Πέρυσι</option>
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
                        Πες μας ποια ακολουθία καλλιεργειών σου δούλεψε καλά
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
                        + Προσθήκη
                    </button>
                </div>

                {/* Uneffective crop sequence section */}
                <div className={style.field_info_box}>
                    <Text variant="secondary_title" color="black" as="h2">
                        Τι δεν πήγε όπως ήθελες; Ποια ακολουθία καλλιεργειών δεν σου δούλεψε καλά
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
                        + Προσθήκη
                    </button>
                </div>
                <button className={style.submit_button} onClick={handleSubmit}>
                    Υποβολή
                </button>

                {loading && <LoadingIcon />}
                
            </section>
        </>
    );
};

export default RotationPlan;
