import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';


function Profile() {
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(true);
    const [user, setuser] = useState<any>([]);

    useEffect(() => {
        console.log("line13",user)
    //   setuser(user)
    }, [user])

    const loadDatas = async() => {
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
    
    useEffect( () => {
        loadDatas()
    }, [])
    

    

return (
            <div>
                <h1>Profile</h1>
                <div>
                    <h1>Username: {user[0]?.Username}</h1>
                    <h1>Fullname: {user[0]?.Fullname}</h1>
                    {/* <h1>Avatar: {user[0]?.avatar}</h1> */}
                </div>
            </div>
)
    
        
    }

    
export default Profile


