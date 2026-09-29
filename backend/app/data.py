"""
Source de données du portfolio.

Modifiez ce fichier pour mettre à jour le profil, les compétences, les expériences
et les projets. Les routes n'accèdent aux données qu'à travers les fonctions `get_*`
en bas de fichier : pour migrer vers PostgreSQL / Supabase, il suffit de réécrire
ces fonctions (les structures correspondent déjà à des tables : profile, skill_categories,
experiences, projects).
"""

from typing import Any

PROFILE: dict[str, Any] = {
    "name": "AISSAOUI IDRISSI ISSAM",
    "title": "Développeur IA / Backend Python & LLM",
    "subtitle": (
        "Développement d’applications IA, API REST, automatisation "
        "et intégration de modèles LLM"
    ),
    "location": "France",
    "mobility": "Mobilité Belgique / Maroc",
    "availability": "Recherche un CDI en Développement IA, Backend Python ou Full-stack IA",
    "about": (
        "Développeur IA et backend Python spécialisé dans l’intégration de modèles LLM, "
        "la conception d’API REST et le développement d’applications web complètes. "
        "Mon profil combine développement backend, traitement de données, automatisation "
        "de workflows et déploiement d’applications sur serveur Linux. Je recherche un CDI "
        "en Développement IA, Backend Python ou Full-stack IA."
    ),
    "email": "issam.aissaoui87@gmail.com",
    "linkedin": "https://www.linkedin.com/in/issam-aissaoui-idrissi-b14887198/",
    "github": "https://github.com/IssamIdri",
    # Fichier à placer dans frontend/public/
    "cv_url": "/cv-issam-aissaoui-idrissi.pdf",
    "focus_areas": [
        "Intégration de LLM",
        "API REST Python",
        "Applications web full-stack",
        "Traitement de données",
        "Automatisation de workflows",
        "Déploiement Linux",
    ],
    "strengths": [
        "Expérience concrète de l’intégration de LLM en entreprise : analyse d’images produits "
        "et génération de contenus chez AMD Megastore, classification de textes et évaluation "
        "comparative de modèles chez ALTEN.",
        "Solide base backend Python : conception d’API REST avec Flask et FastAPI, "
        "modélisation de données et PostgreSQL.",
        "Culture data et machine learning : nettoyage et structuration de données, "
        "modèle d’estimation des coûts avec scikit-learn chez Narjiss Soft.",
        "Capacité à mettre en production : déploiement sur serveur Linux avec Nginx et Gunicorn.",
        "Vision full-stack : interfaces Angular et React connectées aux API backend.",
    ],
}

SKILL_CATEGORIES: list[dict[str, Any]] = [
    {
        "id": "languages",
        "name": "Langages",
        "skills": ["Python", "SQL", "JavaScript", "TypeScript"],
    },
    {
        "id": "backend",
        "name": "Backend & API",
        "skills": ["Flask", "FastAPI", "API REST", "Node.js", "Jinja2"],
    },
    {
        "id": "frontend",
        "name": "Frontend",
        "skills": ["Angular", "React", "HTML", "CSS", "Tailwind CSS"],
    },
    {
        "id": "llm",
        "name": "IA générative & LLM",
        "skills": [
            "OpenAI / GPT",
            "Gemini",
            "Ollama",
            "Prompt engineering",
            "Analyse d’images",
            "Extraction d’informations",
            "Génération de contenu",
        ],
    },
    {
        "id": "data",
        "name": "Data & Machine Learning",
        "skills": [
            "pandas",
            "NumPy",
            "scikit-learn",
            "Classification",
            "Modélisation prédictive",
            "Feature engineering",
            "Traitement de données",
        ],
    },
    {
        "id": "databases",
        "name": "Bases de données",
        "skills": ["PostgreSQL", "MySQL", "SQL Server", "MongoDB"],
    },
    {
        "id": "devops",
        "name": "DevOps & Déploiement",
        "skills": ["Git", "GitHub", "Linux", "Nginx", "Gunicorn", "Docker"],
    },
    {
        "id": "automation",
        "name": "Automatisation & BI",
        "skills": ["n8n", "Power Automate", "Power BI", "Matplotlib"],
    },
    {
        "id": "methods",
        "name": "Méthodologies",
        "skills": ["Agile", "UML", "Merise"],
    },
]

EXPERIENCES: list[dict[str, Any]] = [
    {
        "id": "amd-megastore",
        "title": "Développeur IA / Full-stack",
        "company": "AMD Megastore",
        "location": "Bruxelles, Belgique",
        "contract_type": "Stage",
        "start_date": "04/2026",
        "end_date": "08/2026",
        "missions": [
            "Conception d’une application web intelligente automatisant la création, "
            "la validation et la publication de fiches produits e-commerce.",
            "Développement du backend Python avec Flask, API REST et PostgreSQL.",
            "Réalisation d’interfaces Angular pour le suivi et la validation des données.",
            "Intégration de l’IA générative pour analyser les images produits, "
            "extraire les informations et générer les contenus.",
            "Déploiement sur serveur Linux avec Nginx et Gunicorn.",
        ],
        "technologies": [
            "Python",
            "Flask",
            "API REST",
            "PostgreSQL",
            "Angular",
            "IA générative",
            "Gemini",
            "Linux",
            "Nginx",
            "Gunicorn",
        ],
    },
    {
        "id": "alten",
        "title": "Consultant Data / IA",
        "company": "ALTEN",
        "location": "Fès, Maroc",
        "contract_type": "Stage",
        "start_date": "02/2025",
        "end_date": "07/2025",
        "missions": [
            "Automatisation du traitement de tickets à partir de données textuelles.",
            "Écriture de scripts Python de nettoyage, structuration et analyse de données.",
            "Intégration de LLM pour la classification, la compréhension du texte "
            "et la gestion des cas ambigus.",
            "Création d’une interface Flask de suivi des décisions et de contrôle des sorties.",
            "Évaluation comparative de modèles LLM.",
        ],
        "technologies": [
            "Python",
            "Flask",
            "LLM",
            "NLP",
            "Data Processing",
            "Automatisation",
            "Power BI",
        ],
    },
    {
        "id": "narjiss-soft",
        "title": "Consultant IA",
        "company": "Narjiss Soft",
        "location": "Fès, Maroc",
        "contract_type": "Stage",
        "start_date": "06/2024",
        "end_date": "08/2024",
        "missions": [
            "Analyse et préparation de données techniques et commerciales.",
            "Conception d’un modèle de machine learning pour l’estimation des coûts.",
            "Optimisation du processus de devis.",
        ],
        "technologies": ["Python", "Machine Learning", "scikit-learn", "Data Analysis"],
    },
]

PROJECTS: list[dict[str, Any]] = [
    {
        "id": "nlp-search-engine",
        "title": "Moteur de recherche intelligent NLP",
        "description": (
            "Application permettant l’indexation multi-formats, le traitement linguistique, "
            "le scoring de pertinence et la visualisation des résultats."
        ),
        "technologies": ["Python", "Flask", "NLP", "Scoring", "API REST"],
        "github_url": "https://github.com/IssamIdri/Moteur-de-recherche-intelligent-NLP",
        "demo_url": None,
    },
    {
        "id": "medication-ai-app",
        "title": "Application IA de gestion de médicaments",
        "description": (
            "Application full-stack avec suivi des prises, gestion utilisateur "
            "et assistant conversationnel."
        ),
        "technologies": ["React", "Flask", "Chatbot", "API REST"],
        # TODO : remplacer par l’URL du dépôt du projet
        "github_url": "https://github.com/IssamIdri",
        "demo_url": None,
    },
    {
        "id": "portfolio-ai",
        "title": "Portfolio full-stack IA",
        "description": (
            "Portfolio interactif avec frontend React, backend FastAPI, API REST et assistant IA "
            "permettant d’interroger mon profil, mes compétences et mes projets."
        ),
        "technologies": ["React", "TypeScript", "FastAPI", "Tailwind CSS", "API REST"],
        # TODO : vérifier l’URL une fois le dépôt publié
        "github_url": "https://github.com/IssamIdri/portfolio-issam-ai",
        "demo_url": None,
    },
]

SUGGESTED_QUESTIONS: list[str] = [
    "Quelles sont tes compétences backend ?",
    "Quels projets IA as-tu réalisés ?",
    "As-tu déjà travaillé avec des LLM ?",
    "Quelle est ton expérience avec Flask et les API REST ?",
    "Pourquoi ton profil correspond à un poste de Développeur IA ?",
]


def get_profile() -> dict[str, Any]:
    return PROFILE


def get_skill_categories() -> list[dict[str, Any]]:
    return SKILL_CATEGORIES


def get_experiences() -> list[dict[str, Any]]:
    return EXPERIENCES


def get_projects() -> list[dict[str, Any]]:
    return PROJECTS


def get_suggested_questions() -> list[str]:
    return SUGGESTED_QUESTIONS
