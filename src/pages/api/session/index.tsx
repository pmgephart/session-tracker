import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/util/db';

type ResponseData = {
	session: {}
}

export default async function handler (
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if(req.method === "GET") {
		try {
			const id = parseInt(req.query.id);

			if(!id) {
				throw "Session ID is missing";
			}

			const session = await prisma.session.findUnique({
				where: {
					id: id
				},
				include: {
					workouts: {
						include: {
							activity: true
						}
					}
				}
			});

			return res.status(200).json({
				session: session
			});
		}
		catch(error) {
			res.status(400).json({
				session: null
			});
		}
	}

	if(req.method === "PUT") {
		try {
			const session = JSON.parse(req.body);
			const id = parseInt(session.id);

			if(!id) {
				throw "Session ID is missing";
			}

			console.log(session);

			const updateSession = await prisma.session.update({
				where: {
					id: id
				},
				data: {
					name: session.name,
					description: session.description,
					date: session.date,
					workouts: {
						update: {
							where
						}
					}
				}
			});

			console.log(updateSession);

			res.status(200).json({
				session: updateSession
			});
		}
		catch(error) {
			console.log(error);

			res.status(400).json({
				session: null
			});
		}
	}
}