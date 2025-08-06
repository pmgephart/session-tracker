import type { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { prisma } from "@/util/db";
import { comparePasswords } from "@/util/crypt";
import { UserSessionData, userSessionOptions } from "@/model/UserSession";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    let errors: string[] = [];
    const session = await getIronSession<UserSessionData>(req, res, userSessionOptions);

    if(req.method === "POST") {
        try {
            const { email, password } = req.body;

            if(email === '') {
                errors.push({
                    field: "email",
                    error: "Your email is a required field"
                });
            }

            if(password === '') {
                errors.push({
                    field: "password",
                    error: "Your password is a required field"
                });
            }

            if(errors.length) {
                throw new AggregateError(errors);
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
                errors.push({
                    field: "email",
                    error: `A user with email "${email}" was not found`
                });
            }
            else {
                // make sure passwords match
                const passwordsMatch = await comparePasswords(password, user.password);

                if(!passwordsMatch) {
                    errors.push({
                        field: "password",
                        error: "Your password is invalid"
                    });
                }
            }

            if(errors.length) {
                throw new AggregateError(errors);
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
            if(error instanceof AggregateError) {
                return res.status(400).json({
                    message: "An error occurred while attempting to log in to your account",
                    errors: error.errors
                });
            }

            return res.status(400).json({
                error
            });
        }
    }
}