/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaPlusCircle } from "react-icons/fa";
import { parseISO } from "date-fns";
import { toast } from "react-toastify";

import Title from "@/components/Title";
import SessionForm from "@/components/session/form/SessionForm";

export default function Session({ activities }) {
    const router = useRouter();

    return (
        <div>
            <SessionForm
                id={router.query.id}
                type="update"
                activities={activities}
            />
        </div>
    );
}

export async function getStaticProps() {
    const response = await fetch(`http://localhost:3000/api/activities`);
    const activities = await response.json();

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
