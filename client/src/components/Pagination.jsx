import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import managePageno from '../reducers/managePageno';
import { pageno } from '../action';

const Pagination = () => {
  const [pagenos, setPagenos] = React.useState([]);
  const [currPage, setCurrPage]= useState(0);
  const totalPages = useSelector(state => state.manageTotalPages);
  const dispatch= useDispatch();

  React.useEffect(() => {
    const pagesArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesArray.push(i);
    }
    setPagenos(pagesArray);
  }, [totalPages]);

  const handlePage=(e)=>{
    
    dispatch(pageno(e));
  }

  return (
    <div>
      {pagenos.map(page => (
        <button key={page} onClick={()=>handlePage(page)}>{page}</button>
      ))}
    </div>
  );
}

export default Pagination;
