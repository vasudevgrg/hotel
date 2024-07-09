import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";

const HotelPage = () => {
    const [data, setData]= useState({});
    const [rooms, setRooms]= useState([]);
    const [startDate, setStartDate]= useState(new Date());
    const [endDate, setEndDate]= useState(new Date());
    const [availableRooms, setAvailableRooms]= useState([]);

    let {hotelId}= useParams();

    useEffect(()=>{
        fetch(`http://localhost:5002/hotel/gethotel/${hotelId}`, {
            credentials:'include'
        }).then(e=>e.json()).then(e=>{setData(e.hotel);setRooms(e.hotel.Rooms); console.log(e)});
    },[]);

    const handleAvailableRooms=()=>{
        fetch("http://localhost:5002/hotel/availablerooms", {
            method:'POST',
            body:JSON.stringify({
                startDate:startDate,
                endDate:endDate,
                hotel_id:data.id
            }),
            headers:{
                "Content-Type":"application/json"
            },
            credentials:'include'
        }).then(e=>e.json()).then(e=>{console.log(e);setAvailableRooms(e.rooms);});
    }

  return (
    <>
    
    <div>

    <img src={data.hotel_pic} style={{height:"150px", width:"150px"}}/>
    <h2>{data.name}</h2>
    <table>
        <tr>
            <th>Room No</th>
            <th>Size</th>
            <th>Vacancy RIght Now</th>
            
        </tr>
        {
            rooms.map(e=>(
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
   
    </div>
    <div>
        <h2>Book Rooms</h2>
        <label>
            Start Date:
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </label>
        <label>
            End Date:
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        </label>
        <button onClick={handleAvailableRooms}>Show Available Rooms</button>
        <div>

        </div>
    </div>
    </>
  )
}

export default HotelPage