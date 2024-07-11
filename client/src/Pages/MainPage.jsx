import React from 'react'
import MainPageInput from '../components/MainPageInput'
import FilteredHotels from '../components/FilteredHotels'
import Navbar from '../components/Navbar';
import Cookies from "js-cookie";

const MainPage = () => {

    React.useEffect(()=>{
        const user_id= Cookies.get("user_id");
        

    })
  return (
   <>
   <MainPageInput/>
   
   </>
  )
}

export default MainPage