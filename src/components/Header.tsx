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
      <div className="grid items-center justify-items-center pt-5 font-[family-name:var(--font-geist-mono)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <header className="st-header">
          	<div className="logo">
          		<img src="https://abovethecrux.com/wp-content/uploads/2023/08/above-the-crux-logo.png" alt="Session Tracker" width="100" />
          	</div>
            <h2>Session Tracker</h2> 
          </header>
        </main>
      </div>
    </>
  );
});

export default Header;