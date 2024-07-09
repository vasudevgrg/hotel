import React from 'react';
import { useSelector } from 'react-redux';
import HotelCard from './HotelCard';

const FilteredHotels = ({ startDate, endDate, large, small, setShowFilter }) => {
    const filteredHotels = useSelector(state => state.manageHotels);
    const totalPages = useSelector(state => state.manageTotalPages);
    const [currentPage, setCurrentPage] = React.useState(1);

    const handlePageClick = (page) => {
        setCurrentPage(page);
        // Here you can also fetch the data for the selected page
        // if it's not already available in the state
    };

    return (
        <>
        <button onClick={()=>setShowFilter(true)}>Show Filters</button>
            {filteredHotels.map(hotel => (
                <HotelCard key={hotel.id} data={hotel} startDate={startDate} endDate={endDate} large={large} small={small}/>
            ))}
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageClick={handlePageClick} />
        </>
    );
};

const Pagination = ({ totalPages, currentPage, onPageClick }) => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <button 
                key={i} 
                onClick={() => onPageClick(i)} 
                style={{ margin: '0 5px', backgroundColor: currentPage === i ? 'lightgray' : 'white' }}
            >
                {i}
            </button>
        );
    }

    return (
        <div>
            {pages}
        </div>
    );
};

export default FilteredHotels;
