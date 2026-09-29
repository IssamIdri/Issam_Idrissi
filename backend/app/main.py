import logging
import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import assistant, contact, experiences, profile, projects, skills

load_dotenv()

logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "INFO"),
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)

app = FastAPI(
    title="Portfolio Issam AI — API",
    description="API REST du portfolio d’Issam Aissaoui Idrissi, Développeur IA / Backend Python & LLM.",
    version="1.0.0",
)

allowed_origins = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    # Permet d'autoriser les URLs de preview Vercel, ex. https://portfolio-issam-ai-.*\.vercel\.app
    allow_origin_regex=os.getenv("ALLOWED_ORIGIN_REGEX") or None,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/", tags=["Santé"])
def root() -> dict[str, str]:
    return {"message": "Portfolio API is running"}


for router_module in (profile, skills, experiences, projects, contact, assistant):
    app.include_router(router_module.router, prefix="/api")
