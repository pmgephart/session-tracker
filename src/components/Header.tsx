/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import {
	react,
	memo
} from "react";

const Header = memo(() => {
  return (
    <header className="st-header p-5 flex flex-col max-w-md items-center justify-items-center text-center m-auto">
      <div class="flex flex-row items-center">
      	<img src="https://abovethecrux.com/wp-content/uploads/2023/08/above-the-crux-logo.png" alt="Session Tracker" width="100" />
        <h2 className="pl-5" >Session Tracker</h2>
      </div>
    </header>
  );
});

export default Header;