// src/sections/SignUpView.tsx

// registracia

"use client";

import {
  Button,
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import NextLink from "next/link";
import Alert from "@mui/material/Alert";
import { useState } from "react";

export default function SignUpView() {
  // State for error message
  const [error, setError] = useState<string | null>(null);

  // Handle sign up with Google and set error on failure
  const handleGoogleSignUp = async () => {
    try {
      await signIn("google");
      setError(null); // Reset error if sign-in is successful
    } catch (err) {
      setError("Something went wrong with Google sign-up.");
    }
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
        Registrácia
      </Typography>

      {/* Sign-in link */}
      <Typography variant="body1" sx={{ mb: 4 }}>
        Už máte účet?{" "}
        <NextLink href="/auth/prihlasenie" passHref>
          <Typography component="span" color="primary" sx={{ cursor: "pointer" }}>
            Prihláste sa
          </Typography>
        </NextLink>
      </Typography>

      {/* Error alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* GDPR and Terms Checkbox */}
      <FormControlLabel
        control={<Checkbox required color="primary" />}
        label={
          <>
            Súhlasím s{" "}
            <NextLink href="/podmienky" passHref>
              <Typography component="span" color="primary" sx={{ cursor: "pointer" }}>
                podmienkami používania
              </Typography>
            </NextLink>{" "}
            <NextLink href="/gdpr" passHref>
              <Typography component="span" color="primary" sx={{ cursor: "pointer" }}>
                zásadami ochrany osobných údajov
              </Typography>
            </NextLink>
            .
          </>
        }
        sx={{ mb: 3 }}
      />

      {/* Google Sign Up */}
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={handleGoogleSignUp} // Use the custom sign-up handler
        sx={{ mb: 1 }}
      >
        Registrovať sa účtom Google
      </Button>
    </Container>
  );
}