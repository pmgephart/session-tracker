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

const Welcome = memo(({ user }) => {
  return (
    <>
      <div className="rounded shadow-md text-left">
        <main className="flex flex-col gap-8 p-10">
          <p>Welcome {user.firstName}!</p>
        </main>
      </div>
    </>
  );
});

export default Welcome;