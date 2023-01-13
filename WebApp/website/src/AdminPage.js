import React,{useEffect} from 'react'
import axios from 'axios'
import Sidebar from './Sidebar'

function DashboardAdmin(){
    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.post("http://localhost:3030/authen",{},{
        headers:{
            'authorization': 'Bearer '+ token,
        }
        }).then((response) => {
            console.log(response.data.status)
            if(response.data.status === 'ok'){
                alert('authen success')
            } else {
                alert('authen fail')
                window.location = '/'
            }
            console.log(response.data)
        })
     }, [])

     return(
        <>
        <h1>TEST</h1>
        <Sidebar/>
        </>
    )
}

export default DashboardAdmin