"use client";
import { useRouter } from "next/navigation";
import { supabaseBrowserClient } from "@/lib/supabase-client";

export function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    await supabaseBrowserClient().auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button className="secondary" onClick={signOut} style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}>
      Déconnexion
    </button>
  );
}
