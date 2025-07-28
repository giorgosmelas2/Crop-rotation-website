import { useState, useEffect } from 'react';
import { Text } from "../components/Text";
import flowerIcon from '../assets/sunflower.png';
import leafIcon from '../assets/leaf.png';
import wheatIcon from '../assets/wheat.png';

const LoadingIcon = () => {
  const icons = [flowerIcon, leafIcon, wheatIcon];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % icons.length);
    }, 600);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="flex justify-center items-center mt-4">
        <Text
            variant="main_text"
            color="black"
            as="p">
            Δόσε μας λίγο χρόνο και το πλάνο σου θα βρίσκεται στον λογαριασμό σου!
         </Text>
      <img
        src={icons[index]}
        alt="Loading"
        style={{ width: '7rem', height: '7rem' }}
      />
    </div>
  );
};

export default LoadingIcon;