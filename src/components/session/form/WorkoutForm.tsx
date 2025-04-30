/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import { FaPlusCircle } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

const WorkoutForm = ({ workout, index, activities, handleWorkoutChange, deleteWorkout }) => {
	return (
		<div className="workout rounded border p-5 mb-5 text-sm">
            <div className="w-full pb-5">
                <label htmlFor="workoutActivity" className="block pb-2">Activity</label>
                <select
                    id={`workoutActivityId-${index}`}
                    defaultValue={workout.activityId ? workout.activityId : ''}
                    onChange={(event) => handleWorkoutChange(event, index, "activityId")}
                    className="w-full bg-white rounded block border p-2.5"
                >
                    {activities.map((activity) => (
                    <option value={activity.id} key={activity.id}>{activity.name}</option>
                    ))}
                </select>
            </div>
            <div className="w-full pb-5">
                <label htmlFor="workoutDescription" className="block pb-2">Description</label>
                <textarea
                    id={`workoutDescription-${index}`}
                    value={workout.description ? workout.description : ''}
                    onChange={(event) => handleWorkoutChange(event, index, "description")}
                    className="w-full bg-white rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                />
            </div>
            <div className="flex gap-4">
	            <div className="w-1/2 pb-5">
	                <label htmlFor="workoutSets" className="block pb-2">Sets</label>
	                <input
	                    type="text"
	                    id={`workoutSets-${index}`}
	                    value={workout.sets ? workout.sets : ''}
	                    onChange={(event) => handleWorkoutChange(event, index, "sets", true)}
	                    className="w-full bg-white rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                        integer="1"
	                />
	            </div>
	            <div className="w-1/2 pb-5">
	                <label htmlFor="workoutReps" className="block pb-2">Reps</label>
	                <input
	                    type="text"
	                    id={`workoutReps-${index}`}
	                    value={workout.reps ? workout.reps : ''}
	                    onChange={(event) => handleWorkoutChange(event, index, "reps", true)}
	                    className="w-full bg-white rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                        integer="1"
	                />
	            </div>
	        </div>
            <div className="flex gap-4">
                <div className="w-1/2 pb-5">
                    <label htmlFor="workoutWeight" className="block pb-2">Weight</label>
                    <input
                        type="text"
                        id={`workoutWeight-${index}`}
                        value={workout.weight ? workout.weight : ''}
                        onChange={(event) => handleWorkoutChange(event, index, "weight", true)}
                        className="w-full bg-white rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                        integer="1"
                    />
                </div>
                <div className="w-1/2 pb-5">
                    <label htmlFor="workoutDuration" className="block pb-2">Duration</label>
                    <input
                        type="text"
                        id={`workoutDuration-${index}`}
                        value={workout.duration ? workout.duration : ''}
                        onChange={(event) => handleWorkoutChange(event, index, "duration")}
                        className="w-full bg-white rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                    />
                </div>
            </div>
            <div className="w-full">
                <button className="st-action w-full" onClick={(event) => deleteWorkout(event, index)}>
                    <FaDeleteLeft />
                    <span>delete workout</span>
                </button>
            </div>
        </div>
	);
}

export default WorkoutForm;
