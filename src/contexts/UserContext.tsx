/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "@/model/User";

type UserContextType = {
    user: User;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        current();
    }, []);

    async function current() {
        const response = await fetch(`/api/auth/current`);
        const result = await response.json();

        if(result.error) {
            setLoading(false);
            return;
        }

        setUser(result.user);
        setLoading(false);
    }

    async function login(email: string, password: string) {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if(response.ok) {
            setUser(result.user);
        }
        else {
            throw result.errors;
        }
    }

    async function logout() {
        await fetch("/api/auth/logout", {
            method: "POST"
        });
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, loading, current, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);

    if(!context) {
        throw new Error('useUser must be used within UserProvider');
    }

    return context;
};
