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
import { toast } from "react-toastify";

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

const WORKOUT_INITIAL_STATE = {
    id: 0,
    activityId: '',
    description: '',
    sets: '',
    reps: '',
    weight: '',
    duration: ''
};

export default function Session({ activities }) {
    const router = useRouter();
    const id = router.query.id;

    const [error, setError] = useState('');
    const [session, setSession] = useState(SESSION_INITIAL_STATE);

    function handleChange(event, field) : void {
        setSession({ ...session, [field]: event.target.value });
    }

    function handleWorkoutChange(event, index, field) : void {
        let workouts = [...session.workouts];
        let workout = {
            ...workouts[index],
            [field]: event.target.value
        }

        workouts[index] = workout;

        setSession(prev => ({
            ...session,
            workouts: workouts
        }));
    }

    function addWorkout(event) : void {
        event.preventDefault();

        setSession(prev => ({
            ...session,
            workouts: [...session.workouts, WORKOUT_INITIAL_STATE]
        }));
    }

    function deleteWorkout(event, target) : void {
        event.preventDefault();

        const filtered = session.workouts.filter((item, index) => index !== target);

        setSession(prev => ({
            ...session,
            workouts: filtered
        }));
    }

    async function handleSubmit(event) : void {
        event.preventDefault();

        const response = await fetch(`/api/session`, {
            method: "POST",
            body: JSON.stringify(session)
        });
        const result = await response.json();

        console.log(result);
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

    function notify(event) {
        event.preventDefault();

        toast('this worked');
    }

    if(error) {
        return (
            <div className="text-center">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <div>
                <a href="#" onClick={notify}>test me</a>
            </div>
            <SessionForm
                session={session}
                activities={activities}
                handleChange={handleChange}
                handleWorkoutChange={handleWorkoutChange}
                handleSubmit={handleSubmit}
                addWorkout={addWorkout}
                deleteWorkout={deleteWorkout}
            />
        </div>
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