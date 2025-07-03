import type { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { prisma } from "@/util/db";
import { comparePasswords } from "@/util/crypt";
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
                throw `A user with email "${email}" was not found`;
            }

            // make sure passwords match
            const passwordsMatch = await comparePasswords(password, user.password);

            if(!passwordsMatch) {
                throw "Invalid username or password";
            }

            delete user.password; // no need for this here

            // handle session
            session.loggedIn = true;
            session.email = email;
            session.user = user;

            await session.save();

            return res.status(200).json({
                user: user
            });
        }
        catch(error) {
            console.log(error);
            res.status(400).json({
                message: error
            });
        }
    }
}