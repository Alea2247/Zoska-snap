"use client";

import * as React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LoginIcon from "@mui/icons-material/Login";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Sun icon
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Moon icon
import PersonIcon from "@mui/icons-material/Person";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useThemeToggle } from "../components/ThemeProvider";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const toggleTheme = useThemeToggle(); // Theme toggle function
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Load theme preference from localStorage on mount
  const [isSun, setIsSun] = React.useState(true);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      setIsSun(savedTheme !== "dark"); // Ensure consistency with stored theme
    }
  }, []);

  // Toggle the sun/moon icon and theme mode
  const handleThemeToggle = () => {
    setIsSun((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "light" : "dark"); // Save the theme
      return newTheme;
    });
    toggleTheme();
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    router.push("/profil");
  };

  const handleLogoutClick = async () => {
    handleMenuClose();
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const handleNavigation = (_: React.SyntheticEvent, newValue: string) => {
    if (
      !session &&
      newValue !== "/auth/registracia" &&
      newValue !== "/auth/prihlasenie" &&
      newValue !== "/" &&
      newValue !== "/o-nas"
    ) {
      router.push("/auth/registracia");
    } else {
      router.push(newValue);
    }
  };

  const nonAuthPaths = [
    { label: "Domov", value: "/", icon: <HomeIcon /> },
    { label: "O nás", value: "/o-nas", icon: <AccessibilityIcon /> },
    { label: "Registrácia", value: "/auth/registracia", icon: <AppRegistrationIcon /> },
    { label: "Prihlásenie", value: "/auth/prihlasenie", icon: <LoginIcon /> },
  ];

  const authPaths = [
    { label: "Domov", value: "/prispevok", icon: <HomeIcon /> },
    { label: "Hľadať", value: "/hladat", icon: <SearchIcon /> },
    { label: "Pridať", value: "/pridat", icon: <AddCircleIcon /> },
    {
      label: "Profil",
      value: "",
      icon: (
        <IconButton
          onClick={handleProfileMenuOpen}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'profile-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar alt={session?.user?.name || "User"} src={session?.user?.image || undefined}>
            {!session?.user?.image && (session?.user?.name?.charAt(0) || "U")}
          </Avatar>
        </IconButton>
      ),
    },
  ];

  const navigationPaths = status === "authenticated" ? authPaths : nonAuthPaths;

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
      <BottomNavigation showLabels value={pathname} onChange={handleNavigation}>
        {navigationPaths.map((path) => (
          <BottomNavigationAction
            key={path.value}
            label={path.label}
            value={path.value}
            icon={path.icon}
            sx={{
              color: pathname === path.value ? "blue" : "inherit",
            }}
          />
        ))}
        {/* Sun/Moon Toggle */}
        <IconButton
          onClick={handleThemeToggle}
          sx={{ position: "absolute", bottom: "10px", right: "10px" }}
          color="inherit"
        >
          {isSun ? <Brightness7Icon fontSize="large" /> : <Brightness4Icon fontSize="large" />}
        </IconButton>
      </BottomNavigation>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Moj profil</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Odhlasit</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}