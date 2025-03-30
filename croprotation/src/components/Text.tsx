import React, { Children } from "react";
import clsx from "clsx"

type Props = {
    variant?: 'header_title' | 'button_text' | 'main_title' | 'secondary_title' | 'main_text' | 'box_title' | 'box_text';
    color?: 'header_title' | 'button_text' | 'main_title' | 'secondary_title' | 'main_text' | 'box_title' | 'box_text' ;
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
    header_title: '#ffffff',
    button_text: '#ffffff',
    main_title: '#233f36',
    secondary_title: '#ffffff',
    main_text: '#000000',
    box_title: '#ffffff',
    box_text: '#ffffff',
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
    color = 'main_text',
    fontSize = "1em",
    children,
    as: Component = 'p',
}: Props) => {
    return (
        <Component
            style={{
                cursor: Component === "h1" ? "pointer" : undefined,
                fontFamily: fontFamilies[variant],
                color: colors[variant],
                fontSize: fontSizes[variant],
            }}>
            {children}
        </Component>
    );
};