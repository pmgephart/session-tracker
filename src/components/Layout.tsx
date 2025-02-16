/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import { react, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

import localFont from "next/font/local";
import "@/app/globals.css";

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

export default function Layout({ children }: Readonly<{children: React.ReactNode;}>) {
  const router = useRouter();
  const id = 1;
  const [user, setUser] = useState({});

  async function getUser(id: int) : {} {
      const response = await fetch(`/api/user/${id}`);
      const result = await response.json();

      if(result.error) {
          router.push("/login");
      }

      setUser(result.user);
  }

  useEffect(() => {
      getUser(id);
  }, [id]);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} max-w-md m-auto antialiased font-[family-name:var(--font-geist-mono)]`}>
      <Header user={user} />
      <main className="pt-5 pr-5 pl-5 pb-[104px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}