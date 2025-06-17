/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import Navigation from "@/components/Navigation";

const Footer: FC = (): JSX.Element => {
    return (
        <footer className="st-footer p-5 static fixed bottom-0 right-0 left-0 max-w-md m-auto bg-white border-t-4 border-solid border-black">
            <Navigation />
        </footer>
    );
};

export default Footer; 