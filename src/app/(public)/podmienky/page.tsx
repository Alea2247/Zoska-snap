import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = { title: "Podmienky používania | Kutyl s.r.o." };

const TermsClient = dynamic(() => import("../../../components/GDPRClient"), {
  ssr: false, // Ensures it's client-side only
});

export default function TermsOfService() {
  return (
    <div style={{ display: "flex", justifyContent: "left", alignItems: "left", height: "100vh", textAlign: "left", padding: "20px" }}>
      <div>
        {/* Terms of Service Text */}
        <h1>Podmienky používania</h1>
        <p style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
          Tieto podmienky používania upravujú pravidlá a podmienky používania platformy ZoškaSnap. Používaním našich služieb súhlasíte s týmito podmienkami.
          Zaväzujete sa používať našu platformu zodpovedne, neporušovať práva iných používateľov a dodržiavať všetky platné zákony.
          Vyhradzujeme si právo kedykoľvek tieto podmienky zmeniť.
        </p>
        <p style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", marginTop: "20px" }}>
          Používateľ nesmie nahrávať, zdieľať alebo publikovať obsah, ktorý je nezákonný, urážlivý, ohováračský, diskriminačný alebo porušuje práva iných osôb. Každý používateľ je zodpovedný za obsah, ktorý zverejňuje na platforme.
          Akékoľvek porušenie podmienok môže viesť k pozastaveniu alebo trvalému zrušeniu účtu používateľa.
        </p>
        <p style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", marginTop: "20px" }}>
          Platforma ZoškaSnap si vyhradzuje právo kedykoľvek upraviť alebo zmeniť funkcie, služby a podmienky používania. O významných zmenách budeme používateľov informovať prostredníctvom e-mailu alebo notifikácií v aplikácii.
          Pokračovaním v používaní platformy po týchto zmenách súhlasíte s aktualizovanými podmienkami.
        </p>
        
        {/* Client-side back button */}
        <TermsClient />
      </div>
    </div>
  );
}