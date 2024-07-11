import React, { useState } from 'react';
import BookNowModal from './BookNowModal';
import { useNavigate } from 'react-router-dom';


const AdminHotelCard = ({data}) => {
  
const [showBookNow, setShowBookNow]= useState(false);
   const navigate= useNavigate();
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
          
        </tr>
        {
            data.Rooms.map(e=>(
                <tr>
                    <td>
                        {e.room_no}
                    </td>
                    <td>{e.size}</td>
                    <td>{e.vacancy && "T"}</td>
                    
                </tr>
            ))
        }
    </table>
    <button onClick={()=>navigate(`/hoteladmin/${data.id}`)}>Go to Hotel Main Page</button>
   </div>
   {
    showBookNow && <BookNowModal setShowBookNow={setShowBookNow}/>
   }
   </>
  )
}

export default AdminHotelCard