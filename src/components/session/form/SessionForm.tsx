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

const SessionForm = ({ session, activities, handleChange, handleWorkoutChange, handleSubmit, addWorkout, deleteWorkout }) => {
    return (
        <Form className="st-form" onSubmit={handleSubmit}>
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
                    <div className="w-full pb-2">
                        <label className="block pb-2">Workouts</label>
                    </div>
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