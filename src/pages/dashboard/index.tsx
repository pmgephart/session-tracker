"use client";

import { react, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Navigation from "@/components/Navigation";
import Welcome from "@/components/Welcome";
import Sessions from "@/components/dashboard/Sessions";

export default function Dashboard() {
    const router = useRouter();
    const id = 1;
    const [user, setUser] = useState({});

    async function getUser(id: int) : {} {
        const response = await fetch(`api/user/${id}`);
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
        <>
            <Navigation />
            <Sessions sessions={user.sessions} />
        </>
    );
}