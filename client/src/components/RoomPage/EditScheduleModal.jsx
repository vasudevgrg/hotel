import DatePicker from "react-datepicker";
import { useState } from "react";

import React from 'react'
import { useDispatch } from "react-redux";
import { showPopup } from "../../action";

const EditScheduleModal = ({schedule_id, setShowModal}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const dispatch= useDispatch();
    const handleUpdateSchedule=()=>{
        fetch(`http://localhost:5002/room/updateschedule/${schedule_id}`,{
            method:'PUT',
            body:JSON.stringify({
                startDate: startDate,
                endDate:endDate
            }),
            headers:{
                "Content-Type":"application/json"
            },
            credentials:'include'
        }).then(e=>e.json()).then(e=>{
            setShowModal(false);
            dispatch(showPopup({message:e.message, visible:true}))
        });
    }
  return (
    <><div className='modal-wrapper' ></div>
    <div className='modal-container'>
    <label>
        Edit Start Date:
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
    </label>
    <label>
        Edit End Date:
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
    </label>
    <button onClick={handleUpdateSchedule}> Update this schedule</button>
    </div></>



  )
}

export default EditScheduleModal