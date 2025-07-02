/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import { useRouter } from "next/router";
import { useUser } from "@/contexts/UserContext";

import Head from "next/head";
import LoginForm from "@/components/auth/LoginForm";
import Title from "@/components/Title";

export default function Login() {
    const { user } = useUser();
    const router = useRouter();

    if(user) {
        router.push("/dashboard");
    }

    return (
        <>
            <Head>
                <title>Login | Session Tracker</title>
            </Head>
            <Title
                type="h3"
                text="Login"
            />
            <LoginForm />
        </>
    );
}
