import { db } from '@/services/fireBaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCard from './Components/UserTripCard';

const MyTrips = () => {
  useEffect(() => {
    GetUserTrips();
  }, []);

  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  const GetUserTrips = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        navigate('/'); // Redirect if user is not logged in
        return;
      }

      const tripsArray = [];
      const q = query(collection(db, 'AITrips'), where('userEmail', '==', user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        tripsArray.push(doc.data());
      });
      setUserTrips(tripsArray);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:px-10 lg:px-20 xl:px-32">
      <h2 className="font-bold text-xl sm:text-2xl md:text-3xl">My Trips</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 mt-5">
        {userTrips?.length > 0 ? 
          userTrips.map((trip, index) => {
            return <UserTripCard trip={trip} key={index} />;
          }) : 
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div key={index} className="h-[250px] w-full bg-slate-200 animate-pulse rounded-xl"></div>
          ))
        }
      </div>
    </div>
  );
};

export default MyTrips;
