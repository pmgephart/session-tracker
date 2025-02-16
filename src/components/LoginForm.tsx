/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import { react, memo } from "react";

const LoginForm = memo(() => {
  return (
    <div className="grid items-center justify-items-center font-[family-name:var(--font-geist-mono)]">
      <main className="rounded-md p-5 bg-slate-100 flex flex-col gap-8 p-8 row-start-2 items-center sm:items-start">
        <form>
          <div className="w-full max-w-sm min-w-[200px] pb-5">
            <input className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow" type="text" placeholder="username" id="username" key="username" />
          </div>
          <div className="w-full max-w-sm min-w-[200px] pb-5">
            <input className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow" type="text" placeholder="password" id="password" key="password" />
          </div>
          <button type="submit" className="w-full bg-slate-500 text-slate-100 text-sm border rounded-md px-3 py-2">login</button>
        </form>
      </main>
    </div>
  );
});

export default LoginForm;