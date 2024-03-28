import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface User {
    ID: number;
    Username: string;
    Fullname: string;
    Avatar: string;
}

function Profile() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const username = new URLSearchParams(location.search).get('username');
    const [profile, setProfile] = React.useState<User>({
        ID: 0,
        Username: 'username',
        Fullname: 'fullname',
        Avatar: 'avatar'
    });

    useEffect(() => {
        console.log(username);
    }, [])
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No token found");
            setIsLoaded(true);
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        const requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`http://localhost:8080/v1/users/findbyid/${username}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                return response.json();
            })
            .then((result: any) => {
                setProfile(result.data);
                setIsLoaded(true);
                console.log(result.data);
            })
            .catch(error => {
                setError(error.message);
                setIsLoaded(true);
            });
    }, []);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>All Users</h2>
                <p>Username: {profile.Username}</p>
                <p>Full Name: {profile.Fullname}</p>
        </div>
    );
}

export default Profile;
