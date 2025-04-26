/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import { memo, useState, FormEvent } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import Form from "next/form";
import LoadingScreen from "@/components/LoadingScreen";

const LoginForm = memo(() => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function login(event: FormEvent<HTMLFormElement>) : void {
        event.preventDefault();
        setIsLoading(true);

        const data = new FormData(event.currentTarget);
        const username = data.get("username");
        const password = data.get("password");

        const response = await toast.promise(
            fetch(`/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password})
            }),
            {
                pending: "Updating session...",
                success: "Session updated",
                error: "An error has occurred. Please try again."
            },
            {
                autoClose: 1500
            }
        );
        
        const result = await response.json();

        console.log(result);

        setIsLoading(false);
    }

    return (
        <div className="rounded text-left border mb-5">
            <main className="p-5 text-sm">
                <Form className="st-form" onSubmit={login}>
                    <div className="w-full pb-5">
                        <label htmlFor="username" className="block pb-2">username</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                        />
                    </div>
                    <div className="w-full pb-5">
                        <label htmlFor="password" className="block pb-2">password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                        />
                    </div>
                    <div className="text-sm">
                        <button type="submit" className="st-action w-full">
                            <span>login</span>
                        </button>
                    </div>
                </Form>
            </main>
            
            <LoadingScreen />
            
        </div>
    );
});

export default LoginForm;
