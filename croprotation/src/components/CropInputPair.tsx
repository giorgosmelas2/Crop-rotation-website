import React from "react";
import style from "../styling/cropInputPair.module.css";
import binImage from "../assets/bin.png";
import arrowImage from "../assets/arrow.png";

const CropInputPair = ({ index, value1, value2, onChange, onDelete }) => {
    const crops = [
        "All",
        "Wheat",
        "Barley",
        "Corn",
        "Rice",
        "Cotton",
        "Sugar beet",
        "Sunflower",
        "Rapeseed",
        "Alfalfa",
        "Silage Corn",
        "Pea",
        "Lentil",
        "Bean",
        "Peanut",
        "Potato",
        "Tomato",
        "Cucumber",
        "Pepper",
        "Eggplant",
        "Onion",
        "Garlic",
        "Watermelon",
        "Melon",
        "Zucchini",
        "Vineyard",
        "Olive",
        "Kiwi",
        "Citrus",
        "Pomegranate",
        "Almond",

    ];

    return (
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
    )
}

export default CropInputPair;
