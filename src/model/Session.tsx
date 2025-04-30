/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import { Workout } from "@/model/Workout";

export interface Session {
	id: number;
	date: string;
	name: string;
	description?: string;
	createdAt: string;
	modifiedAt: string;
    workouts: Array<Workout>;
    userId: 0;
}

export const defaultSession: Session = {
    id: 0,
    date: '',
    name: '',
    description: '',
    createdAt: '',
    modifiedAt: '',
    userId: 0,
    workouts: []
};
