from fastapi import APIRouter

from app import data
from app.schemas import Profile

router = APIRouter(prefix="/profile", tags=["Profil"])


@router.get("", response_model=Profile)
def get_profile() -> dict:
    return data.get_profile()
