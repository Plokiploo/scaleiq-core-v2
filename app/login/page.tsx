"use client";
import { useState } from "react";
import { supabaseBrowserClient } from "@/lib/supabase-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendLink(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error } = await supabaseBrowserClient().auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) throw error;
      setSent(true);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="center-screen">
      <div className="auth-card">
        <h1>ScaleIQ</h1>
        <p className="muted">Connexion par lien magique — pas de mot de passe.</p>
        {sent ? (
          <p style={{ marginTop: "1.25rem" }}>
            Vérifie ta boîte mail : un lien de connexion vient d&apos;être envoyé à <strong>{email}</strong>.
          </p>
        ) : (
          <form className="row" onSubmit={sendLink} style={{ marginTop: "1.25rem" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.com"
              required
              autoFocus
            />
            <button type="submit" disabled={loading}>
              {loading ? "Envoi…" : "Envoyer le lien de connexion"}
            </button>
          </form>
        )}
        {error && <p className="error" style={{ marginTop: "1rem" }}>{error}</p>}
      </div>
    </div>
  );
}
