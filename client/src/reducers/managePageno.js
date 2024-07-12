let initialState= 0;

const managePageno=(state=initialState, action)=>{
    if(action.type==='pageno'){
    return action.payload;
    }else{
        return state;
    }
}

export default managePageno;