let initialState= 0;

const manageTotalPages=(state=initialState, action)=>{
    if(action.type==="totalPages"){
    return action.payload;
    }else{
        return state;
    }
}

export default manageTotalPages;