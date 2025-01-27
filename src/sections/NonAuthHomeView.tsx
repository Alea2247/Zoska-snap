// src/sections/NonAuthHomeView.tsx

// neprihlaseny

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function NonAuthHomeView() {
  return (
    <Container>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Domovská stránka - NEprihlásený user
      </Typography>
      <Typography>
        Registrujte sa, aby ste mohli pridať príspevky a zobraziť profil.
      </Typography>
    </Container>
  );
}