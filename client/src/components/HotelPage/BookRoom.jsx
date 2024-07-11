import React,{useState} from 'react'
import DatePicker from "react-datepicker";

const BookRoom = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [availableRooms, setAvailableRooms] = useState([]);

    const handleAvailableRooms = ({data}) => {
        fetch("http://localhost:5002/hotel/availablerooms", {
          method: "POST",
          body: JSON.stringify({
            startDate: startDate,
            endDate: endDate,
            hotel_id: data.id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
          .then((e) => e.json())
          .then((e) => {
            console.log(e);
            setAvailableRooms(e.rooms);
          });
      };

      const handleBook=()=>{
        
      }
  return (
    <>
      <label>
          Start Date:
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </label>
        <label>
          End Date:
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </label>
        <button onClick={handleAvailableRooms}>Show Available Rooms</button>
        <div>
          {availableRooms.map((e) => (
            <table>
              <tr>
                <th>Room No</th>
                <th>Size</th>
                <th>Vacancy</th>
                <th>Book this room</th>
              </tr>
              {
                <tr>
                  <td>{e.room_no}</td>
                  <td>{e.size}</td>
                  <td>{e.vacancy && "T"}</td>
                  <td>
                    <button onClick={handleBook}>Book Now</button>
                  </td>
                </tr>
              }
            </table>
          ))}
        </div>
    </>
  )
}

export default BookRoom