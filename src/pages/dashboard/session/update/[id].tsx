/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import { useRouter } from "next/router";
import { useActivities } from "@/hooks/useActivities";

import SessionForm from "@/components/session/form/SessionForm";

export default function Session({ activities }) {
    const router = useRouter();

    return (
        <SessionForm
            id={router.query.id}
            type="update"
            activities={activities}
        />
    );
}

export async function getStaticProps() {
    const activities = await useActivities();
    
    return {
        props: {
            activities
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: false
    }
}
