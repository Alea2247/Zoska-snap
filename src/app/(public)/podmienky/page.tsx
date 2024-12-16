// src/app/(public)/podmienky/page.tsx

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Data for the Terms and Conditions
const termsData = {
  title: "Podmienky používania",
  introduction:
    "Tieto podmienky upravujú používanie aplikácie ZoškaSnap. Pred použitím našej aplikácie si prosím dôkladne prečítajte tieto podmienky.",
  sections: [
    {
      heading: "Používanie aplikácie",
      text: "Užívateľ sa zaväzuje používať aplikáciu v súlade so zákonmi a dobrými mravmi.",
    },
    {
      heading: "Ochrana údajov",
      text: "Vaše údaje sú spracovávané v súlade s našimi zásadami ochrany osobných údajov.",
    },
  ],
  footer: "Ďakujeme, že dodržiavate podmienky používania našej aplikácie.",
};

export const metadata = { title: 'Podmienky | ZoškaSnap' };

export default function TermsConditions() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Title */}
      <Typography variant="h4" sx={{ mb: 2 }}>
        {termsData.title}
      </Typography>

      {/* Introduction */}
      <Typography variant="body1" sx={{ mb: 4 }}>
        {termsData.introduction}
      </Typography>

      {/* Sections */}
      {termsData.sections.map((section, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {section.heading}
          </Typography>
          <Typography variant="body1">{section.text}</Typography>
        </Box>
      ))}

      {/* Footer */}
      <Typography variant="body2" sx={{ mt: 4, fontStyle: 'italic' }}>
        {termsData.footer}
      </Typography>
    </Box>
  );
}