import React from 'react'
import { useNavigate } from 'react-router-dom'

const AccessDenied = () => {
    const navigate= useNavigate();
  return (
   <>
   <div>Access denied...Return to Main Page</div>
   <button onClick={()=>navigate("/")}>Main Page</button>
   </>
  )
}

export default AccessDenied