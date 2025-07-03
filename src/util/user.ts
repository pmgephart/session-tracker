/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { prisma } from "@/util/db";
import { User } from "@/model/User";
import { UserSessionData, userSessionOptions } from "@/model/UserSession";

export async function createUser(email: string, firstName: string, lastName: string, password: string, active: boolean): Promise<User> {
    const user = await prisma.user.create({
        data: {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            active: true
        }
    });

    return user;
}

export async function getUserSession(req, res) {
    const session = await getIronSession<UserSessionData>(req, res, userSessionOptions);

    if(!session.loggedIn) {
        return null;
    }

    if(!session.user) {
        return null;
    }

    return session.user;
}

export function updateUser(user: {}): void {

}