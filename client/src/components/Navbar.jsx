import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {
    const [showName, setShowName]= useState(false);
    const user= useSelector(e=>e.manageCurrUser);
  const navigate= useNavigate();
    useEffect(()=>{
       if(Object.keys(user).length!==0){
        setShowName(true);
       }
    })
  return (
    <>
    <nav className='navbar'>
        <h1>
            OYO demo
        </h1>
        <hr/>
        <div>
            Become a Member
            <p>Additional 10% discount</p>
        </div>
        <hr/>
        <div>
            List Your Property
            <p>Start Earning in 30 mins</p>
        </div>
        <hr/>
        <div>
            0124-500345
            <p>Call us to book now..!!</p>
        </div>
        <div>
            {
                showName && <p>Welcome to {user.name}</p>
            }
            {
                !showName && <button onClick={()=>navigate("/login")}>Login/Signup</button>
            }
        </div>
    </nav>
    </>
  )
}

export default Navbar