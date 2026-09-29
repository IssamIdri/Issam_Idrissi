from fastapi import APIRouter

from app import data
from app.schemas import Project

router = APIRouter(prefix="/projects", tags=["Projets"])


@router.get("", response_model=list[Project])
def get_projects() -> list[dict]:
    return data.get_projects()
