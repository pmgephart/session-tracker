import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/util/db';

type ResponseData = {
	error: boolean,
	user: {}
}

export default async function handler (
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	try {
		const user = await prisma.user.findMany({
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

		res.status(200).json({
			error: false,
			user: user
		});
	}
	catch(error) {
		res.status(400).json({
			error: true,
			user: {}
		});
	}
}