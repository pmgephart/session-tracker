/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaPlusCircle } from "react-icons/fa";
import { format } from "date-fns";

import Form from "next/form";
import SessionForm from "@/components/session/form/SessionForm";

export default function Session({ activities }) {
    const router = useRouter();
    const id = router.query.id;

    const [error, setError] = useState('');
    const [session, setSession] = useState({
        name: '',
        description: '',
        date: '',
        workouts: []
    });

    function handleChange(event) : void {
        setSession({ ...session, [event.target.name]: event.target.value });
    }

    return (
        <SessionForm session={session} activities={activities} handleChange={handleChange} />
    );
}

export async function getStaticProps() {
    const response = await fetch(`http://localhost:3000/api/activities`);
    const activities = await response.json();

    return {
        props: {
            activities
        }
    }
}