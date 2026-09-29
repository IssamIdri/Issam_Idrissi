from fastapi import APIRouter, Depends

from app import data
from app.schemas import AssistantQuestion, AssistantResponse
from app.services.assistant_service import AssistantProvider, get_assistant

router = APIRouter(prefix="/assistant", tags=["Assistant IA"])


@router.post("/ask", response_model=AssistantResponse)
def ask_assistant(
    payload: AssistantQuestion,
    assistant: AssistantProvider = Depends(get_assistant),
) -> AssistantResponse:
    return assistant.answer(payload.question)


@router.get("/suggestions", response_model=list[str])
def get_suggestions() -> list[str]:
    return data.get_suggested_questions()
