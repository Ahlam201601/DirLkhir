# Dir-Khir 🇲🇦 — L'entraide de quartier

Plateforme pilote de coordination de l'entraide de proximité au Maroc (citoyens, commerçants, associations).

## Stack

- **Next.js 16** (App Router)
- **TypeScript** (strict)
- **Better-Auth** (sessions, middleware)
- **Drizzle ORM**
- **PostgreSQL** (Neon.tech)
- **Zod** (validation formulaires & Server Actions)
- **Tailwind CSS** & **Shadcn/UI**
- **Lucide React**

## Démarrage

### 1. Installer les dépendances

```bash
npm install
```

### 2. Variables d'environnement

Copier `env.example` vers `.env` et renseigner :

- `DATABASE_URL` : connexion PostgreSQL (Neon, Supabase, etc.)
- `DIRECT_URL` : connexion directe pour les migrations
- `BETTER_AUTH_SECRET` : clé secrète Better-Auth
- `NEXT_PUBLIC_BASE_URL` : URL de l’app (ex. `http://localhost:3000`)

### 3. Base de données

Générer les migrations puis pousser le schéma :

```bash
npm run db:generate
npm run db:migrate
```

Confirmer l’exécution des statements lorsque demandé.

### 4. Lancer l’app

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Pages

- **/** — Fil des besoins (Hero, filtres ville/catégorie, cartes, « Je participe »)
- **/login** — Connexion (email / mot de passe)
- **/register** — Inscription
- **/proposer-un-besoin** — Publier un besoin (auth requise)
- **/mon-espace** — Mes besoins créés & mes engagements (auth requise)

## Licence

MIT.
