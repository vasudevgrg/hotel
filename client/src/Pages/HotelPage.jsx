import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ratings from "../components/HotelPage/Ratings";
import BookRoom from "../components/HotelPage/BookRoom";
import ShowRooms from "../components/HotelPage/ShowRooms";

const HotelPage = () => {
  const [data, setData] = useState({});
  const [rooms, setRooms] = useState([]);
  const [ratings, setratings]= useState([]);


  let { hotelId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5002/hotel/gethotel/${hotelId}`, {
      credentials: "include",
    })
      .then((e) => e.json())
      .then((e) => {
        setData(e.hotel);
        setRooms(e.hotel.Rooms);
        console.log(e);
      });

      fetch(`http://localhost:5002/hotel/getratings/${hotelId}`,{
        credentials:'include'
      }).then(e=>e.json()).then(e=>setratings(e.ratings));
  }, []);

  return (
    <>
    <div className="hotelPage">
      <div>
        <img src={data.hotel_pic} style={{ height: "150px", width: "150px" }} />
        <h2>{data.name}</h2>
       <ShowRooms rooms={rooms}/>
      </div>
      <div>
        <h2>Book Rooms</h2>
      <BookRoom data={data} hotelId={hotelId}/>
      </div>
      <div>
        <h1>All ratings</h1>
       <Ratings ratings={ratings}/>
      </div>
      </div>
    </>
  );
};

export default HotelPage;
