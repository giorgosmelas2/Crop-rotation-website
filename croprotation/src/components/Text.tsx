import React, { Children } from "react";
import clsx from "clsx"

type Props = {
    variant?: 'header_title' | 'button_text' | 'main_title' | 'secondary_title' | 'main_text' | 'box_title' | 'box_text';
    color?: 'white' | 'black' | 'green';
    fontSize?: string;
    children: React.ReactNode;
    as?: React.ElementType;
    className?: string;
};

const fontFamilies  = {
    header_title: "'Playfair Display', serif",
    button_text: "'Playfair Display', serif",
    main_title: "'Playfair Display', serif",
    secondary_title: "'Gloria Hallelujah', cursive",
    main_text: "Georgia, 'Times New Roman', Times, serif",
    box_title: "Georgia, 'Times New Roman', Times, serif",
    box_text: "Georgia, 'Times New Roman', Times, serif",
};

const colors  = {
    white: '#ffffff',
    black: '#000000',
    green: '#3b4d35',
};

const fontSizes = {
    header_title: 'clamp(0.5rem, 3.7vw, 3.8rem)',
    button_text: '1em',
    main_title: '3.5em',
    secondary_title: '2.5em',
    main_text: '1.5em',
    box_title: '1.5em',
    box_text: '1.2em',
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