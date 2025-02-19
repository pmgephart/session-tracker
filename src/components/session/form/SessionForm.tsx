/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import { memo, useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { format } from "date-fns";

import Form from "next/form";
import WorkoutForm from "@/components/session/form/WorkoutForm";

const SessionForm = ({ session, activities, handleChange, handleSubmit }) => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        if(session.workouts.length) {
            setWorkouts(session.workouts);
        }
    }, [session]);

    function addWorkout(event) : void {
        event.preventDefault();

        setWorkouts([...workouts, {
            id: workouts.length + 1,
            activityId: null,
            description: null,
            sets: null,
            reps: null,
            weight: null,
            duration: null
        }]);
    }

    function deleteWorkout(event) : void {
        e.preventDefault();
    }

    return (
        <Form className="st-form" onSubmit={handleSubmit}>
            <div className="rounded text-left border mb-5">
                <main className="p-5 text-sm">
                    <div className="w-full pb-5">
                        <label htmlFor="date" className="block pb-2">Date</label>
                        <input
                            type="date"
                            name="date"
                            defaultValue={session.date ? format(session.date, "yyyy-MM-dd") : ''}
                            onChange={handleChange}
                            className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                        />
                    </div>
                    <div className="w-full pb-5">
                        <label htmlFor="name" className="block pb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={session.name}
                            onChange={handleChange}
                            className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                        />
                    </div>
                    <div className="w-full pb-5">
                        <label htmlFor="description" className="block pb-2">Description</label>
                        <textarea
                            name="description"
                            value={session.description}
                            onChange={handleChange}
                            className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                        />
                    </div>
                    <div className="w-full pb-2">
                        <label className="block pb-2">Workouts</label>
                    </div>
                    {workouts.map((workout) => (
                    <WorkoutForm workout={workout} activities={activities} handleChange={handleChange} deleteWorkout={deleteWorkout} key={workout.id} />
                    ))}
                    <div>
                        <button className="st-action w-full" onClick={addWorkout}>
                            <span>add workout</span>
                            <FaPlusCircle />
                        </button>
                    </div>
                </main>
            </div>
            <div>
                <button type="submit" className="st-action w-full">save</button>
            </div>
        </Form>
    );
}

export default SessionForm;