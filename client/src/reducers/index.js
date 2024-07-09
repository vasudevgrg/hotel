import { combineReducers } from "redux";
import manageHotels from "./manageHotels";
import { manageHotelId } from "./manageHotelId";
import { manageShowModal } from "./manageShowModal";
import manageTotalPages from "./manageTotalPages";
import { manageCurrUser } from "./manageCurrUser";

const rootreducer= combineReducers({manageHotels, manageHotelId, manageShowModal, manageTotalPages, manageCurrUser});

export default rootreducer;