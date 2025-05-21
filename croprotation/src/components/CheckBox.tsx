import React, { useEffect, useState } from "react";
import style from "../styling/checkbox.module.css";
import { Text } from "./Text";
import { a } from "framer-motion/client";


type CheckBoxProps = {
  items: string[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ items, selected, setSelected }) => {
  const [chunkSize, setChunkSize] = useState<number>(2); // Default chunk size

  // Effect to set chunk size based on screen width
  useEffect(() => {
    const updateChunkSize = () => {
      setChunkSize(window.innerWidth < 768 ? 2 : 4); // Adjust chunk size based on screen width
    }

    updateChunkSize(); // Call on component mount
    window.addEventListener('resize', updateChunkSize); // Add event listener for window resize

    return () => window.removeEventListener("resize", updateChunkSize); // Cleanup event listener on unmount
  }, []);

  
  
  const chunkArray = (arr: string[]): string[][] => {
    const chunks: string[][] = [];
    const size = Math.floor(arr.length / chunkSize); //Calculate chunk size based on the number of crops`
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  // Use the chunkArray function to split the items into chunks
  const chunkedCrops = chunkArray(items);  

  // Function to handle checkbox change
  const handleCheckboxChange = (item: string) => {
    setSelected(
      selected.includes(item) 
      ? selected.filter(i => i!== item) 
      : [...selected, item]);
  }

  const isChecked = (item: string) => selected.includes(item);

  return (
    <>
      <div className={style.checkBox_container}>
        {chunkedCrops.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className={style.checkBox_chunk}>
            {chunk.map(item => (
              <div key={item} className={style.checkBox_item}>
                <input
                  type="checkbox"
                  id={`chk-${item}`}
                  checked={isChecked(item)}
                  onChange={() => handleCheckboxChange(item)} />
                <Text
                  variant="label"
                  color="black"
                  as="label">
                  {item}
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