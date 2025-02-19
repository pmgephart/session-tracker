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

const SESSION_INITIAL_STATE = {
    id: 0,
    name: '',
    description: '',
    date: '',
    userId: 0,
    workouts: []
};

export default function Session({ activities }) {
    const router = useRouter();
    const id = router.query.id;

    const [error, setError] = useState('');
    const [session, setSession] = useState(SESSION_INITIAL_STATE);

    function handleChange(event) : void {
        setSession({ ...session, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) : void => {
        event.preventDefault();

        
    }

    async function getSession(id: int) : {} {
        if(!id) {
            return;
        }

        const response = await fetch(`/api/session?id=${id}`);
        const result = await response.json();

        if(result.session === null) {
            setError("Session not found");
            return;
        }

        setSession(result.session);
    }

    useEffect(() => {
        getSession(id);
    }, [id]);

    if(error) {
        return (
            <div className="text-center">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <SessionForm session={session} activities={activities} handleChange={handleChange} handleSubmit={handleSubmit} key={session.id} />
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

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: false
    }
}