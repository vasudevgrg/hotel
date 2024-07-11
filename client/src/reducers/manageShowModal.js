let initialState=false;

export const manageShowModal=(state=initialState, action)=>{
    if(action.type==="showModal"){
        return action.payload;
    }else{
        return state;
    }
};