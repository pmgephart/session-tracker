/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import { memo } from "react";

const Title = memo(({ text, type }) => {
    if(type === "h1") {
        return (
            <h1 className="st-title">{text}</h1>
        );
    }

    if(type === "h2") {
        return (
            <h2 className="st-title">{text}</h2>
        );
    }

    if(type === "h3") {
        return (
            <h3 className="st-title">{text}</h3>
        );
    }

    if(type === "h4") {
        return (
            <h4 className="st-title">{text}</h4>
        );
    }

    return (
        <p className="st-title"><strong>{text}</strong></p>
    );
});

export default Title;