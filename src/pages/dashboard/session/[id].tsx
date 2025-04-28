/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import { useRouter } from "next/router";

import SessionView from "@/components/session/view/SessionView";

/**
 * TODO: add delete button and functionality
 */

export default function Session({ activities }) {
    const router = useRouter();

    return (
        <SessionView id={router.query.id} />
    );
}
