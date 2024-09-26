import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOption, SelectTravelsList } from '../constants/options.jsx';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button.jsx';
import { toast } from 'sonner';
import { chatSession } from '@/services/AIModel.jsx';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/services/fireBaseConfig.jsx';
import { useNavigate } from 'react-router-dom';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const CreateTrip = () => {
  const [place, setplace] = useState();
  const [formData, setformData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setformData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json',
        },
      })
      .then((resp) => {
        console.log(resp);
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.noOfDays > 10 || !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all details.");
      return;
    }

    setloading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response.text());
    setloading(false);
    SaveAiTrip(result?.response.text());
  };

  const SaveAiTrip = async (TripData) => {
    setloading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setloading(false);
    navigate('/view-trip/' + docId);
  };

  return (
    <div className='p-6 md:px-10 lg:px-20 xl:px-32'>
      <h1 className='font-bold text-2xl md:text-3xl mt-2'>Tell us your Travel Preference 🏕️🌴</h1>
      <p className='mt-3 text-gray-500 text-lg md:text-xl'>
        Just provide us with some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <img src="/Designer.png" className='mt-3 h-[400px] w-full object-contain' />

      <div className='mt-10 md:mt-20'>
        <div>
          <h2 className='text-lg md:text-xl my-3 font-medium'>What is the destination of your choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setplace(v);
                handleInputChange('location', v);
              },
            }}
          />
        </div>

        <div>
  <h2 className='text-lg md:text-xl my-3 font-medium'>How many days are you planning for your trip?</h2>
  <Input
    placeholder={'Ex. 3'}
    type='number'
    max='10' // Set maximum value to 10
    onChange={(e) => {
      const value = e.target.value;
      // Prevent user from entering more than 10 days
      if (value <= 10) {
        handleInputChange('noOfDays', value);
      }else{
        toast("value should be less than 10.");
      }
    }}
  />
</div>


        <div>
          <h2 className='text-lg md:text-xl my-3 font-medium'>What is your Budget?</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOption.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.budget === item.title
                    ? 'shadow-lg border-black dark:border-gray-300 bg-white dark:bg-gray-700' // Selected: Black border in light, gray in dark mode
                    : 'dark:bg-gray-800' // Default background for dark mode
                  }`}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className={`font-bold text-lg ${formData?.budget === item.title ? 'text-black dark:text-white' : 'dark:text-gray-300'}`}>
                  {item.title}
                </h2>
                <h2 className='text-sm text-gray-500 dark:text-gray-400'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>


        <div>
          <h2 className='text-lg md:text-xl my-3 font-medium'>Who are you planning to travel with?</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.traveler === item.people
                    ? 'shadow-lg border-black dark:border-gray-300 bg-white dark:bg-gray-700' // Selected: Light and Dark mode styling
                    : 'dark:bg-gray-800' // Non-selected background in dark mode
                  }`}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className={`font-bold text-lg ${formData?.traveler === item.people ? 'text-black dark:text-white' : 'dark:text-gray-300'}`}>
                  {item.title}
                </h2>
                <h2 className='text-sm text-gray-500 dark:text-gray-400'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>


        <div className='my-10 flex justify-end'>
          <Button onClick={onGenerateTrip} disabled={loading}>
            {loading ? <AiOutlineLoading3Quarters className='w-7 h-7 animate-spin' /> : 'Generate Trip'}
          </Button>
        </div>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign Up?</DialogTitle>
            <DialogDescription>
              <img src='logoipsum-245.svg' className='mt-5' />
              <h2 className='mt-7 font-bold text-lg'>Sign In with Google</h2>
              <p>Sign in with Google for authentication</p>
              <Button className='w-full mt-5 flex gap-4 items-center text-center' onClick={login}>
                <FcGoogle className='h-7 w-7' />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
