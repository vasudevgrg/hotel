import { combineReducers } from "redux";
import manageHotels from "./manageHotels";
import { manageHotelId } from "./manageHotelId";
import { manageShowModal } from "./manageShowModal";
import manageTotalPages from "./manageTotalPages";
import { manageCurrUser } from "./manageCurrUser";
import { managePopup } from "./managePopup";
import { managePrice } from "./managePrice";
import managePageno from "./managePageno";

const rootreducer= combineReducers({manageHotels, manageHotelId, manageShowModal, manageTotalPages, manageCurrUser, managePopup, managePrice, managePageno});

export default rootreducer;