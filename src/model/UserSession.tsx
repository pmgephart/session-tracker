/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import { SessionOptions } from "iron-session";
import { User } from "@/components/User";

export interface UserSessionData {
    email: string;
    loggedIn: boolean;
    user: User;
}

export const defaultUserSession: UserSessionData = {
    email: '',
    loggedIn: false,
    user: null
};

export const userSessionOptions: SessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "session-tracker-cookie",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true : false
    }
};
