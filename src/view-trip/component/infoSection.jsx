import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const InfoSection = ({ trip }) => {
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
    <div className='p-6 md:px-10 lg:px-20 xl:px-32'>
      <img
        src={photoUrl ? photoUrl : <AiOutlineLoading3Quarters className='w-7 h-7 animate-spin' />}
        className='h-[240px] md:h-[400px] w-full object-cover rounded-xl'
        alt='Location'
      />

      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-7'>
        <div className='flex flex-col gap-2'>
          <h2 className='font-bold text-xl md:text-2xl'>
            {trip?.userSelection?.location?.label}
          </h2>

          <div className='flex flex-wrap gap-2'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>
              📆 {trip?.userSelection?.noOfDays} Days
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>
              💲 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>
              🥂 No of travelers: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>

        <Button className='self-start md:self-auto'>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
