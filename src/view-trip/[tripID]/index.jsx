import { db } from '@/services/fireBaseConfig';
import { Toast } from '@radix-ui/react-toast';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfoSection from '../component/infoSection';
import Hotels from '../component/Hotels';
import PlacesToVisit from '../component/PlacesToVisit';
import Footer from '../component/Footer';


const ViewTrip = () => {
  const { tripID } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripID && getTripData();
  }, [tripID]);

  const getTripData = async () => {
    const docRef = doc(db, 'AITrips', tripID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document:', docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log('No Document Found');
      Toast('No trip Found');
    }
  };

  return (
    <div className='p-6 md:px-10 lg:px-20 xl:px-32'>
      {/* Information section */}
      <InfoSection trip={trip} />
      {/* Hotel recommendation */}
      <Hotels trip={trip} />
      {/* Daily plans */}
      <PlacesToVisit trip={trip} />
      {/* Footer */}
      <Footer trip={trip} />
    </div>
  );
};

export default ViewTrip;
