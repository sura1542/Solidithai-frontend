import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Profile.css'
import usericon from '../Assets/profileicon.png'

interface User {
    ID: number;
    Username: string;
    Fullname: string;
    Avatar: string;
}

function EditProfile() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<User>({
        ID: 0,
        Username: '',
        Fullname: '',
        Avatar: ''
    });
    const location = useLocation();
    const navigate = useNavigate();
    const username = new URLSearchParams(location.search).get('username');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No token found");
                }

                const myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + token);

                const requestOptions: RequestInit = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                };

                const response = await fetch(`http://localhost:8080/v1/users/findbyid/${username}`, requestOptions);
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const result = await response.json();
                setProfile(result.data);
                setIsLoaded(true);
            } catch (error) {
                setIsLoaded(true);
            }
        };

        fetchData();
    }, [username]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token found");
            }

            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);
            myHeaders.append("Content-Type", "application/json");

            const requestOptions: RequestInit = {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(profile),
                redirect: "follow"
            };

            const response = await fetch(`http://localhost:8080/v1/users/edit/${username}`, requestOptions);
            if (!response.ok) {
                throw new Error("Failed to update user data");
            }

            navigate(`/profile?username=${profile.Username}`);
        } catch (error) {
            console.error(error);
        }
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <div className="profile-text">
                <h2>Edit Profile</h2>
                <img className="profileicon" src={usericon} alt="Profile Icon" />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="body-text">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="Username" value={profile.Username} onChange={handleInputChange} />
                </div>
                <div className="body-text">
                    <label htmlFor="fullname">Full Name:</label>
                    <input type="text" id="fullname" name="Fullname" value={profile.Fullname} onChange={handleInputChange} />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditProfile;
