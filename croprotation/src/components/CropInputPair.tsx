import React, { useState } from "react";
import style from "../styling/cropInputPair.module.css";
import binImage from "../assets/bin.png";
import arrowImage from "../assets/arrow.png";
import { Text } from "./Text";

const CropInputPair = ({ index, value1, value2, value, crops, onChange, onValueChange, onDelete, whichPair }) => {
    
    const effectiveLabels = {
        1: "Good",
        2: "Very good",
        3: "Excellent",
    }

    const uneffectiveLabels = {
        1: "Bad",
        2: "Very bad",
        3: "Miserable",
    }

    return (
        <>
            <div className={style.crop_pair}>
                <select
                    value={value1}
                    onChange={(e) => onChange(index, 0, e.target.value)}
                    className={style.crop_input}>
                    <option value="">Select Crop</option>
                    {crops.map((crop) => (
                        <option key={crop} value={crop}>
                            {crop}
                        </option>
                    ))}
                </select>
                <div className={style.icon_wrapper}>
                    <img src={arrowImage} alt="Delete" className={style.icon} />
                </div>
                <select
                    value={value2}
                    onChange={(e) => onChange(index, 1, e.target.value)}
                    className={style.crop_input}>
                    <option value="">Select Crop</option>
                    {crops.map((crop) => (
                        <option key={crop} value={crop}>
                            {crop}
                        </option>
                    ))}
                </select>
                <button onClick={() => onDelete(index)} className={style.delete_button}>
                    <img src={binImage} alt="Delete" className={style.delete_icon} />
                </button>
            </div>
            <div>
                <input
                    type="range"
                    min="1"
                    max="3"
                    step="1"
                    className={style.spinner}
                    value={value}
                    onChange={(e) => onValueChange(index, Number(e.target.value))} />
            </div>
            <Text
                variant="label"
                color="black"
                as="label">
                {whichPair === "effective" ? effectiveLabels[value] : uneffectiveLabels[value]}
            </Text>
        </>
    )
}

export default CropInputPair;
