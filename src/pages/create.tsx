/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import Head from "next/head";
import CreateForm from "@/components/auth/CreateForm";

export default function Login() {
    return (
        <>
            <Head>
                <title>Create Account | Session Tracker</title>
            </Head>
            <CreateForm />
        </>
    );
}
