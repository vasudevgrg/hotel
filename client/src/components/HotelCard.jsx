import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Chat from './Chat';
import Cookies from 'js-cookie';

const HotelCard = ({ data, startDate, endDate, large, small }) => {
  const [smallRoomPrice, setSmallRoomPrice] = useState(0);
  const [largeRoomPrice, setLargeRoomPrice] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const userIdFromCookie = Cookies.get('user_id');
    if (userIdFromCookie) {
      setUserId(userIdFromCookie);
    } else {
      console.log('User ID cookie not found');
    }

    data.Rooms.forEach(e => {
      if (e.size === "large") {
        setLargeRoomPrice(e.price);
      } else if (e.size === "small") {
        setSmallRoomPrice(e.price);
      }
    });
  }, [data]);

  const handleHotelBook =async  () => {
const bookhotel= await fetch("http://localhost:5002/hotel/bookhotel", {
    method:"POST",
    body:JSON.stringify({
        hotel_id: data.id,
        startDate:startDate,
        endDate:endDate,
        large:large,
        small:small
    }),
    headers:{
        "Content-Type":"application/json"
    },
    credentials:"include"
});

const res= await bookhotel.json();
console.log(res);


  await  fetch("http://localhost:5002/traveller/addtrip", {
      method: "POST",
      body: JSON.stringify({
        location: data.Location.name,
        startDate: startDate,
        endDate: endDate,
        hotel_id: data.id
      }),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'
    }).then(e => e.json()).then(e => console.log(e));
  };

  return (
    <>
      <div className='hotelcard'>
        <img src={data.hotel_pic} alt='Hotel' className='hotelcard-img' />
        <div className='hotelcard-info'>
          <h2>{data.name}</h2>
          <p>{data.Location.name}</p>
          <div className='hotelcard-details'>
            <span>Rating: {data.rating} / 5</span>
            <span>Price of small Room: ${smallRoomPrice} per night</span>
            <span>Price of Large Room: ${largeRoomPrice} per night</span>
          </div>
          <button onClick={handleHotelBook} className='hotelcard-button'>Book Now</button>
          <button className='hotelcard-button' onClick={() => setShowChat(e => !e)}>Chat with Hotel</button>
          {showChat && userId && <Chat user_id={userId} receiver_id={data.id} />}
        </div>
      </div>
    </>
  );
};

export default HotelCard;
