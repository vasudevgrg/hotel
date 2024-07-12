import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { showPopup } from "../action";
import EditScheduleModal from "../components/RoomPage/EditScheduleModal";

const RoomPage = () => {
  const [dates, setDates] = useState([]);
  const [showModal, setShowModal]= useState(false);
  const [schedule_id, setSchedule_id]= useState(0);
  const [change, setChange]= useState(false);
  let { room_id } = useParams();
  let dispatch = useDispatch();
  useEffect(() => {
    fetch(`http://localhost:5002/room/roomschedule/${room_id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDates(data.dates);
      });
  }, [room_id, change]);

  function toDateString(date) {
    return new Date(date).toISOString().split("T")[0];
  }

  const handleDelete = () => {
    fetch(`http://localhost:5002/room/deleteschedule/${room_id}`,{
        method:'delete',
        credentials:'include'
    })
      .then((e) => e.json())
      .then((e) =>{ dispatch(showPopup({ message: e.message, visible: true })); setChange(e=>!e)});
  };



  return (
    <>
      <h1>Schedule of Room</h1>
      <table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>User</th>
            <th>Edit Schedule</th>
            <th>Delete Schedule</th>
          </tr>
        </thead>
        <tbody>
          {dates.map((schedule, index) => (
            <tr key={index}>
              <td>{toDateString(schedule.startDate)}</td>
              <td>{toDateString(schedule.endDate)}</td>
              <td>{schedule.user_id}</td>
              <td>
                <button onClick={()=>{setSchedule_id(schedule.id); setShowModal(true)}}>Edit This Schedule</button>
              </td>
              <td>
                <button onClick={handleDelete}>Delete Schedule</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        showModal && <EditScheduleModal schedule_id={schedule_id} setShowModal={setShowModal}/>
      }
    </>
  );
};

export default RoomPage;
