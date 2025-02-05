
import { react, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Welcome from "@/components/Welcome";

export default function Dashboard() {
    const router = useRouter();
    const id = 1;
    const [user, setUser] = useState({});

    async function getUser(id: int) : {} {
        const response = await fetch(`api/user/${id}`);
        const result = await response.json();

        if(result.error) {
            router.push("/login");
        }

        setUser(result.user);
    }

    useEffect(() => {
        getUser(id);
    }, [id]);
    
    return (
        <Welcome user={user} />
    );
}