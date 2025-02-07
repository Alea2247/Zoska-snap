"use client";

import {
  Button,
  Container,
  Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";

export default function SignInView() {
  const handleSignIn = () => {
    const baseUrl = window.location.origin;
    signIn("google", {callbackUrl: `${baseUrl}/prispevok`,});
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
        p: 3,
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      {/* Logo / Title */}
      <Typography variant="h5" sx={{ mb: 3 }}>
        Prihlásenie
      </Typography>


      <Typography variant="body1" sx={{ mb: 6 }}>
        Nemáte účet?{" "}
        <Link href="/auth/registracia" style={{ color: "blue", textDecoration: "underline" }}>
          Zaregistrujte sa
        </Link>
      </Typography>

      {/* Google Sign In */}
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={handleSignIn}
        sx={{ mb: 1 }}
      >
        Prihlásiť sa účtom Google
      </Button>
    </Container>
  );
}