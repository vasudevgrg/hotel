import React, { useState } from 'react'

const LoginPage = () => {
    const [username, setUsername]=useState("");
    const [password, setPassword]= useState("");

    const handleLogin=()=>{
        fetch("http://localhost:5002/user/login", {
            method:'POST',
            body:JSON.stringify({
                username:username,
                password:password
            }),
            headers:{
                "Content-Type":'application/json'
            },
            credentials:'include'
        }).then(e=>e.json()).then(e=>console.log(e));
    }
  return (
 <>
    <h1>Login Page</h1>
    <label>
        Username:
        <input onChange={e=>setUsername(e.target.value)} />
    </label>
    <label>
        Password:
        <input onChange={e=>setPassword(e.target.value)}/>
    </label>
    <button onClick={handleLogin}>Log In User</button>
    </>
  )
}

export default LoginPage