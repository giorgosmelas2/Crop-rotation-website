import React, { Children } from "react";
import clsx from "clsx"
import { small } from "framer-motion/client";

type Props = {
    variant?: 'header_title' | 'button_text' | 'main_title' | 'calligraphic_title' | 'secondary_title' | 'main_text' | 'box_title' | 'box_text' | 'small_text';
    color?: 'white' | 'black' | 'green';
    fontSize?: string;
    children: React.ReactNode;
    as?: React.ElementType;
    className?: string;
    style?: React.CSSProperties;
};

const fontFamilies  = {
    header_title: "'Playfair Display', serif",
    button_text: "'Playfair Display', serif",
    main_title: "'Playfair Display', serif",
    calligraphic_title: "'Gloria Hallelujah', cursive",
    secondary_title: "Georgia, 'Times New Roman', Times, serif",
    main_text: "Georgia, 'Times New Roman', Times, serif",
    box_title: "Georgia, 'Times New Roman', Times, serif",
    box_text: "Georgia, 'Times New Roman', Times, serif",
    small_text: "Georgia, 'Times New Roman', Times, serif",
};

const colors  = {
    white: '#ffffff',
    black: '#000000',
    green: '#3b4d35',
};

const fontSizes = {
    header_title: 'clamp(2rem, 4vw, 3.8rem)',
    button_text: 'clamp(1.1rem, 2vw, 1.7rem)',
    main_title: 'clamp(1.2rem, 6vw, 4rem)',
    calligraphic_title: 'clamp(1.3rem, 2.6vw, 2.2rem)',
    secondary_title: 'clamp(1.8rem, 3vw, 2.5rem)',
    main_text: 'clamp(1rem, 3.5vw, 1.7rem)',
    box_title: 'clamp(1.5rem, 2.5vw, 1.9rem)',
    box_text: 'clamp(1.2rem, 2vw, 1.2rem)',
    small_text: 'clamp(1.2rem, 2vw, 1.2rem)'
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