import type { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { prisma } from "@/util/db";
import { UserSessionData, userSessionOptions } from "@/model/UserSession";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const session = await getIronSession<UserSessionData>(req, res, userSessionOptions);

        await session.destroy();

        res.redirect(303, "/login");
    }
    catch(error) {
        res.status(400).json({
            message: error
        });
    }
}