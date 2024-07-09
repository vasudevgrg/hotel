const initialState= "";

export const manageHotelId=(state= initialState, action)=>{
    if(action=="hotelId"){
        return action.payload;
    }else{
        return state;
    }
}