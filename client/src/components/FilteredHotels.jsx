import React from 'react';
import { useSelector } from 'react-redux';
import HotelCard from './HotelCard';
import Pagination from './Pagination';

const FilteredHotels = ({ startDate, endDate, large, small, setShowFilter }) => {
    const filteredHotels = useSelector(state => state.manageHotels);

    return (
        <>
        <Pagination/>
        <button onClick={()=>setShowFilter(true)}>Show Filters</button>
            {filteredHotels.map(hotel => (
                <HotelCard key={hotel.id} data={hotel} startDate={startDate} endDate={endDate} large={large} small={small}/>
            ))}
        
        </>
    );
};



export default FilteredHotels;
