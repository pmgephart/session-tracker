/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Form from "next/form";

export default function Session({ activities }) {
    return (
        <Form action="/session/add" className="st-form">
            <div className="rounded text-left border mb-5">
                <main className="p-5 text-sm">
                    <div className="w-full pb-5">
                        <label htmlFor="date" className="block pb-2">Date</label>
                        <input className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md" type="date" aria-label="Date" id="date" key="date" />
                    </div>
                    <div className="w-full pb-5">
                        <label htmlFor="name" className="block pb-2">Name</label>
                        <input className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md" type="text" id="name" key="name" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="name" className="block pb-2">Description</label>
                        <textarea className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md" id="name" key="name">
                        </textarea>
                    </div>
                </main>
            </div>
            <div className="rounded text-left border">
                <main className="p-5 text-sm">
                    <div className="w-full pb-5">
                        <label htmlFor="name" className="block pb-2">Workouts</label>
                        {activities.map((activity) => (
                        <p>{activity.name}</p>
                        ))}
                    </div>
                </main>
            </div>
            <button type="submit" className="st-action w-full border rounded p-3">login</button>
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