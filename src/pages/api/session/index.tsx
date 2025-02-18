import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/util/db';

type ResponseData = {
	message: "",
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

			if(!session) {
				throw "Session does not exist";
			}

			return res.status(200).json({
				message: "success",
				session: session
			});
		}
		catch(error) {
			res.status(400).json({
				message: error,
				session: {}
			});
		}
	}
}