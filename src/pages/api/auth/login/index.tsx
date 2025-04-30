import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/util/db";
import { getIronSession } from "iron-session";


export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
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

            delete user.password;

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