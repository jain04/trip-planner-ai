import React from 'react';
import Header from './components/custom/Header'; // Import your Header component
import { Outlet } from 'react-router-dom'; // Import Outlet to render the nested route components

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        {/* This will render the current route's component */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
