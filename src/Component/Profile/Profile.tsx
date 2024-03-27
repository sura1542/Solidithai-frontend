import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import './Profile.css'


function Profile() {
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(true);
    const [user, setuser] = useState<any>([]);

    useEffect(() => {
        console.log("line13", user)
        //   setuser(user)
    }, [user])

    const loadDatas = async () => {
        const token = localStorage.getItem('token');
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow" as RequestRedirect | undefined
        };

        await fetch("http://localhost:8080/v1/auth/readall", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === "success") {
                    setIsLoaded(false);
                    setuser(result.data);
                } else if (result.status === "error") {
                    Swal.fire({
                        title: 'Token Expired',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    }).then((value) => {
                        navigate('/login')
                    })

                }
                console.log(result.status)
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        loadDatas()
    }, [])
    return (
        <div>
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Name: {user[12]?.Fullname}</h5>
                                    <h5 className="card-title">Email: {user[12]?.Username}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Profile


