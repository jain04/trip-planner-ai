import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const HotelCardItem = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
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
    <Link
      to={
        'https://www.google.com/maps/search/?api=1&query=' +
        hotel?.hotelName +
        ',' +
        hotel?.hotelAddress
      }
      target='_blank'
    >
      <div className='flex flex-col gap-2 hover:scale-105 transition-all cursor-pointer'>
        {/* Image responsive adjustments */}
        <img
          src={photoUrl ? photoUrl : <AiOutlineLoading3Quarters className='w-7 h-7 animate-spin' />}
          className='rounded-xl h-[180px] w-full object-cover sm:h-[200px] md:h-[240px] lg:h-[280px]'
          alt='Hotel'
        />
        <div className='my-2 gap-2'>
          {/* Font size adjustments for mobile and larger screens */}
          <h2 className='font-medium text-sm md:text-base lg:text-lg text-black dark:text-white'>
            {hotel?.hotelName}
          </h2>
          <h2 className='text-xs md:text-sm text-gray-500 dark:text-gray-400'>
            📍 {hotel?.hotelAddress}
          </h2>
          <h2 className='text-xs md:text-sm text-gray-600 dark:text-gray-300'>
            💳 {hotel?.price}
          </h2>
          <h2 className='text-xs md:text-sm text-gray-600 dark:text-gray-300'>
            ⭐⭐ {hotel?.rating}
          </h2>
        </div>
      </div>

    </Link>
  );
};

export default HotelCardItem;
