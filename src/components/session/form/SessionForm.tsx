/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import { memo, useState, useEffect, useRef } from "react";
import { FaPlus, FaSave } from "react-icons/fa";
import { format } from "date-fns";
import { toast } from "react-toastify";

import { useSession } from "@/hooks/useSession";

import Form from "next/form";
import Head from "next/head";
import LoadingScreen from "@/components/LoadingScreen";
import Title from "@/components/Title";
import WorkoutForm from "@/components/session/form/WorkoutForm";

const SessionForm = ({ id, type, activities }) => {
    const [formLoading, setFormLoading] = useState(false);
    const { session, dispatch, error, sessionLoading } = useSession(id);

    const title = type == "update" ? `${session.name} | Session Tracker` : "Create Session | Session Tracker";
    const formTitle = type == "update" ? "Update Session" : "Create Session";

    async function updateSession(event) : void {
        setFormLoading(true);

        event.preventDefault();

        const response = await toast.promise(
            fetch(`/api/session`, {
                method: "PUT",
                body: JSON.stringify(session)
            }),
            {
                pending: "Updating session...",
                success: "Session updated",
                error: "An error has occurred. Please try again."
            },
            {
                autoClose: 1500
            }
        );
        
        const result = await response.json();

        setFormLoading(false);
    }

    async function createSession(event) : void {
        setFormLoading(true);

        event.preventDefault();

        const response = await toast.promise(
            fetch(`/api/session`, {
                method: "POST",
                body: JSON.stringify(session)
            }),
            {
                pending: "Creating session...",
                success: "Session created",
                error: "An error has occurred. Please try again."
            },
            {
                autoClose: 1500
            }
        );
        
        const result = await response.json();

        setFormLoading(false);
    }

    function handleChange(event, field) : void {
        let value = event.target.value;

        if(field === "date") {
            value = parseISO(value);
        }

        dispatch({
            type: "updateProp",
            field: field,
            value: value
        });
    }

    function handleWorkoutChange(event, index, field) : void {
        let workouts = [...session.workouts];
        let value = event.target.value;

        if(field == "activityId") {
            value = parseInt(value);
        }

        let workout = {
            ...workouts[index],
            [field]: value
        }

        workouts[index] = workout;

        dispatch({
            type: "updateWorkouts",
            workouts: workouts
        });
    }

    function addWorkout(event) : void {
        event.preventDefault();

        dispatch({ type: "addWorkout" });
    }

    function deleteWorkout(event, target) : void {
        event.preventDefault();

        const filtered = session.workouts.filter((item, index) => index !== target);

        dispatch({
            type: "updateWorkouts",
            workouts: filtered
        });
    }

    if(error) {
        return (
            <div>
                <Head>
                    <title>{error}</title>
                </Head>
                <div className="text-center">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <Form className="st-form" onSubmit={type == "update" ? updateSession : createSession}>
            <Head>
                <title>{title}</title>
            </Head>
            <Title
                type="h3"
                text={formTitle}
            />
            <div className="rounded text-left border mb-5">
                <main className="p-5 text-sm">
                    <div className="w-full pb-5">
                        <label htmlFor="sessionDate" className="block pb-2">Date</label>
                        <input
                            type="date"
                            id="sessionDate"
                            defaultValue={session.date ? format(session.date, "yyyy-MM-dd") : ''}
                            onChange={(event) => handleChange(event, "date")}
                            className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                        />
                    </div>
                    <div className="w-full pb-5">
                        <label htmlFor="sessionName" className="block pb-2">Name</label>
                        <input
                            type="text"
                            id="sessionName"
                            value={session.name}
                            onChange={(event) => handleChange(event, "name")}
                            className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                        />
                    </div>
                    <div className="w-full pb-5">
                        <label htmlFor="sessionDescription" className="block pb-2">Description</label>
                        <textarea
                            id="sessionDescription"
                            value={session.description}
                            onChange={(event) => handleChange(event, "description")}
                            className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                        />
                    </div>
                </main>
            </div>
            <Title
                type="h3"
                text="Workouts"
            />
            <div className="mb-5 text-sm">
                <button className="st-action w-full" onClick={addWorkout}>
                    <FaPlus />
                    <span>add workout</span>
                </button>
            </div>
            {!session.workouts.length &&
            <div className="workout rounded border p-5 mb-5 text-sm">
                <p>No workouts found</p>
            </div>
            } 
            {session.workouts.map((workout, index) => (
            <WorkoutForm
                workout={workout}
                index={index}
                activities={activities}
                handleWorkoutChange={handleWorkoutChange}
                deleteWorkout={deleteWorkout}
                key={workout.id}
            />
            ))}
            <div className="text-sm">
                <button type="submit" className="st-action w-full">
                    <FaSave />
                    <span>save</span>
                </button>
            </div>
            {sessionLoading &&
            <LoadingScreen
                text="loading session..."
            />
            }
            {formLoading &&
            <LoadingScreen />
            }
        </Form>
    );
}

export default SessionForm;
