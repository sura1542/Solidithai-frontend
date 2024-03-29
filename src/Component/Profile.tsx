import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import "./Register.css";

interface User {
    Fullname: string;
    Username: string;
    // Add more properties if needed
}

function Profile(): JSX.Element {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadUserData = async (): Promise<void> => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };

            try {
                const response = await axios.get("http://localhost:8080/v1/users/getuserbyid", config);
                const result = response.data;

                console.log("Users Data:", result); // Log all users data to the console

                if (response.status === 200) {
                    setUsers(result.data);
                    setIsLoading(false);
                } else {
                    throw new Error(result.message || "Failed to fetch users data");
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    // Request was canceled
                    console.log("Request canceled:", error.message);
                } else {
                    // Handle other errors
                    Swal.fire({
                        title: 'Token Expired',
                        text: 'Your session has expired. Please log in again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        localStorage.removeItem('token');
                        navigate('/login');
                    });
                }
            }
        };

        loadUserData();

        return () => {
            // Cleanup function
            // Cancel Axios request if component unmounts
            // This is to prevent memory leaks
        };
    }, [navigate]);

    return (
        <div>
            <h1>Profile</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {users.map((user) => (
                        <div key={user.Username}>
                            <h2>{user.Fullname}</h2>
                            <p>Username: {user.Username}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Profile;
