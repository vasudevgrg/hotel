import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterHotel = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [room_no, setRoom_no] = useState(0);
    const [price, setPrice] = useState(0);
    const [size, setSize] = useState("");
    const [file, setFile] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [amenity, setAmenity] = useState("");
    const [amenities, setAmenities] = useState([]);
    const [smallRoomPrice, setSmallRoomPrice] = useState(0);
    const [largeRoomPrice, setLargeRoomPrice] = useState(0);
    const [successMessage, setSuccessMessage] = useState("");

    const CLOUD_NAME = "dpei9fenp";
    const API_KEY = '416562346876343';

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const r1 = await fetch("http://localhost:5002/hotel/signedurl", {
                credentials: 'include'
            });

            const r2 = await r1.json();
            const { timestamp, signature } = r2.signedUrl;
            const form = new FormData();
            form.append('file', file);
            const r3 = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload?api_key=${API_KEY}&timestamp=${timestamp}&signature=${signature}`,
                {
                    method: 'POST',
                    body: form,
                }
            );
            const r4 = await r3.json();
            console.log(r4);
            const r5 = await fetch("http://localhost:5002/hotel/createhotel", {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    location: location,
                    hotel_pic: r4.secure_url,
                    rooms: rooms,
                    amenities: amenities,
                    smallRoomPrice: smallRoomPrice,
                    largeRoomPrice: largeRoomPrice
                }),
                headers: {
                    "Content-Type": 'application/json'
                },
                credentials: 'include'
            });

            const r6 = await r5.json();
            console.log(r6);

            if (r5.ok) {
                setSuccessMessage(r6.message);
                setTimeout(() => {
                    setSuccessMessage("");
                }, 5000);
            }

            setFile(null);
            setRoom_no(0);
            setPrice(0);
            setSmallRoomPrice(0);
            setLargeRoomPrice(0);
            setRooms([]);
            setAmenities([]);
            navigate("/registerhotel");

        } catch (err) {
            console.log(err);
        }
    }

    const handleAddRoom = () => {
        console.log(rooms);
        setRooms([...rooms, { room_no: room_no, price: price, size: size }]);
        setRoom_no(0);
        setPrice(0);
    }

    const handleAmenity = () => {
        setAmenities([...amenities, amenity]);
        setAmenity("");
    }

    return (
        <>
            {successMessage && <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'green', color: 'white', padding: '10px', zIndex: 1000 }}>
                {successMessage}
            </div>}
            <div className='hotelregister'>
                <label>
                    Name of Hotel:
                    <input onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    Hotel Photo:
                    <input type='file' onChange={e => setFile(e.target.files[0])} />
                </label>
                <label>
                    Location of Hotel:
                    <input onChange={e => setLocation(e.target.value)} />
                </label>
                <label>
                    Details of Number of Rooms:
                    <div>
                        <label>
                            Room Number:
                            <input onChange={e => setRoom_no(e.target.value)} />
                        </label>
                        <label>
                            Size:
                            <select onChange={e => setSize(e.target.value)}>
                                <option value='large'>Large</option>
                                <option value='small'>Small</option>
                            </select>
                        </label>
                        <button onClick={handleAddRoom}>Add Another Room</button>
                    </div>
                    <hr />
                    Price of Small Room:
                    <input onChange={e => setSmallRoomPrice(e.target.value)} />
                    Price of Large Room:
                    <input onChange={e => setLargeRoomPrice(e.target.value)} />
                </label>

                <label>
                    Amenities:
                    <input value={amenity} type='text' onChange={e => setAmenity(e.target.value)} />
                    <button onClick={handleAmenity}> Add Amenity</button>
                </label>

                <button onClick={handleRegister}>Register Hotel</button>
            </div>
            <div>

                <button>Register Another Hotel</button>
                <button > Go to admin Page</button>
            </div>
        </>
    )
}

export default RegisterHotel;
