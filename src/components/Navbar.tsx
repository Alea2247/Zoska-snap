
// /src/components/Navbar.tsx

"use client";

import * as React from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Avatar, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { useThemeContext } from '../providers/ThemeProvider';
import { darkTheme } from '@/styles/themes';

export default function Navbar() {
  const [value, setValue] = React.useState('/');
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toggleTheme, themeMode } = useThemeContext();

  const handleNavigation = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(newValue);
  };

  // Non-authenticated navigation paths
  const nonAuthPaths = [
    { label: "Domov", value: "/", icon: <HomeIcon /> },
    { label: "Prispevky", value: "/prispevok", icon: <AddCircleIcon /> },
    { label: "Registrácia", value: "/auth/registracia", icon: <AppRegistrationIcon /> },
    { label: "Prihlásenie", value: "/auth/prihlasenie", icon: <LoginIcon /> }
  ];

  // Authenticated navigation paths
  const authPaths = [
    { label: "Domov", value: "/", icon: <HomeIcon /> },
    { label: "Hľadať", value: "/hladat", icon: <SearchIcon /> },
    { label: "Pridať", value: "/prispevok", icon: <AddCircleIcon /> },
    {
      label: "Profil",
      value: "/profil",
      icon: session?.user?.image ? (
        <Avatar 
          alt={session?.user?.name || "User"} 
          src={session?.user?.image || undefined} 
        />
      ) : (
        <Avatar>{session?.user?.name?.charAt(0) || "U"}</Avatar>
      )
    },
    { label: "Odhlásiť", value: "/auth/odhlasenie", icon: <LogoutIcon /> },
  ];

  // Decide which paths to use based on authentication status
  const navigationPaths = status === "authenticated" ? authPaths : nonAuthPaths;

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: (theme) => theme.palette.background.paper,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // Make sure space between nav and button is correct
        px: 2,
      }}
    >
      {/* Navigation Section */}
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigation}
        sx={{ flexGrow: 1 }} // Let navigation take most of the width
      >
        {navigationPaths.map((path) => (
          <BottomNavigationAction
            key={path.value}
            label={path.label}
            value={path.value}
            icon={path.icon}
          />
        ))}
      </BottomNavigation>

      {/* Theme Toggle Section */}
      <IconButton
        onClick={toggleTheme}
        sx={{
          color: (theme) => theme.palette.text.primary,
          ml: 2,
        }}
      >
        {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Box>
  );
}

// return (
//   <Box sx={{ width: '100%', position: 'fixed', bottom: 0, zIndex: 5000 }}>
//     <BottomNavigation
//       showLabels
//       value={value}
//       onChange={handleNavigation}
//     >
//       {/* Navigácia a ikony */}
//       <BottomNavigationAction label="Domov" value="/" icon={<HomeIcon />} />
//       <BottomNavigationAction label="Hľadať" value="/hladat" icon={<SearchIcon />} />
//       <BottomNavigationAction label="Pridať" value="/prispevok" icon={<AddCircleIcon />} />
//       <BottomNavigationAction label="Prihlásenie" value="/auth/prihlasenie" icon={<LoginIcon />} />

//       {/* Tlačidlo na prepínanie témy */}
//       <IconButton 
//         onClick={toggleTheme} 
//         sx={{ position: 'absolute', right: 16, bottom: 16, zIndex: 1100 }}
//       >
//         {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
//       </IconButton>
//     </BottomNavigation>
//   </Box>
// );
// }