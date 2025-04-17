import React, { useEffect, useState } from "react";
import style from "../styling/checkbox.module.css";
import { Text } from "./Text";

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

const chunkArray = (arr: string[], size: number): string[][] => {
  const result: string[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};


export const CheckBox: React.FC = () => {
  const [chunkSize, setChunkSize] = useState<number>(5); // Default chunk size

  useEffect(() => {
    const updateChunkSize = () => {
      if (window.innerWidth < 768) {
        setChunkSize(2); // Adjust chunk size for mobile
      } else {
        setChunkSize(5); // Reset chunk size for larger screens
      }
    }

    updateChunkSize(); // Call on component mount
    window.addEventListener('resize', updateChunkSize); // Add event listener for window resize

    return () => window.removeEventListener("resize", updateChunkSize); // Cleanup event listener on unmount
  }, []);

  const chunkedCrops = chunkArray(crops, chunkSize); // Adjust the size as needed (5 crops per row)

  return (
    <>
      <div className={style.checkBox_container}>
        {chunkedCrops.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className={style.checkBox_chunk}>
            {chunk.map((crop, cropIndex) => (
              <div key={cropIndex} className={style.checkBox_item}>
                <input type="checkbox" id={crop} name={crop} />
                <Text
                  variant="label"
                  color="black"
                  as="label">
                  {crop}
                </Text>
              </div>
            ))}
          </div>
        ))
        }
      </div>
    </>
  );
}