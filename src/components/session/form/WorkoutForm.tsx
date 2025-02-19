/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import { memo } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

const WorkoutForm = ({ workout, activities, handleChange, deleteWorkout }) => {
	return (
		<div className="workout rounded border p-5 mb-5">
            <div className="w-full pb-5">
                <label htmlFor="activity" className="block pb-2">Activity</label>
                <select name="activity" id="activity" className="w-full bg-white rounded block border p-2.5" defaultValue={workout.activityId ? workout.activityId : ''}>
                    {activities.map((activity) => (
                    <option value={activity.id} key={activity.id}>{activity.name}</option>
                    ))}
                </select>
            </div>
            <div className="w-full pb-5">
                <label htmlFor="workoutDesc" className="block pb-2">Description</label>
                <textarea
                    name="workoutDesc"
                    value={workout.description ? workout.description : ''}
                    onChange={handleChange}
                    className="w-full bg-white rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                />
            </div>
            <div className="flex gap-4">
	            <div className="w-1/2 pb-5">
	                <label htmlFor="workoutSets" className="block pb-2">Sets</label>
	                <input
	                    type="text"
	                    name="workoutSets"
	                    value={workout.sets ? workout.sets : ''}
	                    onChange={handleChange}
	                    className="w-full bg-white rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
	                />
	            </div>
	            <div className="w-1/2 pb-5">
	                <label htmlFor="workoutDesc" className="block pb-2">Reps</label>
	                <input
	                    type="text"
	                    name="workoutReps"
	                    value={workout.reps ? workout.reps : ''}
	                    onChange={handleChange}
	                    className="w-full bg-white rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
	                />
	            </div>
	        </div>
            <div className="w-full pb-5">
                <label htmlFor="workoutDesc" className="block pb-2">Weight</label>
                <input
                    type="text"
                    name="workoutWeight"
                    value={workout.weight ? workout.weight : ''}
                    onChange={handleChange}
                    className="w-full bg-white rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                />
            </div>
            <div className="w-full pb-5">
                <label htmlFor="workoutDuration" className="block pb-2">Duration</label>
                <input
                    type="text"
                    name="workoutDuration"
                    value={workout.duration ? workout.duration : ''}
                    onChange={handleChange}
                    className="w-full bg-white rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                />
            </div>
            <div className="w-full">
                <button className="st-action w-full" onClick={deleteWorkout}>
                    <span>delete workout</span>
                    <FaDeleteLeft />
                </button>
            </div>
        </div>
	);
}

export default WorkoutForm;