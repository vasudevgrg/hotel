
export const hotels=(payload)=>{
    return{
        type:"hotels",
        payload:payload

    }
};

export const showModal=(payload)=>{
    return {
        type:"showModal",
        payload:payload
    }
}

export const hotelId=(payload)=>{
    return {
        type:"hotelId",
        payload:payload
    }
}

export const totalPages=(payload)=>{
    return {
        type:"totalPages",
        payload:payload
    }
}

export const currUser=(payload)=>{
    return{
        type:"currUser",
        payload:payload
    }
}