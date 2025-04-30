/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

export interface Activity {
    id: bigint;
    name: string;
}

export const defaultActivity: Activity = {
    id: 0,
    name: ""
};
