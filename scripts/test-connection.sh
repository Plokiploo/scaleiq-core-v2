#!/bin/bash
# Test de connexion ScaleIQ ↔ Supabase (lit .env.local, n'affiche jamais la clé)
cd "$(dirname "$0")/.." || exit 1
URL=$(grep '^NEXT_PUBLIC_SUPABASE_URL=' .env.local | cut -d= -f2 | tr -d '[:space:]')
KEY=$(grep '^SUPABASE_SERVICE_ROLE_KEY=' .env.local | cut -d= -f2 | tr -d '[:space:]')
if [ -z "$KEY" ]; then echo "❌ SUPABASE_SERVICE_ROLE_KEY vide dans .env.local"; exit 1; fi
CODE=$(curl -s -o /tmp/scaleiq-test.json -w "%{http_code}" "$URL/rest/v1/organizations?select=*" -H "apikey: $KEY" -H "Authorization: Bearer $KEY")
BODY=$(cat /tmp/scaleiq-test.json)
if [ "$CODE" = "200" ]; then
  echo "✅ Connexion OK — la clé serveur fonctionne (réponse: $BODY)"
else
  echo "❌ Échec (HTTP $CODE): $BODY"
fi
