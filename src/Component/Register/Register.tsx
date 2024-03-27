import React, {useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'
import './Register.css'
import user_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'


function Register() {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({}); // Declare the 'inputs' variable
    const MySwal = withReactContent(Swal)

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "username": (inputs as { username?: string }).username,
            "password": (inputs as { password?: string }).password
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow" as RequestRedirect | undefined
        };

        fetch("http://localhost:8080/v1/users/register", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result.status === "ok") {
                    MySwal.fire({
                        title: 'Register Success',
                        icon: 'success',
                        confirmButtonText: 'Enter'
                    }).then((value) => {
                        localStorage.setItem('token', result.token)
                        navigate('/profile')
                    })
                } else {
                    MySwal.fire({
                        title: 'Register Failed',
                        icon: 'error',
                        confirmButtonText: 'Enter'
                    })
                }
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <img src={user_icon} alt="user_icon" />
                        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                    </div>
                    <div className="input-field">
                        <img src={password_icon} alt="password_icon" />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register