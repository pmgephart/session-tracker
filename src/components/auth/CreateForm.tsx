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

import { useMessage } from "@/hooks/useMessage";

import Form from "next/form";
import Head from "next/head";

import Button from "@/components/Button";
import Field from "@/components/form/Field";
import LoadingScreen from "@/components/LoadingScreen";
import Message from "@/components/Message";
import Title from "@/components/Title";

const CreateForm: FC = memo((): JSX.Element => {
    const router = useRouter();
    const { message, showMessage, clearMessage, hasMessage } = useMessage();
    
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    async function createUser(event: FormEvent<HTMLFormElement>) : void {
        event.preventDefault();

        clearMessage();
        setErrors([]);
        setLoading(true);

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
            if(result.message) {
                showMessage(result.message, "error");
            }

            setErrors(result.errors);
            setLoading(false);

            return;
        }

        try {
            await login(email, password);
            router.push("/dashboard");
        }
        catch(error) {
            console.log(error); // TODO: handle error during login, need to simluate error from API response
        }

        setLoading(false);
    }

    return (
        <Form className="st-form" onSubmit={createUser}>
            <Head>
                <title>Create User Account</title>
            </Head>
            <Title
                type="h3"
                text="Create User Account"
            />
            {hasMessage && ((
            <Message
                text={message.text}
                type={message.type}
            />
            ))}
            <div className="rounded text-left border mb-5">
                <main className="p-5 text-sm">
                    <Field name="email" id="email" label="Email" value="" type="text" errors={errors} />
                    <Field name="firstName" id="firstName" label="First Name" type="text" errors={errors} />
                    <Field name="lastName" id="lastName" label="Last Name" type="text" errors={errors} />
                    <Field name="password" id="password" label="Password" type="password" errors={errors} />
                    <Field name="confirmPassword" id="confirmPassword" label="Confirm Password" type="password" errors={errors} />
                    <Button
                        text="create account"
                        width="full"
                    />
                </main>
                {loading &&
                <LoadingScreen />
                }
            </div>
        </Form>
    );
});

export default CreateForm;
