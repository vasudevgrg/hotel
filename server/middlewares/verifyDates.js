




const filterHotel= (arr, obj)=>{
    for(let i=0;i<arr.length-1;i++){
        if(arr[i].endDate<=obj.startDate && arr[i+1].startDate>=obj.endDate){
            return true;
        }
    };
    if(arr[arr.length-1].endDate<=obj.startDate){
        return true;
    }else{
        return false;
    }
}