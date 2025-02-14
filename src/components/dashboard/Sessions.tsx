/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import { react, memo } from "react";
import { format } from "date-fns";

const Sessions = ({ sessions }) => {
	return (
		<div className="rounded text-left border">
			<main className="flex flex-col gap-8 p-5 text-sm">
				<div>
					<h3 className="pb-5">recent sessions</h3>
					{sessions && sessions.length ? (
					<ul>
						{sessions.map((session) => (
						<li key={session.id} className="st-session-item p-3 rounded">
							<p className="pb-2"><strong><a href="/dashboard/session/">{format(session.date, "M-d-yyyy")} - {session.name}</a></strong></p>
							<p>{session.description}</p>
						</li>
						))}
					</ul>
					) : (
					<p>No recent sessions</p>
					)}
				</div>
			</main>
		</div>
	);
};

export default Sessions;