/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import { useRouter } from "next/navigation";

import CreateForm from "@/components/auth/CreateForm";

export default function Login() {
    const router = useRouter();

    return (
        <CreateForm
            router={router}
         />
    );
}
