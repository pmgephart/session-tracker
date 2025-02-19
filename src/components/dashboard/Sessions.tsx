/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import { react, memo } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { format } from "date-fns";

import Link from "next/link";

const Sessions = ({ sessions }) => {
	return (
		<>
			<div className="pb-5 mx-auto text-center">
				<div className="text-sm">
					<Link href="/dashboard/session" className="st-link">
						<span>add session</span>
						<FaPlusCircle />
					</Link>
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