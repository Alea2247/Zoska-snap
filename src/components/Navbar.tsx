
// ./src/components/Navbar.tsx

"use client";  // This is a Client Component

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useRouter } from 'next/navigation';  // Use 'next/navigation' for routing
import React, { useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [value, setValue] = useState('/');  // Default value for navigation

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(newValue);  // Navigate to the selected route
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} showLabels>
      <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
      <BottomNavigationAction label="Profile" value="/profile" icon={<AccountCircleIcon />} />
      <BottomNavigationAction label="Post" value="/prispevok" icon={<AddCircleIcon />} />
      <BottomNavigationAction label="Login" value="/prihlasenie" icon={<LoginIcon />} />
      <BottomNavigationAction label="Register" value="/registracia" icon={<AppRegistrationIcon />} />
    </BottomNavigation>
  );
};

export default Navbar;
