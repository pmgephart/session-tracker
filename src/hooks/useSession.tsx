/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import { useState, useReducer, useEffect } from "react";
import { defaultSession} from "@/model/Session";
import { defaultWorkout } from "@/model/Workout";

function sessionReducer(state, action: string): void {
    switch(action.type) {
        case "update":
            return action.session;
        case "updateProp":
            return { ...state, [action.field]: action.value };
        case "updateWorkouts":
            return {
                ...state,
                workouts: action.workouts
            };
        case "addWorkout":
            return {
                ...state,
                workouts: [...state.workouts, defaultWorkout]
            };
        default:
            return state;
    }
}

export function useSession(id: int): void {
    const [session, dispatch] = useReducer(sessionReducer, defaultSession);
    const [error, setError] = useState('');
    const [sessionLoading, setSessionLoading] = useState(false);

    async function getSession(id: int) : {} {
        setSessionLoading(true);

        if(!id) {
            return;
        }

        const response = await fetch(`/api/session?id=${id}`);
        const result = await response.json();

        if(result.session === null) {
            setError("Session not found");
            return;
        }

        dispatch({
            type: "update",
            session: result.session
        });

        setSessionLoading(false);
    }

    useEffect(() => {
        getSession(id);
    }, [id]);

    return { session, dispatch, error, sessionLoading };
}
