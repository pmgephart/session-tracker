/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { parseISO } from "date-fns";
import { toast } from "react-toastify";

import { SESSION_INITIAL_STATE, WORKOUT_INITIAL_STATE } from "@/model/Session";

import Form from "next/form";
import Head from "next/head";
import Title from "@/components/Title";
import SessionForm from "@/components/session/form/SessionForm";

export default function SessionCreate({ activities }) {
    return (
        <div>
            <SessionForm
                id={0}
                type="create"
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
