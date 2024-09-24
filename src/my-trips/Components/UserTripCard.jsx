import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const UserTripCard = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data);
      const Photourl = PHOTO_REF_URL.replace(
        '{Name}',
        resp.data.places[0].photos[4].name
      );
      console.log(Photourl);
      setPhotoUrl(Photourl);
    });
  };

  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className="hover:scale-105 transition-all hover:shadow-md rounded-lg overflow-hidden">
        {/* Responsive Image */}
        <img
          src={photoUrl ? photoUrl : <AiOutlineLoading3Quarters className='w-7 h-7 animate-spin' />}
          className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg"
          alt={trip?.userSelection?.location?.label || 'Trip Image'}
        />
        <div className="p-4">
          {/* Responsive Text */}
          <h2 className="font-bold text-base sm:text-lg md:text-xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-gray-400 text-xs sm:text-sm md:text-base">
            {trip?.userSelection.noOfDays} Days trip with{' '}
            {trip?.userSelection.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCard;
