"use client";

import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Avatar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useColorMode } from "./ThemeProvider";

const Navbar = () => {
  const { toggleColorMode, mode } = useColorMode();
  const router = useRouter();
  const { data: session } = useSession();

  const handleNavigation = (event: React.SyntheticEvent, newValue: string) => {
    router.push(newValue);
  };

  const nonAuthPaths = [
    { label: "Domov", value: "/", icon: <HomeIcon /> },
    { label: "Podmienky", value: "/podmienky", icon: <AddCircleIcon /> },
    { label: "GDPR", value: "/gdpr", icon: <HomeIcon /> },
    { label: "O-nas", value: "/o-nas", icon: <HomeIcon /> },
    { label: "Registrácia", value: "/auth/registracia", icon: <AppRegistrationIcon /> },
    { label: "Prihlásenie", value: "/auth/prihlasenie", icon: <LoginIcon /> },
  ];

  const authPaths = [
    { label: "Domov", value: "/", icon: <HomeIcon /> },
    { label: "Hľadať", value: "/hladat", icon: <SearchIcon /> },
    { label: "Prispevok", value: "/prispevok", icon: <AddCircleIcon /> },
    { label: "Notifikacie", value: "/notifikacie", icon: <SearchIcon /> },
    {
      label: "Profil",
      value: "/profile",
      icon: session?.user?.image ? (
        <Avatar alt={session?.user?.name || "User"} src={session?.user?.image || undefined} />
      ) : (
        <Avatar>{session?.user?.name?.charAt(0) || "U"}</Avatar>
      ),
    },
    { label: "Odhlásiť", value: "/auth/odhlasenie", icon: <LogoutIcon /> },
  ];

  const paths = session ? authPaths : nonAuthPaths;

  return (
    <>
      <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
        <BottomNavigation showLabels>
          {paths.map((path) => (
            <BottomNavigationAction
              key={path.value}
              label={path.label}
              value={path.value}
              icon={path.icon}
              onClick={(event) => handleNavigation(event, path.value)}
            />
          ))}
          <BottomNavigationAction
            label=""
            icon={mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            onClick={toggleColorMode}
          />
        </BottomNavigation>
      </Box>
    </>
  );
};

export default Navbar;