# portfolio-issam-ai

Portfolio full-stack de **AISSAOUI IDRISSI ISSAM** — Développeur IA / Backend Python & LLM.

Application web composée d’un frontend **React + TypeScript** et d’une **API REST FastAPI**. Toutes les données du portfolio (profil, compétences, expériences, projets) sont servies par le backend, et un **assistant IA** permet aux recruteurs d’interroger le profil en langage naturel.

---

## Fonctionnalités

- Page unique responsive : Hero, À propos, Compétences, Expériences (timeline), Projets, Assistant IA, Contact.
- Données chargées dynamiquement depuis l’API REST, avec gestion du chargement et des erreurs.
- Assistant IA (`POST /api/assistant/ask`) : détection d’intention et réponses construites à partir des données du profil. Architecture prête pour brancher un LLM (OpenAI, Gemini, Ollama).
- Formulaire de contact validé côté client et côté serveur (Pydantic), extensible vers Resend, SMTP ou EmailJS.
- Animations légères au scroll (respect de `prefers-reduced-motion`), navbar sticky, design sobre orienté tech.
- Documentation interactive de l’API générée automatiquement (Swagger) sur `/docs`.

## Stack technique

| Couche      | Technologies                                             |
| ----------- | -------------------------------------------------------- |
| Frontend    | React 19, TypeScript, Vite, Tailwind CSS v4, lucide-react |
| Backend     | Python 3.12, FastAPI, Pydantic v2, Uvicorn               |
| Données     | Module Python `app/data.py` (migrable vers PostgreSQL / Supabase) |
| Déploiement | Vercel (frontend), Render (backend)                      |
| Versioning  | Git, GitHub                                              |

## Architecture

```
portfolio-issam-ai/
├── frontend/
│   ├── public/                 # favicon, CV PDF à ajouter
│   ├── src/
│   │   ├── components/         # Sections de la page + composants UI partagés
│   │   ├── hooks/useApi.ts     # Chargement de données (loading / erreur / retry)
│   │   ├── pages/Home.tsx      # Page unique
│   │   ├── services/api.ts     # Client REST
│   │   ├── types/index.ts      # Types partagés avec l’API
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css           # Tailwind + thème
│   ├── package.json
│   ├── vite.config.ts
│   ├── vercel.json
│   └── .env.example
│
├── backend/
│   ├── app/
│   │   ├── main.py             # Application FastAPI, CORS, routeurs
│   │   ├── data.py             # Données du portfolio (à modifier ici)
│   │   ├── schemas.py          # Schémas Pydantic
│   │   ├── routes/             # Un routeur par ressource
│   │   └── services/
│   │       ├── assistant_service.py
│   │       └── contact_service.py
│   ├── requirements.txt
│   ├── render.yaml
│   └── .env.example
│
└── README.md
```

## Endpoints de l’API

| Méthode | Route                         | Description                                  |
| ------- | ----------------------------- | -------------------------------------------- |
| GET     | `/`                           | Statut : `{"message": "Portfolio API is running"}` |
| GET     | `/api/profile`                | Informations principales du profil           |
| GET     | `/api/skills`                 | Compétences par catégorie                    |
| GET     | `/api/experiences`            | Expériences professionnelles                 |
| GET     | `/api/projects`               | Projets                                      |
| POST    | `/api/contact`                | Réception d’un message de contact            |
| POST    | `/api/assistant/ask`          | Question à l’assistant IA                    |
| GET     | `/api/assistant/suggestions`  | Exemples de questions                        |

Exemple :

```bash
curl -X POST http://localhost:8000/api/assistant/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "As-tu déjà travaillé avec des LLM ?"}'
```

---

## Installation et lancement local

Prérequis : **Python 3.11+** et **Node.js 20+**.

### Backend

```bash
cd backend
python -m venv venv

# macOS / Linux
source venv/bin/activate
# Windows (PowerShell)
venv\Scripts\activate

pip install -r requirements.txt
cp .env.example .env        # Windows : copy .env.example .env
uvicorn app.main:app --reload
```

- API : http://localhost:8000
- Documentation Swagger : http://localhost:8000/docs

### Frontend

Dans un second terminal :

```bash
cd frontend
npm install
cp .env.example .env        # Windows : copy .env.example .env
npm run dev
```

- Application : http://localhost:5173

### CV téléchargeable

Placer le CV au format PDF dans `frontend/public/cv-issam-aissaoui-idrissi.pdf` (ou modifier `cv_url` dans `backend/app/data.py`).

## Variables d’environnement

### Frontend (`frontend/.env`)

| Variable       | Description                     | Exemple                  |
| -------------- | ------------------------------- | ------------------------ |
| `VITE_API_URL` | URL du backend, sans slash final | `http://localhost:8000` |

### Backend (`backend/.env`)

| Variable               | Description                                                 | Défaut                  |
| ---------------------- | ----------------------------------------------------------- | ----------------------- |
| `ALLOWED_ORIGINS`      | Origines CORS autorisées, séparées par des virgules          | `http://localhost:5173` |
| `ALLOWED_ORIGIN_REGEX` | Regex d’origines autorisées (previews Vercel), optionnel     | —                       |
| `ASSISTANT_PROVIDER`   | Moteur de l’assistant (`rules`)                              | `rules`                 |
| `CONTACT_PROVIDER`     | Mode d’envoi des messages de contact (`log`)                 | `log`                   |
| `LOG_LEVEL`            | Niveau de logs                                               | `INFO`                  |

Aucune clé API n’est nécessaire. Ne jamais committer de fichier `.env`.

## Modifier le contenu

Tout le contenu se trouve dans **`backend/app/data.py`** : `PROFILE`, `SKILL_CATEGORIES`, `EXPERIENCES`, `PROJECTS`, `SUGGESTED_QUESTIONS`. Le frontend et l’assistant IA se mettent à jour automatiquement.

Pensez à remplacer les URLs GitHub marquées `TODO` dans `PROJECTS`.

---

## Déploiement

### 1. Publier sur GitHub

```bash
cd portfolio-issam-ai
git init
git add .
git commit -m "Initial commit: portfolio full-stack IA"
git branch -M main
git remote add origin https://github.com/IssamIdri/portfolio-issam-ai.git
git push -u origin main
```

### 2. Backend sur Render

**Option A — Blueprint** : dans Render, *New > Blueprint*, sélectionner le dépôt et indiquer `backend/render.yaml` comme chemin du fichier Blueprint.

**Option B — Web Service manuel** : *New > Web Service*, puis :

- Root Directory : `backend`
- Runtime : Python 3
- Build Command : `pip install -r requirements.txt`
- Start Command : `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Variables d’environnement : `PYTHON_VERSION=3.12.7`, `ALLOWED_ORIGINS=https://<votre-app>.vercel.app`

Vérifier ensuite que `https://<votre-api>.onrender.com/` renvoie `Portfolio API is running`.

> Sur l’offre gratuite, le service se met en veille après inactivité : la première requête peut prendre ~30 à 50 secondes. Le frontend affiche un état de chargement et un bouton « Réessayer ».

### 3. Frontend sur Vercel

*Add New > Project*, importer le dépôt, puis :

- Root Directory : `frontend`
- Framework Preset : Vite
- Build Command : `npm run build`
- Output Directory : `dist`
- Variable d’environnement : `VITE_API_URL=https://<votre-api>.onrender.com`

Enfin, mettre à jour `ALLOWED_ORIGINS` sur Render avec l’URL Vercel définitive.

---

## Roadmap

- [ ] Brancher un LLM dans l’assistant (OpenAI / Gemini / Ollama) via un nouveau provider dans `assistant_service.py`, avec les données du portfolio comme contexte (RAG léger).
- [ ] Envoi réel des messages de contact (Resend ou SMTP) via un nouveau `ContactNotifier`.
- [ ] Migration des données vers PostgreSQL / Supabase (SQLAlchemy ou client Supabase) en réécrivant les fonctions `get_*` de `data.py`.
- [ ] Tests automatisés : `pytest` + `httpx` pour l’API, Vitest + Testing Library pour le frontend.
- [ ] CI GitHub Actions (lint, typecheck, tests) et Dockerfile pour le backend.
- [ ] Rate limiting sur `/api/contact` et `/api/assistant/ask`.
- [ ] Version anglaise du portfolio (i18n).
- [ ] Mini back-office authentifié pour éditer les contenus.

## Auteur

**AISSAOUI IDRISSI ISSAM** — Développeur IA / Backend Python & LLM

- LinkedIn : https://www.linkedin.com/in/issam-aissaoui-idrissi-b14887198/
- GitHub : https://github.com/IssamIdri
- Email : issam.aissaoui87@gmail.com
