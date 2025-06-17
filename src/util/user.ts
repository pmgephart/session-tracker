/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import { User } from "@/model/User";
import { prisma } from "@/util/db";

export async function createUser(user: {}){
    const newUser = await prisma.user.create({
        data: {
            user
        }
    });

    return user;
}

export function updateUser(user: {}): void {

}