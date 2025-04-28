/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActivities } from "@/hooks/useActivities";

import Activities from "@/components/dashboard/Activities";
import Sessions from "@/components/dashboard/Sessions";

const USER_INITIAL_STATE = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    active: false,
    sessions: []
};

export default function Dashboard({ activities }) {
    const router = useRouter();

    const id = 1;
    const [user, setUser] = useState(USER_INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    
    async function getUser(id: int) : {} {
        setLoading(true);

        const response = await fetch(`api/user/${id}`);
        const result = await response.json();

        if(result.error) {
            router.push("/login");
        }

        setUser(result.user);
        setLoading(false);
    }

    useEffect(() => {
        getUser(id);
    }, [id]);
    
    return (
        <div className="st-dashboard">
            <Sessions sessions={user.sessions} loading={loading} />
            <Activities activities={activities}/>
        </div>
    );
}

export async function getStaticProps() {
    const activities = await useActivities();
    
    return {
        props: {
            activities
        }
    }
}