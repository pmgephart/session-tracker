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

const Navigation = memo(() => {
  return (
    <div className="pb-5 flex max-w-md items-center justify-items-center text-center m-auto">
      <div className="st-navigation grid grid-flow-col auto-cols-max gap-4 text-sm">
          <a href="/dashboard" className="rounded p-3">dashboard</a>
          <a href="/dashboard/session/" className="rounded p-3">sessions</a>
          <a href="/dashboard/profile/" className="rounded p-3">profile</a>
      </div>
    </div>
  );
});

export default Navigation;