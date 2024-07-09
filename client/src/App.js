import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import RegisterHotel from "./Pages/RegisterHotel";
import RegisterUser from "./Pages/RegisterUser";
import MainPage from "./Pages/MainPage";
import Profile from "./Pages/Profile";
import HotelAdminPage from "./Pages/HotelAdminPage";
import Chat from "./components/Chat";
import LoginPage from "./Pages/LoginPage";
import HotelPage from "./Pages/HotelPage";
import TravellerProfile from "./Pages/TravellerProfile";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<RegisterUser/>} />
      <Route path="registerhotel" element={<RegisterHotel/>}/>
      <Route path='/' element={<MainPage/>} />
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/hoteladmin' element={<HotelAdminPage/>}/>
      <Route path="/chat" element={<Chat/>} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/hoteladmin/:hotelId" element={<HotelPage/>}  />
      <Route path="/travellerprofile" element={<TravellerProfile/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
