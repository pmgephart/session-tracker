/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import { memo } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { format } from "date-fns";

import LoadingScreen from "@/components/LoadingScreen";

import Link from "next/link";

const Sessions = ({ sessions, loading }) => {
    if(loading) {
        return (
            <LoadingScreen
                text="loading sessions..."
            />
        );
    }
	return (
		<div className="st-sessions-list">
			<div className="pb-5 mx-auto text-center">
				<div className="text-sm">
					<Link href="/dashboard/session/create" className="st-link">
						<span>add session</span>
						<FaPlusCircle />
					</Link>
				</div>
			</div>
			<div className="rounded text-left border">
				<main className="p-5 text-xs">
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
		</div>
	);
};

export default Sessions;