/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

interface LoadingScreenProps {
    text: string
}

const LoadingScreen: FC<LoadingScreenProps> = ({ text = '' }): JSX.Element => {
    const loadingText = text !== '' ? text : "loading...";

    return (
        <div className="st-loading-screen">
            <div className="st-loading-spinner"></div>
            <p className="mt-5">{loadingText}</p>
        </div>
    );
};

export default LoadingScreen;