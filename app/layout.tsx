import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { supabaseServerClient } from "@/lib/supabase-server";
import { SignOutButton } from "@/components/SignOutButton";

export const metadata: Metadata = {
  title: "ScaleIQ",
  description:
    "Identify what slows your organization down, why it happens, and what simple action to take next.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const supabase = await supabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="fr">
      <body>
        {user && (
          <div className="topbar">
            <Link href="/" className="wordmark">ScaleIQ</Link>
            <div className="row" style={{ gap: "0.6rem", alignItems: "center" }}>
              <span className="muted">{user.email}</span>
              <SignOutButton />
            </div>
          </div>
        )}
        {children}
      </body>
    </html>
  );
}
