/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import { defaultActivity } from "@/model/Activity";

export interface Workout {
    id: bigint;
    description?: string;
    sets?: bigint;
    reps?: bigint;
    duration?: string;
    weight?: bigint;
    activityId: bigint;
    activity: Activity;
}

export const defaultWorkout: Workout = {
    id: 0,
    description: '',
    sets: 0,
    reps: 0,
    weight: 0,
    duration: '',
    activityId: 0,
    activity: null
};
