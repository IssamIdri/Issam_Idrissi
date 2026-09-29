"""
Assistant du portfolio.

L'implémentation actuelle (`RuleBasedAssistant`) détecte l'intention de la question par
mots-clés et construit la réponse à partir de `app.data`. Toute nouvelle implémentation
(OpenAI, Gemini, Ollama...) doit respecter le protocole `AssistantProvider` et être
branchée dans `get_assistant()`.
"""

import os
import re
import unicodedata
from dataclasses import dataclass
from functools import lru_cache
from typing import Any, Callable, Protocol

from app import data
from app.schemas import AssistantResponse

OFF_TOPIC_MESSAGE = (
    "Je peux répondre aux questions concernant le profil, les compétences, "
    "les expériences et les projets d’Issam."
)

LLM_TERMS = ("llm", "ia generative", "gemini", "nlp", "modeles llm")


class AssistantProvider(Protocol):
    def answer(self, question: str) -> AssistantResponse: ...


def normalize(text: str) -> str:
    """Minuscules, sans accents ni ponctuation."""
    text = unicodedata.normalize("NFD", text.lower())
    text = "".join(char for char in text if unicodedata.category(char) != "Mn")
    return re.sub(r"[^a-z0-9]+", " ", text).strip()


def _bullets(items: list[str]) -> str:
    return "\n".join(f"• {item}" for item in items)


def _category(category_id: str) -> dict[str, Any]:
    return next(c for c in data.get_skill_categories() if c["id"] == category_id)


def _skills(category_id: str) -> str:
    return ", ".join(_category(category_id)["skills"])


def _period(exp: dict[str, Any]) -> str:
    return f"{exp['start_date']} – {exp['end_date']}"


def _experiences_using(*technologies: str) -> list[dict[str, Any]]:
    wanted = {normalize(t) for t in technologies}
    return [
        exp
        for exp in data.get_experiences()
        if wanted & {normalize(t) for t in exp["technologies"]}
    ]


def _missions_matching(exp: dict[str, Any], terms: tuple[str, ...]) -> list[str]:
    return [
        mission
        for mission in exp["missions"]
        if any(f" {term} " in f" {normalize(mission)} " for term in terms)
    ]


def _first_mission(exp: dict[str, Any], terms: tuple[str, ...]) -> str:
    matches = _missions_matching(exp, terms)
    return matches[0] if matches else exp["missions"][0]


# --- Construction des réponses ------------------------------------------------


def answer_about() -> str:
    profile = data.get_profile()
    return (
        f"{profile['name']} est {profile['title']}.\n\n"
        f"{profile['about']}\n\n"
        f"Localisation : {profile['location']} — {profile['mobility']}."
    )


def answer_backend() -> str:
    lines = [
        f"Côté backend, Issam travaille avec : {_skills('backend')}.",
        f"Langages principaux : {_skills('languages')}.",
        f"Bases de données : {_skills('databases')}.",
    ]
    experiences = _experiences_using("Flask", "API REST")
    if experiences:
        lines.append("\nEn contexte professionnel :")
        for exp in experiences:
            detail = _first_mission(exp, ("flask", "api"))
            lines.append(f"• {exp['company']} ({exp['title']}) : {detail}")
    lines.append(
        "\nCe portfolio repose lui-même sur une API REST FastAPI avec des schémas Pydantic."
    )
    return "\n".join(lines)


def answer_llm() -> str:
    lines = ["Oui, l’intégration de LLM est au cœur de son parcours :"]
    for exp in _experiences_using("LLM", "IA générative", "Gemini", "NLP"):
        for mission in _missions_matching(exp, LLM_TERMS):
            lines.append(f"• {exp['company']} : {mission}")
    lines.append(f"\nOutils et compétences IA générative : {_skills('llm')}.")
    return "\n".join(lines)


def answer_projects() -> str:
    lines = ["Voici les projets présentés dans le portfolio :"]
    for project in data.get_projects():
        lines.append(
            f"• {project['title']} — {project['description']} "
            f"({', '.join(project['technologies'])})"
        )
    lines.append(
        "\nEn entreprise, il a aussi conçu une application d’IA générative pour les fiches "
        "produits (AMD Megastore) et une automatisation du traitement de tickets par LLM (ALTEN)."
    )
    return "\n".join(lines)


def answer_experiences() -> str:
    lines = ["Parcours professionnel :"]
    for exp in data.get_experiences():
        lines.append(
            f"• {exp['title']} — {exp['company']}, {exp['location']} "
            f"({exp['contract_type']}, {_period(exp)})"
        )
    return "\n".join(lines)


def answer_skills() -> str:
    lines = ["Compétences principales :"]
    for category in data.get_skill_categories():
        lines.append(f"• {category['name']} : {', '.join(category['skills'])}")
    return "\n".join(lines)


def answer_frontend() -> str:
    lines = [f"Compétences frontend : {_skills('frontend')}."]
    for exp in _experiences_using("Angular", "React"):
        mission = _first_mission(exp, ("angular", "react", "interface", "interfaces"))
        lines.append(f"• {exp['company']} : {mission}")
    lines.append("Ce portfolio est développé en React, TypeScript et Tailwind CSS.")
    return "\n".join(lines)


def answer_data() -> str:
    lines = [f"Data & Machine Learning : {_skills('data')}."]
    for exp in _experiences_using("Machine Learning", "Data Processing", "Data Analysis"):
        mission = _first_mission(exp, ("machine learning", "donnees", "modele"))
        lines.append(f"• {exp['company']} : {mission}")
    lines.append(f"Visualisation et BI : {_skills('automation')}.")
    return "\n".join(lines)


def answer_databases() -> str:
    lines = [f"Bases de données maîtrisées : {_skills('databases')}."]
    for exp in _experiences_using("PostgreSQL"):
        lines.append(f"• {exp['company']} : backend Flask avec PostgreSQL.")
    return "\n".join(lines)


def answer_devops() -> str:
    lines = [f"DevOps & déploiement : {_skills('devops')}."]
    for exp in _experiences_using("Nginx", "Gunicorn"):
        mission = _first_mission(exp, ("deploiement", "linux", "nginx"))
        lines.append(f"• {exp['company']} : {mission}")
    return "\n".join(lines)


def answer_automation() -> str:
    lines = [f"Automatisation & BI : {_skills('automation')}."]
    for exp in _experiences_using("Automatisation"):
        mission = _first_mission(exp, ("automatisation", "automatisant"))
        lines.append(f"• {exp['company']} : {mission}")
    return "\n".join(lines)


def answer_fit() -> str:
    profile = data.get_profile()
    return (
        "Son profil correspond à un poste de Développeur IA pour plusieurs raisons :\n"
        f"{_bullets(profile['strengths'])}\n\n"
        f"{profile['availability']}."
    )


def answer_contact() -> str:
    profile = data.get_profile()
    return (
        "Vous pouvez contacter Issam :\n"
        f"• Email : {profile['email']}\n"
        f"• LinkedIn : {profile['linkedin']}\n"
        f"• GitHub : {profile['github']}\n"
        "Ou via le formulaire de contact en bas de page."
    )


def answer_location() -> str:
    profile = data.get_profile()
    return (
        f"Localisation : {profile['location']}. {profile['mobility']}.\n"
        f"{profile['availability']}."
    )


# --- Détection d'intention ----------------------------------------------------


@dataclass(frozen=True)
class Intent:
    topic: str
    keywords: tuple[str, ...]
    build_answer: Callable[[], str]


# Ordre = priorité en cas d'égalité de score.
# Mot-clé avec espace : recherche d'expression ; <= 3 lettres : mot exact ; sinon : préfixe.
INTENTS: tuple[Intent, ...] = (
    Intent(
        "fit",
        ("pourquoi", "correspond", "adequation", "recruter", "embaucher", "atout",
         "point fort", "motivation", "poste", "cdi"),
        answer_fit,
    ),
    Intent(
        "projects",
        ("projet", "realis", "github", "portfolio", "moteur de recherche",
         "medicament", "chatbot"),
        answer_projects,
    ),
    Intent(
        "llm",
        ("llm", "ia", "ai", "gpt", "openai", "gemini", "ollama", "prompt", "generati",
         "intelligence artificielle", "nlp", "langage naturel", "modele de langage"),
        answer_llm,
    ),
    Intent(
        "backend",
        ("backend", "back end", "api", "rest", "flask", "fastapi", "node", "jinja",
         "serveur web"),
        answer_backend,
    ),
    Intent(
        "frontend",
        ("frontend", "front end", "react", "angular", "html", "css", "tailwind",
         "interface"),
        answer_frontend,
    ),
    Intent(
        "data",
        ("data", "donnee", "machine learning", "ml", "pandas", "numpy", "scikit",
         "classification", "predicti", "feature"),
        answer_data,
    ),
    Intent(
        "databases",
        ("sql", "postgres", "mysql", "mongo", "base de donnees", "bdd"),
        answer_databases,
    ),
    Intent(
        "devops",
        ("devops", "deploi", "deploy", "linux", "nginx", "gunicorn", "docker", "git",
         "production", "cloud"),
        answer_devops,
    ),
    Intent(
        "automation",
        ("automatis", "n8n", "power automate", "power bi", "workflow", "bi"),
        answer_automation,
    ),
    Intent(
        "experiences",
        ("experience", "stage", "entreprise", "parcours", "alten", "amd", "megastore",
         "narjiss", "mission", "travaill"),
        answer_experiences,
    ),
    Intent(
        "skills",
        ("competence", "stack", "technolog", "outil", "savoir", "maitris", "langage"),
        answer_skills,
    ),
    Intent(
        "contact",
        ("contact", "email", "mail", "linkedin", "joindre", "telephone", "cv"),
        answer_contact,
    ),
    Intent(
        "location",
        ("localisation", "situe", "habite", "ville", "mobilite", "france", "belgique",
         "maroc", "fes", "demenag", "relocal", "remote", "teletravail"),
        answer_location,
    ),
    Intent(
        "about",
        ("bonjour", "salut", "hello", "presente", "qui es", "qui est", "issam",
         "profil", "parle moi", "a propos"),
        answer_about,
    ),
)


def _keyword_matches(keyword: str, text: str, tokens: list[str]) -> bool:
    if " " in keyword:
        return f" {keyword} " in f" {text} "
    if len(keyword) <= 3:
        return keyword in tokens
    return any(token.startswith(keyword) for token in tokens)


def detect_intent(question: str) -> Intent | None:
    text = normalize(question)
    tokens = text.split()
    best: Intent | None = None
    best_score = 0
    for intent in INTENTS:
        score = sum(_keyword_matches(kw, text, tokens) for kw in intent.keywords)
        if score > best_score:
            best, best_score = intent, score
    return best


class RuleBasedAssistant:
    def answer(self, question: str) -> AssistantResponse:
        suggestions = data.get_suggested_questions()
        intent = detect_intent(question)
        if intent is None:
            return AssistantResponse(
                answer=OFF_TOPIC_MESSAGE, topic=None, suggestions=suggestions
            )
        return AssistantResponse(
            answer=intent.build_answer(),
            topic=intent.topic,
            suggestions=[q for q in suggestions if q.strip() != question.strip()][:3],
        )


@lru_cache
def get_assistant() -> AssistantProvider:
    provider = os.getenv("ASSISTANT_PROVIDER", "rules").lower()
    # Point d'extension : ajouter ici un provider LLM (ex. "openai", "gemini")
    # qui lit sa clé via os.getenv("LLM_API_KEY") et utilise app.data comme contexte.
    if provider == "rules":
        return RuleBasedAssistant()
    raise ValueError(f"ASSISTANT_PROVIDER inconnu : {provider}")
