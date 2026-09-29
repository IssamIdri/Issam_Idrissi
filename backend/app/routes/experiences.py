from fastapi import APIRouter

from app import data
from app.schemas import Experience

router = APIRouter(prefix="/experiences", tags=["Expériences"])


@router.get("", response_model=list[Experience])
def get_experiences() -> list[dict]:
    return data.get_experiences()
