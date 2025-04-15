/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

export async function useActivities() {
	const response = await fetch(`http://localhost:3000/api/activities`);
    
    return await response.json();
}