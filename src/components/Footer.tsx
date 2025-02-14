/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import {
	React,
	memo
} from "react";

const Header = memo(() => {
  return (
    <>
      <footer className="st-footer pt-5 items-center justify-items-center text-center">
        <a href="/dashboard">dashboard</a>
      </footer>
    </>
  );
});

export default Header;