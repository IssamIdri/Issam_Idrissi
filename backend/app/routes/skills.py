from fastapi import APIRouter

from app import data
from app.schemas import SkillCategory

router = APIRouter(prefix="/skills", tags=["Compétences"])


@router.get("", response_model=list[SkillCategory])
def get_skills() -> list[dict]:
    return data.get_skill_categories()
