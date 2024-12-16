//src\app\(public)\gdpr\page.tsx

"use client"; 

import { Typography, Container, Box, useTheme } from "@mui/material";

export default function GDPR() {
  const theme = useTheme(); // Access the MUI theme from the ThemeProvider

  return (
    <Container
      maxWidth="md"
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box sx={{ marginBottom: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          color="primary"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Zásady ochrany osobných údajov (GDPR)
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          sx={{ textAlign: "center" }}
        >
          Vaše súkromie je pre nás dôležité.
        </Typography>
      </Box>
      <Typography variant="body1" paragraph>
        Táto stránka sa zaväzuje chrániť vaše osobné údaje v súlade s nariadením
        GDPR.
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" component="h2" color="primary" gutterBottom>
          1. Aké údaje zbierame?
        </Typography>
        <Typography variant="body1">
          <ul>
            <li>Údaje účtu: Vaše meno, priezvisko, e-mailovú adresu, užívateľské meno, a heslo.</li>
            <li>Obsah: Fotografie, videá, komentáre a ďalšie príspevky, ktoré na stránke zdieľate.</li>
            <li>
              Technické údaje: IP adresa, typ zariadenia, cookies a ďalšie údaje potrebné na zlepšenie funkčnosti stránky.
            </li>
          </ul>
        </Typography>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" component="h2" color="primary" gutterBottom>
          2. Ako údaje používame?
        </Typography>
        <Typography variant="body1">
          Zbierame a spracovávame údaje na účely:
          <ul>
            <li>Poskytovania našich služieb a umožnenia ich používania.</li>
            <li>Zabezpečenia ochrany vášho účtu a obsahu.</li>
            <li>Analýzy, ako sa stránka používa, aby sme ju mohli zlepšovať.</li>
          </ul>
        </Typography>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" component="h2" color="primary" gutterBottom>
          3. Vaše práva
        </Typography>
        <Typography variant="body1">
          Máte nasledujúce práva v súvislosti s vašimi osobnými údajmi:
          <ul>
            <li>Právo na prístup k vašim údajom.</li>
            <li>Právo na ich opravu alebo vymazanie.</li>
            <li>Právo na obmedzenie spracovania vašich údajov.</li>
            <li>Právo namietať voči spracovaniu údajov.</li>
          </ul>
        </Typography>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" component="h2" color="primary" gutterBottom>
          4. Ako nás kontaktovať?
        </Typography>
        <Typography variant="body1">
          Ak máte akékoľvek otázky alebo požiadavky týkajúce sa vašich údajov,
          môžete nás kontaktovať prostredníctvom správy na stránke Zoska Snap.
        </Typography>
      </Box>
    </Container>
  );
}