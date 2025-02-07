"use client";

import {
  Button,
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function SignUpView() {
  const [gdprChecked, setGdprChecked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");


  useEffect(() => {
    setBaseUrl(window.location.origin); // This ensures baseUrl is set only on the client
  }, []);

  const handleSignUp = () => {
    if (!gdprChecked) {
      setShowAlert(true); // Show alert if GDPR is not checked
      return;
    }

    setShowAlert(false); // Hide alert if GDPR is checked
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
        Registrácia
      </Typography>

      {/* Sign-in link */}
      <Typography variant="body1" sx={{ mb: 6 }}>
        Už máte účet?{" "}
        <Link href="/auth/prihlasenie" style={{ color: "blue", textDecoration: "underline" }}>
          Prihláste sa
        </Link>
      </Typography>

      {/* GDPR Consent */}
      <FormControlLabel
        control={
          <Checkbox
            checked={gdprChecked}
            onChange={(e) => setGdprChecked(e.target.checked)}
            color="primary"
          />
        }
        label={
          <Typography>
            Súhlas s{" "}
            <Link href="/gdpr" style={{ color: "blue", textDecoration: "underline" }}>
              GDPR
            </Link>
            {" "}a{" "}
            <Link href="/podmienky" style={{ color: "blue", textDecoration: "underline" }}>
              Podmienkami používania
            </Link>
          </Typography>
        }
        sx={{ mb: 2 }}
      />

      {/* Conditional Alert */}
      {showAlert && (
        <Box
          sx={{
            bgcolor: "#fdecea",
            color: "#d32f2f",
            border: "1px solid #d32f2f",
            borderRadius: 1,
            p: 2,
            textAlign: "center",
            mb: 2,
            width: "100%",
          }}
        >
          <Typography>
            Prosím, súhlaste s podmienkami GDPR pred pokračovaním.
          </Typography>
        </Box>
      )}

      {/* Google Sign Up */}
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={handleSignUp}
        sx={{ mb: 1 }}
      >
        Registrovať sa účtom Google
      </Button>
    </Container>
  );
}