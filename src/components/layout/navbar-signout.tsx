"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth/client";
import { LogOut } from "lucide-react";

export function NavbarSignOut() {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-2 w-full px-2 py-1.5 text-sm cursor-pointer hover:bg-red-50 rounded transition-colors"
    >
      <LogOut className="w-4 h-4" />
      <span>Déconnexion</span>
    </button>
  );
}
