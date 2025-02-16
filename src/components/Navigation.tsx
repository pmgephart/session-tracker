/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import Link from "next/link";
import { react, memo } from "react";

const Navigation = memo(() => {
  return (
    <div className="st-navigation flex gap-4 text-xs max-w-full text-center">
      <Link href="/dashboard" className="flex-1 rounded p-3">dashboard</Link>
      <Link href="/dashboard/session/" className="flex-1 rounded p-3">sessions</Link>
      <Link href="/dashboard/profile/" className="flex-1 rounded p-3">profile</Link>
      <Link href="/user/logoout" className="flex-1 rounded p-3">logout</Link>
    </div>
  );
});

export default Navigation;