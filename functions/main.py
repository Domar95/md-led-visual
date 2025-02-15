import os
import json
import base64

from firebase_functions import https_fn
from firebase_admin import initialize_app
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from email.mime.text import MIMEText

initialize_app()

ALLOWED_ORIGIN = "http://localhost:4200"

REQUIRED_SECRETS = [
    "GMAIL_REFRESH_TOKEN",
    "GMAIL_CLIENT_ID",
    "GMAIL_CLIENT_SECRET",
    "SENDER_EMAIL_ADDRESS",
]


def get_gmail_service():
    """Authenticate with Gmail API"""
    creds = Credentials(
        token=None,
        refresh_token=os.environ.get("GMAIL_REFRESH_TOKEN"),
        client_id=os.environ.get("GMAIL_CLIENT_ID"),
        client_secret=os.environ.get("GMAIL_CLIENT_SECRET"),
        token_uri="https://oauth2.googleapis.com/token",
    )
    return build("gmail", "v1", credentials=creds)


def create_email_message(receiver_email: str, subject: str, message_text: str):
    """Create and encode an email message"""
    message = MIMEText(message_text)
    message["to"] = receiver_email
    message["from"] = os.environ.get("SENDER_EMAIL_ADDRESS")
    message["subject"] = subject
    return base64.urlsafe_b64encode(message.as_bytes()).decode("utf-8")


@https_fn.on_request(secrets=REQUIRED_SECRETS)
def send_email(req: https_fn.Request) -> https_fn.Response:
    """Handles email sending via Gmail API"""

    # Handle Preflight (OPTIONS) Requests
    if req.method == "OPTIONS":
        return https_fn.Response(
            status=204,
            headers={
                "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        )

    try:
        # Restrict API access based on Origin
        origin = req.headers.get("Origin")
        if origin != ALLOWED_ORIGIN:
            return https_fn.Response(
                json.dumps({"success": False, "error": "Forbidden - Invalid Origin"}),
                status=403,
                headers={"Content-Type": "application/json"},
            )

        # Parse request data
        data = req.get_json()
        receiver_email = data.get("email")
        subject = data.get("subject")
        message_text = data.get("message")

        if not receiver_email or not subject or not message_text:
            return https_fn.Response(
                json.dumps({"success": False, "error": "Missing required fields"}),
                status=400,
                headers={"Content-Type": "application/json"},
            )

        # Create and send the email
        raw_message = create_email_message(receiver_email, subject, message_text)
        service = get_gmail_service()
        send_request = (
            service.users()
            .messages()
            .send(userId="me", body={"raw": raw_message})
            .execute()
        )

        return https_fn.Response(
            json.dumps(
                {"success": True, "message": "Email sent!", "id": send_request["id"]}
            ),
            status=200,
            headers={
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
            },
        )

    except Exception as e:
        return https_fn.Response(
            json.dumps({"success": False, "error": str(e)}),
            status=500,
            headers={
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
            },
        )
