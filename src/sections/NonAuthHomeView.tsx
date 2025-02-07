import { Container, Typography, Button, Box } from "@mui/material";

export default function NonAuthHomeView() {
  return (
    <Container sx={{ maxWidth: 'lg', mt: 4, textAlign: 'center' }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
          Vítame vás na našej platforme!
        </Typography>
        <Typography variant="h5" sx={{ mt: 2, color: "text.secondary" }}>
          Objavujte úžasný obsah, spoznávajte nových ľudí a zdieľajte svoje nezabudnuteľné momenty.
        </Typography>
      </Box>

      {/* Call to Action */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ color: 'text.primary' }}>
          Pripojte sa k našej rastúcej komunite!
        </Typography>
        <Typography sx={{ mt: 2, color: 'gray' }}>
          Aby ste mohli pridať príspevky a zobraziť svoj profil, <strong>registrujte sa</strong>.
        </Typography>
        <Button
          component="a"  // This turns the button into an <a> tag
          href="/auth/registracia"
          variant="contained"
          color="primary"
          sx={{ mt: 3, padding: '10px 20px', fontSize: '16px' }}
        >
          Registrujte sa teraz
        </Button>
      </Box>

      {/* Description */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
          Pridajte sa teraz a buďte súčasťou našej kreatívnej platformy! Objavujte nové príspevky a
          spoznávajte inšpiratívnych ľudí. Začnite svoju cestu ešte dnes.
        </Typography>
      </Box>
    </Container>
  );
}