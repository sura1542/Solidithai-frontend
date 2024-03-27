import React from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2' 
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState({})
    const [inputs, setInputs] = useState({}); // Declare the 'inputs' variable
    const MySwal = withReactContent(Swal)

    const handleChange = (e: any) => {
        const name= e.target.name;
        const value = e.target.value;
        setInputs( values => ({...values, [name]: value}));
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

fetch("http://localhost:8080/v1/users/login", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        console.log(result)
        if(result.status === "ok"){
            MySwal.fire({
                title: 'Login Success',
                icon: 'success',
                confirmButtonText: 'Cool'
            }).then((value) => {
                localStorage.setItem('token', result.token)
                navigate('/profile')
            })
        }else{
            MySwal.fire({
                title: 'Login Failed',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    })
    .catch((error) => console.error(error));
console.log(inputs);
    }


    return (
        <div>
    <form onSubmit={handleSubmit}>
    <label>Username:
    <input 
        type="text" 
        name="username" 
        value={(inputs as { username?: string }).username || ""} 
        onChange={handleChange}
    />
    </label>
    <label>Password:
        <input 
            type="password" 
            name="password" 
            value={(inputs as { password?: string }).password || ""} 
            onChange={handleChange}
        />
    </label>
        <input type="submit" />
    </form>
        </div>
  )
}

export default Login

function setInputs(arg0: (value: any) => any) {
    throw new Error('Function not implemented.');
}
