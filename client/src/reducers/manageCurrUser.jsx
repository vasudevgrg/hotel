const initialState= {};

export const manageCurrUser=(state= initialState, action)=>{
    if(action.type==="currUser"){
        return action.payload;
    }else{
        return state;
    }
}