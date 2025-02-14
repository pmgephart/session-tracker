/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import localFont from "next/font/local";
import "../app/globals.css";

import Header from "./Header";
import Footer from "./Footer";

const geistSans = localFont({
  src: "../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-mono)]`}>
        <Header />
        <main className="pl-5 pr-5 pb-5 flex flex-col max-w-md items-center justify-items-center text-center m-auto">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}