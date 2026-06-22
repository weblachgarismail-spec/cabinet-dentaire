# Checklist Personnalisation Client

## Infos obligatoires

- [ ] **Nom du cabinet** → `NEXT_PUBLIC_SITE_NAME`
- [ ] **Nom du docteur** → remplacer [Nom du docteur]
- [ ] **Téléphone** → lien WhatsApp + footer
- [ ] **Adresse** → Google Maps embed + footer
- [ ] **Email** → formulaire de contact + footer
- [ ] **Horaires** → page contact
- [ ] **Ville** → traductions "à [ville]"

## Contenu visuel

- [ ] **Logo** → `public/logo.png` + ajuster dans Header
- [ ] **Photo docteur** → remplacer dans section À propos
- [ ] **Photos cabinet** → galerie + section services
- [ ] **Photos réalisations** → `public/assets/realisations/`

## Contenu textuel

- [ ] **Présentation docteur** → messages (fr + ar)
- [ ] **Services proposés** → liste complète
- [ ] **Tarifs indicatifs** (optionnel)
- [ ] **Témoignages patients** → remplacer génériques
- [ ] **FAQ** → adapter au cabinet

## Technique

- [ ] **Changer les clés API** (Sentry, etc.) → `.env.local`
- [ ] **Mettre à jour le sitemap** → `public/robots.txt`
- [ ] **Configurer Google Analytics** (optionnel)
- [ ] **Configurer Google My Business**
- [ ] **Déployer** → Vercel, Netlify ou hébergement classique

## Fichiers à modifier

| Fichier | À changer |
|---|---|
| `messages/fr.json` et `ar.json` | Textes, docteur, services, témoignages |
| `src/components/layout/Header.tsx` | Logo, nom cabinet |
| `src/components/layout/Footer.tsx` | Coordonnées, liens |
| `.env.local` | Clés API, Sentry DSN |
| `public/assets/realisations/` | Photos avant/après du cabinet |
| `public/logo.png` | Logo du cabinet |
