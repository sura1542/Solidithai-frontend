import React, { useState, useEffect } from "react";

interface User {
    ID: number;
    Username: string;
    Fullname: string;
    Avatar: string;
}

interface EditProfileProps {
    history: any; // or type it more specifically if you know its type
}

function EditProfile(props: EditProfileProps) {
    const [user, setUser] = useState<User>({
        ID: 0,
        Username: "",
        Fullname: "",
        Avatar: ""
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            props.history.push("/login");
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        const requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/v1/users/profile", requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                return response.json();
            })
            .then((result: User) => {
                setUser(result);
            })
            .catch(error => {
                setError(error.message);
            });
    }, [props.history]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            props.history.push("/login");
            return;
        }
    
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
    
        const requestOptions: RequestInit = {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(user),
            redirect: "follow"
        };
    
        fetch(`http://localhost:8080/v1/users/edit/${user.Username}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to update user");
                }
                props.history.push("/profile");
            })
            .catch(error => {
                setError(error.message);
            });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            {error && <div>Error: {error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="Username" value={user.Username} onChange={handleChange} />
                </div>
                <div>
                    <label>Full Name:</label>
                    <input type="text" name="Fullname" value={user.Fullname} onChange={handleChange} />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditProfile;
