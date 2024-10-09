/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import db from "./db";

export const migrate = () => {
	db.serialize(() => {
		db.run(
			`CREATE TABLE IF NOT EXISTS session (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				date INTEGER NOT NULL,
				name TEXT,
				description TEXT,
				created INTEGER,
				modified INTEGER
			);

			CREATE TABLE IF NOT EXISTS activity (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name TEXT NOT NULL,
				description TEXT
			);

			CREATE TABLE IF NOT EXISTS session_activity (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				session_id INTEGER NOT NULL,
				activity_id INTEGER NOT NULL
			)`,
			(error) => {
				if(error) {
					return console.error(error.message);
				}
			}
		)
	})
}