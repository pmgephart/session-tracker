import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/util/db';

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "POST") {
        try {
            const { username, password } = req.body;

            return res.status(200).json({
                session: session});
        }
        catch(error) {
            res.status(400).json({
                session: null
            });
        }
    }
}