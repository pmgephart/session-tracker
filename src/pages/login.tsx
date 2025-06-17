/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import { useRouter } from "next/navigation";

import LoginForm from "@/components/auth/LoginForm";

export default function Login() {
    const router = useRouter();

    return (
        <LoginForm 
            router={router}
        />
    );
}
