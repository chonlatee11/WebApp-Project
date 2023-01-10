import './FormComponent.css'
import {useState} from "react"
import axios from 'axios'
import React from 'react'

const FormComponent = ()=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [roleCheck, setRolecheck] = useState('')

    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const [EmailColor,setEmailColor] = useState('')
    const [passwordColor, setPasswordColor] = useState('')
    const [validForm , setValidForm] = useState(false);

//     function SignIn(){
//     const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     const jsonData = {
//         email: data.get('email'),
//         password: data.get('password')
//     }
// }

    const validateForm = (e)=>{
        e.preventDefault()
        if(email.includes("@")){
            setErrorEmail('')
            setEmailColor('green')
            setValidForm(true)
        }else{
            setErrorEmail('อีเมลไม่ถูกต้อง')
            setEmailColor('red')
            setValidForm(false)
        }

        if(password.length > 8){
            setErrorPassword('')
            setPasswordColor('green')
            setValidForm(true)
        }else{
            setErrorPassword('รหัสผ่านไม่ถูกต้อง')
            setPasswordColor('red')
            setValidForm(false)
        }
    }

    function onLogin() {
        const handleSubmit = (event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          console.log({
            email: data.get('email'),
            password: data.get('password'),
          });
        };
    if(roleCheck === 'Admin'){
        axios.post("http://localhost:3030/loginADMIN",{
            email: email,
            password: password
        }).then((response) => {
            console.log(response.data.status)
            if(response.data.status === 'ok'){
                alert('login success')
                localStorage.setItem('token', response.data.token)
                window.location = '/AdminPage'
            } else {
                alert('login fail')
                console.log(response.data)
                return ;
            }
            //console.log(response.data)
        })
    }else if(roleCheck === 'Research'){
        axios.post("http://localhost:3030/loginRESEARCH",{
            email: email,
            password: password
        }).then((response) => {
            console.log(response.data.status)
            if(response.data.status === 'ok'){
                alert('login success')
                localStorage.setItem('token', response.data.token)
                window.location = '/ResearchPage'
            } else {
                alert('login fail')
                console.log(response.data)
                return ;
            }
            console.log(response.data)
        })
    }
}
            // if (validForm) {
            //     axios.post("http://localhost:3030/login",{
            //         email: email,
            //         password: password
            //     }).then((response) => {
            //         console.log(response.data.status)
            //         if(response.data.status === 'ok'){
            //             localStorage.setItem('token', response.token)
            //             //window.location = '/AdminPage'
            //         } else {
            //             console.log(response.data)
            //             return ;
            //         }
            //         //console.log(response.data)
            //     })
            // }


    return(
        <div className = "container">
            <form className = "form" onSubmit={validateForm}>
                <h2>LOGIN</h2>
                <div className="form-control">
                    <label>อีเมล</label>
                    <input type = "text" placeholder='E-mail'onChange={(e) => {
                        setEmail(e.target.value);
                    }}/>
                    <small style={{color:EmailColor}}>{errorEmail}</small>
                </div>
                <div className="form-control">
                    <label>รหัสผ่าน</label>
                    <input type = "password" placeholder='Password'onChange={(e) => {
                        setPassword(e.target.value);
                    }}/>
                    <small style={{color:passwordColor}}>{errorPassword}</small>
                </div>
                <div className="form-group">
                    <input type="radio" name="roleCheck" value="Admin" onChange={(e) => {setRolecheck(e.target.value);}}/>ผู้ดูแลระบบ
                    <input type="radio" name="roleCheck" value="Research"  onChange={(e) => {setRolecheck(e.target.value);}}/>นักวิจัย
                </div>
                <button id="btn" onClick={onLogin}>เข้าสู่ระบบ</button>
            </form>
        </div>
        );
    }


export default FormComponent




/* <div className = "container">
<form className = "form" onSubmit={validateForm}>
    <h2>LOGIN</h2>
    <div className="form-control">
        <label>อีเมล</label>
        <input type = "text" placeholder='E-mail' value={email} onChange={(e)=>setEmail(e.target.value)} style={{borderColor:EmailColor}}/>
        <small style={{color:EmailColor}}>{errorEmail}</small>
    </div>
    <div className="form-control">
        <label>รหัสผ่าน</label>
        <input type = "password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} style={{borderColor:passwordColor}}/>
        <small style={{color:passwordColor}}>{errorPassword}</small>
    </div>
    <radio>
        <input type="radio" name="demo" value="Admin"/>ผู้ดูแลระบบ
        <input type="radio" name="demo" value="Research"/>นักวิจัย
    </radio>
    <button type="submit">เข้าสู่ระบบ</button>
</form>
</div> */

    // const login = () => {
    //     axios.post("http://localhost:3030/login",{
    //         email: email,
    //         password: password
    //     }).then((response) => {
    //         console.log(response.data)
    //     });
    // };

        // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     const jsonData = {
    //         email: data.get('email'),
    //         password: data.get('password'),
    //     }

    //     fetch('https://localhost:3030/login', {
    //         method: 'POST', // or 'PUT'
    //         headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(jsonData),
    //     })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log('Success:', data);
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });










/* function onLogin() {
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
}
}
if(roleCheck === Admin){
    fetch('https://localhost:3030/loginADMIN', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.status == 'ok'){
                alert('login success')
            }else{
                alert('login fail')
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }; */