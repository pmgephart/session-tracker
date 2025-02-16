/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { react, memo } from "react";

const Header = memo(({ user }) => {
  return (
    <header className="st-header border-b-4 border-solid border-black p-5">
      <div className="flex items-center justify-center">
        <div className="w-1/3">
          <Link href="/">
            <Image src="/images/above-the-crux-logo.png" alt="Session Tracker" width="80" height="65" />
          </Link>
        </div>
        <div className="w-2/3 text-right">
          <h2>Session Tracker</h2>
          {user &&
          <p className="text-sm">{user.firstName} {user.lastName}</p>
          }
        </div>
      </div>
    </header>
  );
});

export default Header;