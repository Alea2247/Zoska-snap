// src/sections/AuthHomeView.tsx

// prihlaseny

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Session } from "next-auth";

export default function AuthHomeView({ session }: { session: Session | null }) {
  if (!session) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography> Domovská stránka - prihlásený user</Typography>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Vitajte, {session?.user?.name || "užívateľ"}!
      </Typography>
    </Container>
  );
}
  