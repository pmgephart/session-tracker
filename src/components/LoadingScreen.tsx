/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import { memo } from "react";

const LoadingScreen = memo(({ text = '' }) => {
    const loadingText = text !== '' ? text : "loading...";

    return (
        <div className="st-loading-screen">
            <div className="st-loading-spinner"></div>
            <p className="mt-5">{loadingText}</p>
        </div>
    );
});

export default LoadingScreen;