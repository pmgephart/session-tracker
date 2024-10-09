/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import path from "path";
import sqlite3 from "sqlite3";

const dbPath = path.join(process.cwd(), "session-tracker.sqlite");

/**
 * define sqlite db instance
 */
export const db = new sqlite3.Database(
	dbPath,
	sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
	(error) => {
		if(error) {
			console.error(error.message);
		}

		console.log("Connected the the Session Tracker database.");
	}
);

/**
 * sqlite db get
 * 
 * @param string query
 * 
 * @return Promise
 */
export const get = async (query: string) => {
	return await new Promise((resolve, reject) => {
		db.all(query, (error: Error, row) => {
			if(error) {
				console.log(error);
				reject(error);
			}

			resolve(row);
		});
	});
};

/**
 * sqlite db post
 * 
 * @param string query
 * @param array values
 * 
 * @return Promise
 */
export const post = async (query: string, values: string[]) => {
	return await new Promise((resolve, reject) => {
		db.run(query, values, function(error) {
			if(error) {
				console.log(error);
				reject(error);
			}

			resolve(null);
		})
	});
}