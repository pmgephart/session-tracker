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
import { useUser } from "@/contexts/UserContext";

import Activities from "@/components/dashboard/Activities";
import Sessions from "@/components/dashboard/Sessions";

export default function Dashboard({ activities }) {
    const { user, loading } = useUser();
    const router = useRouter();
    
    return (
        <div className="st-dashboard">
            {user && ((
            <Sessions sessions={user.sessions} loading={loading} />
            ))}
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
