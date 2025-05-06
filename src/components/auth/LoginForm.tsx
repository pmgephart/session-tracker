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

import Form from "next/form";
import LoadingScreen from "@/components/LoadingScreen";

const LoginForm = memo(({ router }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function login(event: FormEvent<HTMLFormElement>) : void {
        event.preventDefault();

        setError('');
        setIsLoading(true);

        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");

        const response = await fetch(`/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password})
        });

        const result = await response.json();
        
        if(response.ok) {
            console.log(result);

            //router.push("/dashboard/profile");
        }

        //setError(result.message);

        setIsLoading(false);
    }

    return (
        <div className="rounded text-left border mb-5">
            <main className="p-5 text-sm">
                <Form className="st-form" onSubmit={login}>
                    <div className="w-full pb-5">
                        <label htmlFor="email" className="block pb-2">username</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                        />
                    </div>
                    <div className="w-full pb-5">
                        <label htmlFor="password" className="block pb-2">password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                        />
                    </div>
                    <div className="text-sm">
                        <button type="submit" className="st-action w-full">
                            <span>login</span>
                        </button>
                    </div>
                    {error &&
                    <div className="st-error rounded mt-3 p-3 text-xs bg-red-100 border-red-600 border-solid">
                        <p className="text-red-600">{error}</p>
                    </div>
                    }
                </Form>
            </main>
            {isLoading &&
            <LoadingScreen />
            }
        </div>
    );
});

export default LoginForm;
