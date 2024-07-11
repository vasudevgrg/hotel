import React from 'react'

const Ratings = ({ratings}) => {
  return (
    <>
     {
            ratings.map(e=>(
                <>
                <div style={{display:'flex', flexDirection:'column'}}>
                Rating: {e.rating}
                Review:{e.comment}
                </div>
                </>
            ))
        }
    </>
  )
}

export default Ratings