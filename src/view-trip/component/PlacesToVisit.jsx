import React from 'react';
import PlaceCard from './PlaceCard';

const PlacesToVisit = ({ trip }) => {
  return (
    <div className='p-6 md:px-10 lg:px-20 xl:px-32'>
      <h2 className='font-bold text-lg md:text-xl mt-10'>Places to Visit</h2>

      <div>
        {trip?.tripData?.itinerary?.map((item, index) => {
          return (
            <div key={index} className='mt-8'>
              <h2 className='mt-5 font-bold text-xl md:text-2xl'>Day-{item.day}</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-4'>
                {item.plan.map((place, index) => (
                  <div key={index} className='my-3'>
                    <h2 className='font-medium text-sm text-orange-400'>
                      {place?.bestTimeToVisit}
                    </h2>
                    <PlaceCard place={place} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlacesToVisit;
