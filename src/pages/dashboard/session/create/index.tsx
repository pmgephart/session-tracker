/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import { useActivities } from "@/hooks/useActivities";

import SessionForm from "@/components/session/form/SessionForm";

export default function SessionCreate({ activities }) {
    return (
        <SessionForm
            id={0}
            type="create"
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
