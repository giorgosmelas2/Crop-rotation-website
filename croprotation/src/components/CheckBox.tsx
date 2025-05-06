import React, { useEffect, useState } from "react";
import style from "../styling/checkbox.module.css";
import { Text } from "./Text";

type CheckBoxProps = {
  crops: string[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ crops, selected, setSelected }) => {
  const [chunkSize, setChunkSize] = useState<number>();

  // Effect to set chunk size based on screen width
  useEffect(() => {
    const updateChunkSize = () => {
      setChunkSize(window.innerWidth < 768 ? 2 : 5); // Adjust chunk size based on screen width
    }

    updateChunkSize(); // Call on component mount
    window.addEventListener('resize', updateChunkSize); // Add event listener for window resize

    return () => window.removeEventListener("resize", updateChunkSize); // Cleanup event listener on unmount
  }, []);

  const displayedCrops = crops.length > 0 ? ["All crops", ...crops] : []; // Add "All crops" to the beginning of the crops array if it has elements

  const chunkArray = (arr: string[]): string[][] => {
    const result: string[][] = [];
    const size = Math.floor(arr.length / 5); //Calculate chunk size based on the number of crops`
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const chunkedCrops = chunkArray(displayedCrops); // Use the chunkArray function to split the crops into chunks

  const handleCheckboxChange = (crop: string) => {
    if (crop === "All crops") {
      if (selected.length === crops.length) {
        setSelected([]);
      } else {
        setSelected(crops);
      }
    } else {
      const newSelected = selected.includes(crop)
        ? selected.filter((c) => c !== crop)
        : [...selected, crop];

      setSelected(newSelected);
    }
  }

  const isChecked = (crop: string) => {
    if (crop === "All crops") {
      return selected.length === crops.length;
    }
    return selected.includes(crop);
  };

  return (
    <>
      <div className={style.checkBox_container}>
        {chunkedCrops.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className={style.checkBox_chunk}>
            {chunk.map((crop, cropIndex) => (
              <div key={cropIndex} className={style.checkBox_item}>
                <input
                  type="checkbox"
                  id={crop}
                  name={crop}
                  checked={isChecked(crop)}
                  onChange={() => handleCheckboxChange(crop)} />
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