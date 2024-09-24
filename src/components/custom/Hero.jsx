import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='p-6 md:px-10 lg:px-20 xl:px-32'>
      <div className='flex flex-col items-center mx-auto gap-6 max-w-4xl'>
        <h1 className='font-extrabold text-3xl md:text-4xl lg:text-5xl text-center mt-4'>
          <span className='text-[#f56672]'>Your adventure begins here!</span> 
          Plan, explore, and discover the world with ease—one trip at a time.
        </h1>
        <p className='text-lg md:text-xl text-gray-500 text-center'>
          Discover a world of travel possibilities with our intuitive trip planner. From dream destinations to personalized itineraries, we help you explore, organize, and enjoy every moment of your journey. Whether you're a solo adventurer or planning a family getaway, we've got everything you need to make your travel experience seamless and unforgettable.
        </p>
        <Link to={'/create-trip'}>
          <Button>Get Started! It's free..</Button>
        </Link>
        <img src="/d3.png"  />
      </div>
    </div>
  );
};

export default Hero;

