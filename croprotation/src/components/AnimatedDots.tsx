import { useEffect, useState } from "react";

// AnimatedDots component that displays a loading animation with dots
const AnimatedDots = () => {
  const [count, setCount] = useState(0);

  // Increment the count every 500ms to animate the dots
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 3) {
          clearInterval(interval); 
          return prev;
        }
        return prev + 1;
      });
    }, 500);

    return () => clearInterval(interval); 
  }, []);

  return (
    <span style={{ display: "inline-block", width: "2ch", textAlign: "left" }}>
      {["", ".", "..", "..."][count]}
    </span>
  );
};

export default AnimatedDots;
