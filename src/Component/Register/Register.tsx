import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Register() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
        fullname: '',
        avatar: ''
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "username": inputs.username,
            "password": inputs.password,
            "fullname": inputs.fullname,
            "avatar": inputs.avatar
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow" as RequestRedirect
        };

        fetch("http://localhost:8080/v1/users/register", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .then(() => {
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    title: 'Success',
                    text: 'Register successful',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    navigate('/login');
                });
            })
            .catch(error => console.error(error));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" onChange={handleChange} />
                </label>
                <label>
                    Fullname:
                    <input type="text" name="fullname" onChange={handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" onChange={handleChange} />
                </label>
                <label>
                    Avatar:
                    <input type="text" name="avatar" onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register;
