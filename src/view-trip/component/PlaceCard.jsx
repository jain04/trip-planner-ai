import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react';
import { FaLocationArrow } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const PlaceCard = ({ place }) => {

  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName,
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
      to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName}
      target='_blank'
    >
      <div className='shadow-md rounded-xl p-4 mt-3 flex flex-col md:flex-col sm:flex-row gap-3 sm:gap-5 hover:scale-105 transition-all hover:shadow-lg cursor-pointer'>
        {/* Image with responsive height and width */}
        <img
          src={photoUrl ? photoUrl : <AiOutlineLoading3Quarters className='w-7 h-7 animate-spin' />}
          className='h-[160px] w-full sm:w-[180px] rounded-xl object-cover'
          alt='Place'
        />

        <div className='flex flex-col'>
          {/* Font size adjustments for different screen sizes */}
          <h2 className='font-bold text-md sm:text-lg text-black dark:text-white'>
            {place.placeName}
          </h2>
          <p className='text-xs sm:text-sm text-gray-400 dark:text-gray-300'>
            {place.placeDetails}
          </p>
        </div>
      </div>

    </Link>
  );
};

export default PlaceCard;
