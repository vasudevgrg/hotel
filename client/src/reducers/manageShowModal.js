let initialState=false;

export const manageShowModal=(state=initialState, action)=>{
    if(action=="showModal"){
        return action.payload;
    }else{
        return state;
    }
};