import React,{useState} from 'react';
import DatePicker from "react-datepicker";

const BookNowModal = ({setShowBookNow}) => {
    const [startDate, setStartDate]= useState(new Date());
    const [endDate, setEndDate]= useState(new Date());
    const [large, setLarge]= useState(0);
    const [small, setSmall]= useState(0);
const handleBookNow=()=>{
    fetch("")
}

  return (
    <>
    <div className='modal-wrapper' onClick={()=>setShowBookNow(false)}></div>
    <div className='modal-container'>
    <label>
        Start Date Of Journey:
        
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    </label>
     <label>
        End Date of Journey:
       
    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
     </label>
     <label>
        Number of large rooms:
        <input placeholder='Number of Large Rooms' onChange={e=>setLarge(e.target.value)}/>
     </label>
     <label>
        Number of small Romms:
        <input placeholder='Number of Small ROoms'  onChange={e=>setSmall(e.target.value)}/>
     </label>
     <button>Book Now</button>
    </div>
    </>
  )
}

export default BookNowModal