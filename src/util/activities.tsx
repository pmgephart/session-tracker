export function getActivites() {
    const response = await fetch(`http://localhost:3000/api/activities`);
    const activities = await response.json();

    return activities;
}
