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
import Head from "next/head";
import Button from "@/components/Button";
import Errors from "@/components/Errors";
import LoadingScreen from "@/components/LoadingScreen";
import Title from "@/components/Title";

const CreateForm = memo(() => {
    const router = useRouter();
    
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    async function createUser(event: FormEvent<HTMLFormElement>) : void {
        event.preventDefault();

        setErrors([]);
        setIsLoading(true);

        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const firstName = data.get("firstName");
        const lastName = data.get("lastName");
        const password = data.get("password");
        const confirmPassword = data.get("confirmPassword");

        const response = await fetch(`/api/auth/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                firstName,
                lastName,
                password,
                confirmPassword
            })
        });

        const result = await response.json();

        if(!response.ok) {
            setErrors(result.errors);
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
        router.push("/dashboard");
    }

    return (
        <Form className="st-form" onSubmit={createUser}>
            <Head>
                <title>Create user account</title>
            </Head>
            <Title
                type="h3"
                text="Create User Account"
            />
            <div className="rounded text-left border mb-5">
                <main className="p-5 text-sm">
                    <Errors
                        errors={errors}
                    />
                    <div className="w-full pb-5">
                        <label htmlFor="email" className="block pb-2">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                        />
                    </div>
                    <div className="w-full pb-5">
                        <label htmlFor="password" className="block pb-2">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                        />
                    </div>
                    <div className="w-full pb-5">
                        <label htmlFor="password" className="block pb-2">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                        />
                    </div>
                    <div className="w-full pb-5">
                        <label htmlFor="password" className="block pb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                        />
                    </div>
                    <div className="w-full pb-5">
                        <label htmlFor="password" className="block pb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
                        />
                    </div>
                    <Button
                        text="create account"
                        width="full"
                    />
                </main>
                {isLoading &&
                <LoadingScreen />
                }
            </div>
        </Form>
    );
});

export default CreateForm;
