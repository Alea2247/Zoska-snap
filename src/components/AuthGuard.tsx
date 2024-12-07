'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/prihlasenie")
    }
  }, [status, router])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return <>{children}</>
}