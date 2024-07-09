import React, { useEffect, useState } from 'react'
import HotelRatingsCard from './HotelRatingsCard'

const TripCard = ({data}) => {
    const [location, setLocation]= useState([]);
    const [hotels, setHotels]= useState([]);

    useEffect(()=>{
        setLocation(data.Locations);
        setHotels(data.Hotels);
    })
  return (
   <>
   <div style={{display:"flex", flexDirection:'column'}}>
    <label>
     <h2> Trip to:</h2>
        <ul>
        {
            
           location.map(e=>(
                <li>{e.name}</li>
            ))
        } 
        </ul>
    </label>
    <label>
        Start Date:{data.startDate}
    </label>
    <label>
        End Date:{data.endDate}
    </label>
    <label>
        <h2>Hotels</h2>
        <ul>
            {
               hotels.map(e=>(
                    <HotelRatingsCard data={e}/>
                ))
            }
        </ul>
    </label>
   </div>
   </>
  )
}

export default TripCard