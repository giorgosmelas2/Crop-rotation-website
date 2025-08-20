import React, { Children } from "react";

// Text component for rendering styled text elements
type Props = {
    variant?:   
        'header_title' |
        "header_button_text" |
        'button_text' |
        'main_title' |
        'calligraphic_title' |
        'secondary_title' |
        'main_text' |
        'box_title' |
        'box_text' |
        'small_text' |
        "label";
    color?: 'white' | 'black' | 'green' | 'red';
    fontSize?: string;
    children: React.ReactNode;
    as?: React.ElementType;
    className?: string;
    style?: React.CSSProperties;
};

const fontFamilies = {
    header_title: "'GFS Didot', 'Noto Serif Display', 'Noto Serif', serif",
    header_button_text: "'GFS Didot', 'Noto Serif', serif",
    button_text: "'Roboto', 'GFS Neohellenic', 'Noto Sans', system-ui, -apple-system, Arial, sans-serif",
    main_title: "'Noto Serif Display', 'GFS Didot', 'Noto Serif', serif",
    calligraphic_title: "'GFS Didot', 'Noto Serif Display', 'Noto Serif', serif", 
    secondary_title: "'Noto Serif', 'GFS Didot', serif",
    main_text: "'Noto Serif', 'GFS Neohellenic', serif",
    box_title: "'Noto Serif', 'GFS Didot', serif",
    box_text: "'Roboto', 'GFS Neohellenic', 'Noto Sans', sans-serif",
    small_text: "'Roboto', 'GFS Neohellenic', 'Noto Sans', sans-serif",
    label: "'Roboto', 'GFS Neohellenic', 'Noto Sans', sans-serif",
};


const colors = {
    white: '#ffffff',
    black: '#000000',
    green: '#3b4d35',
    red: '#ff0000',
};

const fontSizes = {
    header_title: 'clamp(2rem, 4vw, 3.8rem)',
    header_button_text: 'clamp(1.1rem, 2vw, 1.7rem)',
    button_text: 'clamp(1rem, 1.4vw, 1.4rem)',
    main_title: 'clamp(1.2rem, 6vw, 4rem)',
    calligraphic_title: 'clamp(1.9rem, 2.6vw, 2.2rem)',
    secondary_title: 'clamp(1.8rem, 3vw, 2.5rem)',
    main_text: 'clamp(1rem, 3.5vw, 1.7rem)',
    box_title: 'clamp(1.5rem, 2.5vw, 1.9rem)',
    box_text: 'clamp(1.2rem, 2vw, 1.2rem)',
    small_text: 'clamp(1.2rem, 2vw, 1.2rem)',
    label: 'clamp(1.1rem, 1.5vw, 1.4rem)'
};

export const Text = ({
    variant = 'main_text',
    color = 'white',
    children,
    as: Component = 'p',
}: Props) => {
    return (
        <Component
            style={{
                cursor: Component === "h1" ? "pointer" : undefined,
                fontFamily: fontFamilies[variant],
                color: colors[color],
                fontSize: fontSizes[variant],
            }}>
            {children}
        </Component>
    );
};