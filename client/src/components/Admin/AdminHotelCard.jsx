import React, { useState } from 'react';
import BookNowModal from './BookNowModal';


const AdminHotelCard = ({data}) => {
  
const [showBookNow, setShowBookNow]= useState(false);
   
  return (
   <>
   <div style={{border:"2px solid black", padding:"10px", margin:"10px"}}>
    <img src={data.hotel_pic} style={{height:"150px", width:"150px"}}/>
    <h2>{data.name}</h2>
    <table>
        <tr>
            <th>Room No</th>
            <th>Size</th>
            <th>Vacancy</th>
            <th>Book this room</th>
        </tr>
        {
            data.Rooms.map(e=>(
                <tr>
                    <td>
                        {e.room_no}
                    </td>
                    <td>{e.size}</td>
                    <td>{e.vacancy && "T"}</td>
                    <td><button onClick={()=>setShowBookNow(true)}>Book Now</button></td>
                </tr>
            ))
        }
    </table>
   </div>
   {
    showBookNow && <BookNowModal setShowBookNow={setShowBookNow}/>
   }
   </>
  )
}

export default AdminHotelCard