import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { showPopup } from '../action';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [username, setUsername]= useState("");
    const [newPassword, setNewPassword]= useState("");
    const [retypePassword, setRetypePassword]= useState("");
const dispatch= useDispatch();
const navigate= useNavigate();
    const handleResetPassword=()=>{
        if(newPassword!== retypePassword){
            dispatch(showPopup({message:"passwords dont match", visible:true}));
            return;
        }
        fetch("http://localhost:5002/user/changepassword",{
            method:'POST',
            body:JSON.stringify({
                username:username,
                password:newPassword
            }),
            headers:{
                "Content-Type":"application/json"
            },
            credentials:'include'
        }).then(e=>e.json()).then(e=> { dispatch(showPopup({message:e.message, visible:true})); navigate("/login")})
    }
    
  return (
    <>
    <h1>Change Password:</h1>
    <div>
        <label>
            Enter Username:
            <input onChange={e=>setUsername(e.target.value)}/>
        </label>
        <label>New Password:
            <input onChange={e=>setNewPassword(e.target.value)}/>
        </label>
        <label>Re-Type New Password:
            <input onChange={e=>setRetypePassword(e.target.value)}/>
        </label>
        <button onClick={handleResetPassword}>Reset Password</button>
    </div>
    </>
  )
}

export default ChangePassword