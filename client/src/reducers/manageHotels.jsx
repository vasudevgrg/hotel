let initialState= [];

const manageHotels=(state=initialState, action)=>{
    if(action.type==="hotels"){
    return action.payload;
    }else{
        return state;
    }
}

export default manageHotels;