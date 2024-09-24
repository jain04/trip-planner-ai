import React from 'react';
import HotelCardItem from './HotelCardItem';

const Hotels = ({ trip }) => {
  return (
    <div className='p-6 md:px-10 lg:px-20 xl:px-32'>
      <h2 className='font-bold text-lg md:text-xl'>Hotel Recommendations</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5'>
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Hotels;
