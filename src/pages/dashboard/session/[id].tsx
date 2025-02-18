/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaPlusCircle } from "react-icons/fa";

import Form from "next/form";
import { format } from "date-fns";

export default function Session({ activities }) {
    const router = useRouter();
    const id = router.query.id;
    const [session, setSession] = useState({
        name: '',
        description: '',
        date: ''
    });

    function setData(event) : void {
        setSession({ ...session, [event.target.id]: event.target.value });
    }

    async function getSession(id: int) : {} {
        if(!id) {
            return;
        }

        const response = await fetch(`/api/session?id=${id}`);
        const result = await response.json();

        if(result.error) {
            router.push("/login");
        }

        setSession(result.session);
    };

    useEffect(() => {
        getSession(id);
    }, [id]);

    return (
        <Form action="/session/add" className="st-form">
            <div className="rounded text-left border mb-5">
                <main className="p-5 text-sm">
                    <div className="w-full pb-5">
                        <label htmlFor="date" className="block pb-2">Date</label>
                        <input className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md" type="date" aria-label="Date" id="date" defaultValue={session.date ? format(session.date, "yyyy-MM-dd") : ''} onChange={setData} />
                    </div>
                    <div className="w-full pb-5">
                        <label htmlFor="name" className="block pb-2">Name</label>
                        <input className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md" type="text" id="name" value={session.name} onChange={setData} />
                    </div>
                    <div className="w-full">
                        <label htmlFor="description" className="block pb-2">Description</label>
                        <textarea className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md" id="description" value={session.description} onChange={setData}>
                        </textarea>
                    </div>
                </main>
            </div>
            <div className="rounded text-left border mb-5">
                <main className="p-5 text-sm">
                    <div className="w-full pb-2">
                        <label htmlFor="name" className="block pb-2">Workouts</label>
                    </div>
                    <button className="st-action">
                        <span>add workout</span>
                        <FaPlusCircle />
                    </button>
                </main>
            </div>
            <div>
                <button type="submit" className="st-action w-full">save</button>
            </div>
        </Form>
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