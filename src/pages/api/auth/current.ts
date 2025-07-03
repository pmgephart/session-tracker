import type { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { prisma } from "@/util/db";
import { UserSessionData, defaultUserSession, userSessionOptions } from "@/model/UserSession";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "GET") {
        try {
            const session = await getIronSession<UserSessionData>(req, res, userSessionOptions);

            if(!session.user) {
                return res.status(200).json({
                    user: null
                });
            }

            const user = await prisma.user.findUnique({
                where: {
                    email: session.user.email
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

            return res.status(200).json({
                user: user
            });
            
        }
        catch(error) {
            res.status(400).json({
                message: error
            });
        }
    }
}