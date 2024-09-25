import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { ModeToggle } from './ModeToggle';

const Header = () => {
  const users = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    console.log(users);
  }, [users]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json',
        },
      });
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDialog(false); // Close dialog on successful login
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src="/logo.svg" alt="logo" />
      <div className='flex items-center gap-5'>
        {users ? (
          <div className='flex gap-5 items-center'>
            {/* Use Link for in-app navigation */}
            <Link to="/my-trips">
              <Button variant="outline" className='rounded-full'>My Trip</Button>
            </Link>

            {/* ModeToggle component */}
            <ModeToggle />

            <Popover>
              <PopoverTrigger>
                <img src={users?.picture} className='h-[30px] w-[30px] rounded-full' alt="User profile" />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className='cursor-pointer'
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  LogOut
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign Up?</DialogTitle>
            <DialogDescription>
              <img src='logo.svg' className='mt-5' alt="logo" />
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

export default Header;
