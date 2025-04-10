export type Session = {
	id: number;
	date: string;
	name: string;
	description: string;
	createdAt: string;
	modifiedAt: string;
	workouts: Workout[];
}

export const SESSION_INITIAL_STATE = {
    id: 0,
    name: '',
    description: '',
    date: '',
    userId: 0,
    workouts: []
};

export const WORKOUT_INITIAL_STATE = {
    id: 0,
    activityId: '',
    description: '',
    sets: '',
    reps: '',
    weight: '',
    duration: ''
};