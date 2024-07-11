const initialState= "";

export const manageHotelId=(state= initialState, action)=>{
    if(action.type=="hotelId"){
        return action.payload;
    }else{
        return state;
    }
}