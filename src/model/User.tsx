/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import { Session } from "@/model/Session";

export interface User {
	id: number;
	email: string;
	firstName: string;
	lastName?: string;
    password: string;
	active: boolean;
	createdAt?: string;
	updatedAt?: string;
    sessions?: Array<Session>
}

export const defaultUser: User = {
    id: 0;
    email: '';
    firstName: '',
    lastName: '',
    password: '',
    active: false,
    createdAt: '',
    updatedAt: '',
    sessions: []
};
