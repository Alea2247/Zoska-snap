
// ./app/(home)/page.tsx

// import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';
import NonauthHomeView from './NonauthHomeView';
import AuthHomeView from './AuthHomeView';

export const metadata = { title : "Domov | Kutyl s.r.o." };

export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      {/* Home page content */}
    </div>
  );
}

