/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import { memo, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useUser } from "@/contexts/UserContext";

import Form from "next/form";
import Link from "next/link";

import Button from "@/components/Button";
import Field from "@/components/form/Field";
import LoadingScreen from "@/components/LoadingScreen";

const LoginForm = memo(() => {
    const { user, login, logout } = useUser();
    const router = useRouter();
    
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    async function loginSubmit(event: FormEvent<HTMLFormElement>) : void {
        event.preventDefault();

        setErrors([]);
        setLoading(true);

        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");

        try {
            await login(email, password);
            router.push("/dashboard");
        }
        catch(errors) {
            setErrors(errors);
        }

        setLoading(false);
    }

    console.log(errors);

    return (
        <div className="rounded text-left border mb-5">
            <main className="p-5 text-sm">
                <Form className="st-form" onSubmit={loginSubmit}>
                    <Field name="email" id="email" label="Email" value="" type="text" errors={errors} />
                    <Field name="password" id="password" label="Password" type="password" errors={errors} />
                    <Button
                        text="login"
                        width="full"
                    />
                </Form>
                <div className="w-full mt-7 pt-5 border-t">
                    <p className="pb-5">Not a member?</p>
                    <div className="st-navigation">
                        <Link href="/create" className="flex-1 rounded p-3 w-full block text-center">create an account</Link>
                    </div>
                </div>
            </main>
            {loading &&
            <LoadingScreen />
            }
        </div>
    );
});

export default LoginForm;
