/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import Link from "next/link";
import { react, memo } from "react";
import { format } from "date-fns";

const Sessions = ({ sessions }) => {
	return (
		<>
			<div className="pb-5 mx-auto text-center">
				<div className="st-action text-sm">
					<Link href="/dashboard/session" className="rounded p-3 block">add session</Link>
				</div>
			</div>
			<div className="rounded text-left border">
				<main className="p-5 text-sm">
					<div>
						<h3 className="pb-5">recent sessions</h3>
						{sessions && sessions.length ? (
						<ul>
							{sessions.map((session) => (
							<li key={session.id} className="st-session-item p-3 rounded">
								<p className="pb-2 font-bold">
									<Link href={`/dashboard/session/${session.id}`}>
										{format(session.date, "M-d-yyyy")} - {session.name}
									</Link>
								</p>
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
		</>
	);
};

export default Sessions;