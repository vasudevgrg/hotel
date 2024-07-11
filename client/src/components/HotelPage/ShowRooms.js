import React from 'react'

const ShowRooms = ({rooms}) => {
  return (
    <>
     <table>
          <tr>
            <th>Room No</th>
            <th>Size</th>
            <th>Vacancy RIght Now</th>
          </tr>
          {rooms.map((e) => (
            <tr>
              <td>{e.room_no}</td>
              <td>{e.size}</td>
              <td>{e.vacancy && "T"}</td>
            </tr>
          ))}
        </table>
    </>
  )
}

export default ShowRooms