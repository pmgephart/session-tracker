/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import Link from "next/link";
import { useEffect, useState, memo } from "react";
import { format } from "date-fns";

const Activities = () => {
    const [activities, setActivities] = useState([]);

    const getActivities = async () => {
        const response = await fetch(`api/activities`);
        const result = await response.json();

        setActivities(result);
    }

    useEffect(() => {
        getActivities();
    }, []);

	return (
		<>
			<div className="mt-5 rounded text-left border">
				<main className="flex flex-col gap-8 p-5 text-sm">
					<div>
						<h3 className="pb-5">activities</h3>
						{activities && activities.length ? (
						<ul>
							{activities.map((activity) => (
							<li key={activity.id} className="st-session-item p-3 rounded">
								<p>{activity.name}</p>
							</li>
							))}
						</ul>
						) : (
						<p>No activities found</p>
						)}
					</div>
				</main>
			</div>
		</>
	);
};

export default Activities;