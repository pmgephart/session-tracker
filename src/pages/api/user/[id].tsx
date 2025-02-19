import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/util/db';

type ResponseData = {
	error: boolean,
	message: string,
	user: {}
}

export default async function handler (
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	try {
		const userId = parseInt(req.query.id);

		if(!userId) {
			throw "User ID is missing";
		}

		const user = await prisma.user.findUnique({
			where: {
				id: userId
			},
			include: {
				sessions: {
					include: {
						workouts: {
							include: {
								activity: true
							}
						}
					}
				}
			}
		});

		if(!user) {
			throw "User does not exist";
		}

		res.status(200).json({
			error: false,
			message: "success",
			user: user
		});
	}
	catch(error) {
		res.status(200).json({
			error: true,
			message: error,
			user: {}
		});
	}
}