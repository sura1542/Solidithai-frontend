import React, { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import user_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'


function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState({})
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

        const raw: any = JSON.stringify({
            "username": (inputs as { username?: string }).username,
            "password": (inputs as { password?: string }).password
        });
        console.log ((inputs as { username?: string }).username);

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow" as RequestRedirect | undefined
        };

        fetch("http://localhost:8080/v1/users/login", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result.status === "ok") {
                    MySwal.fire({
                        title: 'Login Success',
                        icon: 'success',
                        confirmButtonText: 'Enter'
                    }).then((value) => {
                        localStorage.setItem('token', result.token)
                        navigate(`/profile?username=${(inputs as { username?: string }).username}`);
                    })
                } else {
                    MySwal.fire({
                        title: 'Login Failed',
                        icon: 'error',
                        confirmButtonText: 'Enter'
                    })
                }
            })
            .catch((error) => console.error(error));
        console.log(inputs);
    }


    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="header">Log In</div><br />
                <div className="text">Enter your username and password</div><br />
                <div className='inputs'>
                    <div className='input'>
                    <img className="icon" src={user_icon} />
                    <input
                        type="text"
                        name="username"
                        value={(inputs as { username?: string }).username || ""}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <div className='inputs'>
                    <div className='input'>
                    <img className="icon" src={password_icon} />
                    <input
                        type="password"
                        name="password"
                        value={(inputs as { password?: string }).password || ""}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <br />
                <a href="/register" className="forgot">Don't have an account? Click here!</a>
                <div className='submit-container'>
                    <div className='submit'> <input type="submit" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login

