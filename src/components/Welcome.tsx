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
      <div className="grid items-center justify-items-center pt-5 font-[family-name:var(--font-geist-mono)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <p>Welcome {user.firstName}!</p>
        </main>
      </div>
    </>
  );
});

export default Welcome;