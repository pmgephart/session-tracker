import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/util/db';

type ResponseData = {
	error: boolean,
	activities: []
}

export default async function handler (
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	try {
		const activities = await prisma.activity.findMany({
			orderBy: {
				name: "asc"
			}
		});

		res.status(200).json(activities);
	}
	catch(error) {
		res.status(400).json([]);
	}
}