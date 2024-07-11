import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import RegisterHotel from "./Pages/RegisterHotel";
import RegisterUser from "./Pages/RegisterUser";
import MainPage from "./Pages/MainPage";
import HotelAdminPage from "./Pages/HotelAdminPage";
import Chat from "./components/Chat";
import LoginPage from "./Pages/LoginPage";
import HotelPage from "./Pages/HotelPage";
import TravellerProfile from "./Pages/TravellerProfile";
import Popup from "./components/Popup";
import ChangePassword from "./Pages/ChangePassword";
import ProtectedRoute from "./utils/AdminProtectedRoutes/ProtectedRoute";
import Navbar from "./components/Navbar";
import AccessDenied from "./Pages/Error/AccessDenied";

function App() {
  return (
    <>
   
      <BrowserRouter>
      <Navbar/>
        <Routes>
          
          <Route path='/register' element={<RegisterUser/>} />
          <Route path="registerhotel" element={<RegisterHotel/>}/>
          <Route path='/' element={<MainPage/>} />
          <Route path='/hoteladmin' element={<ProtectedRoute><HotelAdminPage/></ProtectedRoute>}/>
          <Route path="/chat" element={<Chat/>} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/hoteladmin/:hotelId" element={<HotelPage/>}  />
          <Route path="/travellerprofile" element={<TravellerProfile/>}/>
          <Route path="/changepassword" element={<ChangePassword/>}/>
          <Route path="/accessdenied" element={<AccessDenied/>}/>
        </Routes>
      </BrowserRouter>
      <Popup/>
    </>
  );
}

export default App;
