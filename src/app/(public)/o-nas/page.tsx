import { Container, Typography, Box, Button } from "@mui/material";
import Link from "next/link"; // Import the Link component

export default function NonAuthHomeView() {
  return (
    <Container sx={{ maxWidth: 'lg', mt: 4, textAlign: 'left' }}>
      {/* About Us Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
          O nás
        </Typography>
        <Typography variant="h5" sx={{ mt: 2, color: "text.secondary" }}>
          Naším cieľom je vytvoriť platformu, ktorá môže konkurovať Instagramu.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, color: 'gray', lineHeight: 1.6 }}>
          Miesto, kde môžete slobodne zdieľať svoje zážitky, objavovať nový obsah a budovať komunitu.
          Veríme v autentickosť, kreativitu a spojenie ľudí cez vizuálne príbehy.
        </Typography>
      </Box>

      {/* Social Media Links */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ color: 'text.primary' }}>
          Sledujte nás
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
          Sme aktívni na sociálnych sieťach, kde sa môžete pripojiť k našej komunite.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Link href="https://www.friv.com/" passHref>
            <Button
              component="a"
              variant="outlined"
              color="primary"
              sx={{
                mx: 1,
                mb: 2,
                textDecoration: 'none', // Ensures no underline
                "&:hover": {
                  textDecoration: 'none', // Ensures no underline on hover
                }
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Only Fans
            </Button>
          </Link>
          <Link href="https://www.instagram.com/erzika_sro/" passHref>
            <Button
              component="a"
              variant="outlined"
              color="primary"
              sx={{
                mx: 1,
                mb: 2,
                textDecoration: 'none', // Ensures no underline
                "&:hover": {
                  textDecoration: 'none', // Ensures no underline on hover
                }
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </Button>
          </Link>
          <Link href="https://www.youtube.com/results?search_query=kutyil+sro" passHref>
            <Button
              component="a"
              variant="outlined"
              color="primary"
              sx={{
                mx: 1,
                mb: 2,
                textDecoration: 'none', // Ensures no underline
                "&:hover": {
                  textDecoration: 'none', // Ensures no underline on hover
                }
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Youtube
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}