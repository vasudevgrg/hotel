import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [errors, setErrors] = useState({});
    const [showMessage, setShowMessage]= useState(false);
    const [message, setMessage]= useState("");
    const navigate = useNavigate();

    const handleRegister = () => {
        fetch("http://localhost:5002/user/register", {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                username: username,
                password: password,
                role: role
            }),
            headers: {
                "Content-Type": 'application/json'
            },
            credentials: 'include'
        }).then(response => response.json())
          .then(data => {
              if (data.error) {
                  const errorObject = data.error.reduce((acc, err) => {
                      const key = Object.keys(err)[0];
                      acc[key] = err[key];
                      return acc;
                  }, {});
                  setErrors(errorObject);
              } else {
                  console.log(data);
                setMessage(data.message);
                setShowMessage(true);
              }
          })
          .catch(err => console.log(err));
    }

    return (
        <>
            <h1>Register Page</h1>
            <label>
                Name:
                <input onChange={e => setName(e.target.value)} />
                {errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
            </label>
            <label>
                Username:
                <input onChange={e => setUsername(e.target.value)} />
                {errors.username && <span style={{color: 'red'}}>{errors.username}</span>}
            </label>
            <label>
                Password:
                <input type="password" onChange={e => setPassword(e.target.value)} />
                {errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
            </label>
            <label>
                Role:
                <select onChange={e => setRole(e.target.value)}>
                    <option value="clerk">Clerk</option>
                    <option value="hotel owner">Hotel Owner</option>
                    <option value="traveller">Traveller</option>
                </select>
                {errors.role && <span style={{color: 'red'}}>{errors.role}</span>}
            </label>
            <button onClick={handleRegister}>Register</button>
            {
                showMessage && message
            }
        </>
    )
}

export default RegisterUser;