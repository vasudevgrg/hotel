import React, { useState } from 'react'

const HotelRatingsCard = ({data}) => {
  const [rating, setRating]= useState(0);
  const [comment, setComment]= useState("");

  const handleSubmit=()=>{
    fetch("http://localhost:5002/hotel/addrating",{
      method:'PUT',
      body:JSON.stringify({
        hotel_id: data.id,
        rating:rating,
        comment: comment
      }),
      headers:{
        "Content-Type":"application/json"
      },
      credentials:'include'
    }).then(e=>e.json()).then(e=>{
      console.log(e);
      setRating(0);
      setComment("");
  
    })
  }

  
  return (
   <>
   <div>
    <h2>{data.name}</h2>

    <h3>Give Ratings to Hotel:</h3>
    <select onChange={e=>setRating(e.target.value)}>
      <option value="5">5 star</option>
      <option value="4">4 star</option>
      <option value="3">3 star</option>
      <option value="2">2 star</option>
      <option value="1"> 1 star</option>
    </select>

    <h3>Add Comments:</h3>
    <input value={comment} onChange={e=>setComment(e.target.value)} />
    <button onClick={handleSubmit}>Submit</button>
   </div>
   </>
  )
}

export default HotelRatingsCard