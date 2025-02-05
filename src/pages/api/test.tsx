import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../util/db';

type ResponseData = {
	message: string
}

export default function handler (
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	console.log(db);

	res.status(200).json({
		message: "You are above the crux!"
	});
}