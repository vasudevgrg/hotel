const initialState= null;

export const manageCurrUser=(state= initialState, action)=>{
    if(action=="hotelId"){
        return action.payload;
    }else{
        return state;
    }
}