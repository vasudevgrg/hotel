import React, { useEffect, useState } from 'react'
import AdminHotelCard from '../components/Admin/AdminHotelCard';

const HotelAdminPage = () => {
    const [hotels, setHotels]= useState([]);
    useEffect(()=>{
        fetch("http://localhost:5002/hotel/allhotels", {
            credentials:'include'
        }).then(e=>e.json()).then(e=>{setHotels(e.hotels); console.log(e)});
    },[]);
  return (
   <>
   {
    hotels.map(e=>(
       <AdminHotelCard data={e}/>
    ))
   }
   </>
  )
}

export default HotelAdminPage