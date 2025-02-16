/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import { react, memo } from "react";

import Navigation from "@/components/Navigation";

const Footer = memo(() => {
  return (
    <footer className="st-footer p-5 static fixed bottom-0 right-0 left-0 max-w-md m-auto bg-white border-t-4 border-solid border-black">
      <Navigation />
    </footer>
  );
});

export default Footer;