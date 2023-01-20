import React,{useEffect} from 'react'
import axios from 'axios'
import Sidebar from './Sidebar'

const AuthenAdmin = () => {
    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.post("http://localhost:3030/authen",{},{
        headers:{
            'authorization': 'Bearer '+ token,
        }
        }).then((response) => {
            console.log(response.data.status)
            if(response.data.status === 'ok'){
            } else {
                alert('authen fail')
                window.location = '/'
            }
            console.log(response.data)
        })
     }, [])

return(
    <>
    <Sidebar/>
    </>
);
}

export default AuthenAdmin;