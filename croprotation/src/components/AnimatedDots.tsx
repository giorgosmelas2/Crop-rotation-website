import React, {useEffect, useState} from "react"

const AnimatedDots = () => {
    const [dots, setDots] = useState("");

    useEffect(() => {
        let count = 0;
        const interval = setInterval(() => {
            count = (count + 1) % 4;
            setDots(".".repeat(count));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return<span>{dots}</span>;
}

export default AnimatedDots;