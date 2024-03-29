import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './Profile.css'
import usericon from '../Assets/profileicon.png'
import edit from '../Assets/edit.png'
import deleteIcon from '../Assets/delete.png'

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


    const deletefunc = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        const requestOptions: RequestInit = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`http://localhost:8080/v1/users/delete/${username}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to delete user");
                }
                return response.json();
            })
            .then(result => {
                console.log(result);
                localStorage.removeItem("token");
                window.location.href = "/login";
            })
            .catch(error => {
                console.error(error);
            });
    }

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
        <div className="container">
            <div className="ud-action">
                <Link to={`/editprofile?username=${username}`}>
                    <img className="editicon" src={edit} alt="edit" />
                </Link>
                <button>
                    <img className="deleteicon" src={deleteIcon} alt="delete" onClick={deletefunc} />
                </button>
            </div>
            <div className="profile-text">
                <h2>Profile</h2>
                <img className="profileicon" src={usericon} alt="Profile Icon" />
            </div>
            <div className="body-text">
                <p>User Name: {profile.Username}</p>
                <p>Full Name: {profile.Fullname}</p>
            </div>
            <button className="logout" onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }}>Logout
            </button>
        </div>
    );
}

export default Profile;
