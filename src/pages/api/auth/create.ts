import type { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { prisma } from "@/util/db";
import { createUser } from "@/util/user";
import { hashPassword } from "@/util/crypt";
import { UserSessionData, defaultUserSession, userSessionOptions } from "@/model/UserSession";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method !== "POST") {
        return res.status(405).end();
    }

    try {
        const { email, firstName, lastName, password, confirmPassword } = req.body;

        // check for errors in data
        let errors: string[] = [];

        if(email === '') {
            errors.push({
                field: "email",
                error: "Your email is a required field"
            });
        }

        if(firstName === '') {
            errors.push({
                field: "firstName",
                error: "Your first name is a required field"
            });
        }

        if(password === '') {
            errors.push({
                field: "password",
                error: "Your password is a required field"
            });
        }

        if(confirmPassword === '') {
            errors.push({
                field: "confirmPassword",
                error: "You must confirm your password"
            });
        }

        if(password !== confirmPassword) {
            errors.push({
                field: "confirmPassword",
                error: "Your passwords do not match"
            });
        }

        // check for user with requested email address
        const duplicateUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(duplicateUser) {
            errors.push({
                field: "email",
                error: `A user with email "${email}" already exists`
            });
        }

        if(errors.length) {
            throw new AggregateError(errors, "An error occurred while attempting to create your account");
        }

        const encryptedPassword = await hashPassword(password);
        const user = await createUser(email, firstName, lastName, encryptedPassword, true);

        res.status(200).json({
            id: user.id
        });
    }
    catch(error) {
        if(error instanceof AggregateError) {
            res.status(400).json({
                message: error.message,
                errors: error.errors
            });
        }

        res.status(400).json({
            error
        });
    }
}