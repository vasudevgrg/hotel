import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { currUser, showPopup } from "../action";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    fetch("http://localhost:5002/user/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((e) => e.json())
      .then((e) => {
        setUsername("");
        setPassword("");
        dispatch(showPopup({ visible: true, message: e.message }));
        dispatch(currUser(e.user));
        console.log(e.user);
        if (e.user.role === "traveller") {
          navigate("/");
        }
        if(e.user.role==="hotel owner"){
            navigate("/hoteladmin");
        }
      }).catch(err=>{
        console.log(err);
      })
  };

  const handleForgetPassword = () => {
    if (username === "") {
      dispatch(showPopup({ message: "enter your username", visible: true }));
      return;
    }
    fetch("http://localhost:5002/user/forgetpassword", {
      method: "POST",
      body: JSON.stringify({
        username: username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((e) => e.json())
      .then((e) => {
        dispatch(showPopup({ message: e.message, visible: true }));
        console.log(e);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <h1>Login Page</h1>
      <label>
        Username:
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleLogin}>Log In User</button>
      <button onClick={handleForgetPassword}>Forget Password</button>
    </>
  );
};

export default LoginPage;
