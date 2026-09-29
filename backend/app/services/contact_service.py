"""
Envoi des messages de contact.

`LogContactNotifier` se contente de journaliser le message. Pour envoyer de vrais emails
(Resend, SMTP, EmailJS...), créer une classe respectant `ContactNotifier` et la
sélectionner dans `get_contact_notifier()` via la variable CONTACT_PROVIDER.
"""

import logging
import os
from functools import lru_cache
from typing import Protocol

from app.schemas import ContactMessage

logger = logging.getLogger("portfolio.contact")


class ContactNotifier(Protocol):
    def send(self, message: ContactMessage) -> None: ...


class LogContactNotifier:
    def send(self, message: ContactMessage) -> None:
        logger.info(
            "Nouveau message de contact | nom=%s | email=%s | message=%s",
            message.name,
            message.email,
            message.message,
        )


@lru_cache
def get_contact_notifier() -> ContactNotifier:
    provider = os.getenv("CONTACT_PROVIDER", "log").lower()
    if provider == "log":
        return LogContactNotifier()
    raise ValueError(f"CONTACT_PROVIDER inconnu : {provider}")
