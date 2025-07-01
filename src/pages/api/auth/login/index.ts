import type { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { prisma } from "@/util/db";
import { UserSessionData, userSessionOptions } from "@/model/UserSession";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getIronSession<UserSessionData>(req, res, userSessionOptions);

    if(req.method === "POST") {
        try {
            const { email, password } = req.body;

            if(!email || !password) {
                throw "Username and password are required fields";
            }

            const user = await prisma.user.findUnique({
                where: {
                    email: email
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
                throw "Invalid email and/or password";
            }

            let validPassword = true;

            if(password !== user.password) {
                validPassword = false;
            }

            if(!validPassword) {
                throw "Invalid email and/or password";
            }

            delete user.password; // no need for this here

            // handle session
            session.loggedIn = true;
            session.email = email;
            session.user = user;

            await session.save();

            console.log(session);

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