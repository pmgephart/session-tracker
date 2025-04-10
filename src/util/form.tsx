export function handleSessionChange(event, field) : void {
    let value = event.target.value;

    if(field === "date") {
        value = parseISO(value);
    }

    setSession({ ...session, [field]: value });
}

export function handleWorkoutChange(event, index, field) : void {
    let workouts = [...session.workouts];
    let workout = {
        ...workouts[index],
        [field]: event.target.value
    }

    workouts[index] = workout;

    setSession(prev => ({
        ...session,
        workouts: workouts
    }));
}

export function addWorkout(event) : void {
    event.preventDefault();

    setSession(prev => ({
        ...session,
        workouts: [...session.workouts, WORKOUT_INITIAL_STATE]
    }));
}

export function deleteWorkout(event, target) : void {
    event.preventDefault();

    const filtered = session.workouts.filter((item, index) => index !== target);

    setSession(prev => ({
        ...session,
        workouts: filtered
    }));
}