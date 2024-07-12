import React from 'react'
import { useNavigate } from 'react-router-dom'

const ShowRooms = ({rooms}) => {
    const navigate= useNavigate();
    const handleShowSchedule=({id})=>{
        console.log(id);
        navigate(`/hoteladmin/room/${id}`);
    }
    console.log(rooms);
  return (
    <>
     <table>
          <tr>
            <th>Room No</th>
            <th>Size</th>
            <th>Vacancy RIght Now</th>
            <th>Upcoming Schedule</th>
          </tr>
          {rooms.map((e) => (
            <tr>
              <td>{e.room_no}</td>
              <td>{e.size}</td>
              <td>{e.vacancy && "T"}</td>
              <button onClick={()=>handleShowSchedule({id:e.id})}>Show Schedule</button>
            </tr>
          ))}
        </table>
    </>
  )
}

export default ShowRooms