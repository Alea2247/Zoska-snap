// src/app/(home)/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import NonAuthHomeView from "../../sections/NonAuthHomeView";
import AuthHomeView from "../../sections/AuthHomeView";

export const metadata = { title: "Domov | Kutyl s.r.o." };

export default async function HomePage() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return <NonAuthHomeView />;
    }
    else {
      return <AuthHomeView session={session} />;
    }

  } catch (error) {
    console.error("Error fetching session:", error);
    return <NonAuthHomeView />;
  }
}