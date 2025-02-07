"use client";  // Client-side component

import { useRouter } from "next/navigation";
import { Button, Box } from "@mui/material";

export default function GDPRClient() {
  const router = useRouter();

  // Handle the back button click
  const handleBack = () => {
    router.back(); // Go back to the previous page
  };

  return (
    <Box sx={{ textAlign: "center", mt: 3 }}>
      <Button
        onClick={handleBack}
        variant="outlined"
        color="primary"
        sx={{
          borderColor: "primary.main",
          color: "primary.main",
          backgroundColor: "transparent",
          "&:hover": {
            borderColor: "primary.dark",
            color: "primary.dark",
          },
        }}
      >
        Späť
      </Button>
    </Box>
  );
}