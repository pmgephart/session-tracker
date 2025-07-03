/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import { memo, useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { format } from "date-fns";
import { toast } from "react-toastify";

import { useSession } from "@/hooks/useSession";

import Head from "next/head";
import Link from "next/link";
import Errors from "@/components/Errors";
import LoadingScreen from "@/components/LoadingScreen";
import Title from "@/components/Title";
import WorkoutForm from "@/components/session/form/WorkoutForm";

const SessionView = ({ id }) => {
    const { session, dispatch, error, sessionLoading } = useSession(id);
    const title = `${session.name} | Session Tracker`;

    if(error) {
        return (
            <div>
                <Head>
                    <title>{error}</title>
                </Head>
                <Errors
                    errors={[{
                        error: error
                    }]}
                />
            </div>
        );
    }

    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <Title
                type="h3"
                text={session.name}
            />
            <div className="pb-5 mx-auto text-center">
                <div className="text-sm">
                    <Link href={`/dashboard/session/update/${session.id}`} className="st-link">
                        <FaEdit />
                        <span>update session</span>
                    </Link>
                </div>
            </div>
            <div className="rounded text-left border mb-5">
                <main className="p-5 text-sm">
                    <div className="pb-2">
                        <p className="pb-1"><strong>Date</strong></p>
                        <p>{session.date ? format(session.date, "MM/dd/yyyy") : ''}</p>
                    </div>
                    <div>
                        <p className="pb-2"><strong>Description</strong></p>
                        <p>{session.description}</p>
                    </div>
                </main>
            </div>
            {session.workouts.length > 0 &&
            <Title
                type="h3"
                text="Activities"
            />
            } 
            {session.workouts.map((workout) => (
            <div  key={workout.id} className="rounded text-left border mb-5">
                <main className="p-5 text-sm">
                    <div className="pb-5">
                        <p className="pb-2"><strong>Activity</strong></p>
                        <p>{workout.activity.name}</p>
                    </div>
                    <div className="pb-5">
                        <p className="pb-2"><strong>Description</strong></p>
                        <p>{workout.description}</p>
                    </div>
                    <div className="pb-5">
                        <p className="pb-2"><strong>Sets</strong></p>
                        <p>{workout.sets ? workout.sets : '-'}</p>
                    </div>
                    <div className="pb-5">
                        <p className="pb-2"><strong>Reps</strong></p>
                        <p>{workout.reps ? workout.reps : '-'}</p>
                    </div>
                    <div className="pb-5">
                        <p className="pb-2"><strong>Weight</strong></p>
                        <p>{workout.weight ? workout.weight : '-'}</p>
                    </div>
                    <div>
                        <p className="pb-2"><strong>Duration</strong></p>
                        <p>{workout.duration ? workout.duration : '-'}</p>
                    </div>
                </main>
            </div>
            ))}
            {sessionLoading &&
            <LoadingScreen
                text="loading session..."
            />
            }
        </div>
    );
}

export default SessionView;
