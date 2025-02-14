import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/util/db';

type ResponseData = {
	error: boolean,
	sessions: []
}

export default async function handler (
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	try {
		const sessions = await prisma.session.findMany({
			include: {
				workouts: {
					include: {
						activity: true
					}
				}
			}
		});

		res.status(200).json({
			error: false,
			sessions: sessions
		});
	}
	catch(error) {
		res.status(400).json({
			error: true,
			sessions: []
		});
	}
}