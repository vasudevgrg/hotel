const initialState= 1000;

export const managePrice=(state= initialState, action)=>{
    if(action.type==="price"){
        return action.payload;
    }else{
        return state;
    }
}