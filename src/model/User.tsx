/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

export interface User {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	active: boolean;
	createdAt: string;
	updatedAt: string;
    sessions: Array<Session>
}