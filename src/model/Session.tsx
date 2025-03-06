export interface User = {
	id: number;
	
}

export type Session = {
	id: number;
	date: string;
	name: string;
	description: string;
	createdAt: string;
	modifiedAt: string;
	workouts: Workout[];
}

export const SESSION_INITIAL: Session = {
	id: 0,
	date: '',
	name: '',
	description: '',
	createdAt: '',
	modifiedAt: '',
	userId: 0,
	workouts: []
}