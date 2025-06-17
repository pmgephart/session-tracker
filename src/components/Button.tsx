/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import Link from "next/link";

interface ButtonProps {
    text: string;
    size: string;
    width: string;
    style: string;
}

const Button: FC<ButtonProps> = ({ text, size, width, style }): JSX.Element => {
    let layout = {
        size: "md",
        style: "dark",
        width: ''
    };

    switch(size) {
        case "sm":
            layout.size = "text-sm";
            break;
        case "md":
            layout.size = "text-md";
            break;
        case "lg":
            layout.size = "text-lg";
            break;

    }

    if(width === "full") {
        layout.width = "w-full";
    }

    if(style === "light") {
        layout.style = "light";
    }

    return (
        <button type="submit" className={`st-action ${layout.size} ${layout.width} ${layout.style}`}>
            <span>{text}</span>
        </button>
    );
};

export default Button;