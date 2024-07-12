import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hotels, totalPages } from "../action";
import FilterModal from "./FilterModal";
import DatePicker from "react-datepicker";
import FilteredHotels from "./FilteredHotels";

import "react-datepicker/dist/react-datepicker.css";

const MainPageInput = () => {
  const [location, setLocation] = useState("");
  const [large, setLarge] = useState(0);
  const [small, setSmall] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showFilter, setShowFilter] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState([]);

  const price = useSelector((e) => e.managePrice);
  const pageno = useSelector((e) => e.managePageno);
  const dispatch = useDispatch();

  const fetchCitySuggestions = async (query) => {
    fetch(`http://localhost:5002/hotel/cities/suggestions?cityName=${query}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCitySuggestions(data.cities);
      });
  };

  useEffect(() => {
    if (location.length > 2) {
      fetchCitySuggestions(location);
    } else {
      setCitySuggestions([]);
    }
  }, [location]);

  const handleSearchHotels = () => {
    fetch(
      `http://localhost:5002/hotel/gethotels?pageSize=2&pageNumber=${pageno}&price=${price}`,
      {
        method: "POST",
        body: JSON.stringify({
          location: location,
          large: large,
          small: small,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )
      .then((e) => e.json())
      .then((e) => {
        console.log(e);
        dispatch(totalPages(e.totalPages));
        dispatch(hotels(e.hotels));
      });
  };

  useEffect(() => {
    handleSearchHotels();
  }, [pageno]);

  return (
    <>
      <h1>Over 174,000+ hotels and homes across 35+ countries</h1>
      <div className="mainpageinput">
        <input
          placeholder="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          placeholder="Number of Large Rooms"
          value={large}
          onChange={(e) => setLarge(e.target.value)}
        />
        <input
          placeholder="Number of Small Rooms"
          value={small}
          onChange={(e) => setSmall(e.target.value)}
        />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        <button
          onClick={handleSearchHotels}
          style={{ display: "flex", margin: "50px" }}
        >
          Search
        </button>
        {citySuggestions.length > 0 && (
          <div className="city-suggestions">
            {citySuggestions.map((city, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => {
                  setLocation(city.name);
                  setCitySuggestions([]);
                }}
              >
                {city.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <FilteredHotels
        startDate={startDate}
        endDate={endDate}
        large={large}
        small={small}
        setShowFilter={setShowFilter}
      />
      {showFilter && (
        <FilterModal
          setShowFilter={setShowFilter}
        />
      )}
    </>
  );
};

export default MainPageInput;
