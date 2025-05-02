import React, { useEffect, useState } from "react";
import style from "../styling/checkbox.module.css";
import { Text } from "./Text";

type CheckBoxProps = {
  crops: string[];
}

const chunkArray = (arr: string[]): string[][] => {
  const result: string[][] = [];
  const size = Math.floor(arr.length / 5); //Calculate chunk size based on the number of crops`
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export const CheckBox: React.FC<CheckBoxProps> = ({crops}) => {
  const [chunkSize, setChunkSize] = useState<number>(); // Default chunk size

  useEffect(() => {
    const updateChunkSize = () => {
      setChunkSize(window.innerWidth < 768 ? 2 : 5); // Adjust chunk size based on screen width
    }

    updateChunkSize(); // Call on component mount
    window.addEventListener('resize', updateChunkSize); // Add event listener for window resize

    return () => window.removeEventListener("resize", updateChunkSize); // Cleanup event listener on unmount
  }, []);

  const chunkedCrops = chunkArray(crops); // Use the chunkArray function to split the crops into chunks

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