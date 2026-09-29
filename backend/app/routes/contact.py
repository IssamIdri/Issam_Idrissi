from fastapi import APIRouter, Depends

from app.schemas import ContactMessage, ContactResponse
from app.services.contact_service import ContactNotifier, get_contact_notifier

router = APIRouter(prefix="/contact", tags=["Contact"])


@router.post("", response_model=ContactResponse)
def send_contact_message(
    message: ContactMessage,
    notifier: ContactNotifier = Depends(get_contact_notifier),
) -> ContactResponse:
    notifier.send(message)
    return ContactResponse(success=True, message="Message reçu avec succès.")
