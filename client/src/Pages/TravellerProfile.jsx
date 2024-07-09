import React, {useState} from 'react'
import TripCard from '../components/UserTripPage/TripCard';

const TravellerProfile = () => {
    const [trips, setTrips]= useState([]);

    React.useEffect(()=>{
        fetch("http://localhost:5002/traveller/alltrips", {
            method:"get",
            credentials:'include'
        }).then(e=>e.json()).then(e=>{setTrips(e.trips); console.log(e)}).catch(err=>console.log(err));
    },[]);

  return (
    <>
    <h1>
        All Trips:
    </h1>
    <ol>
    {
        trips.map(e=><TripCard data={e}/>)
    }
    </ol>
    </>
  )
}

export default TravellerProfile