# -*- coding: utf-8 -*-

"""
FastAPI backend for the site's AI assistant, served as a Vercel Python Function.

- /api/hello: health check
- /api/chat: takes the AI SDK chat history, streams Grace's assistant's reply
  from Amazon Bedrock in the AI SDK UI message stream protocol (SSE)
"""

import logging
import os
import sys

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, StreamingResponse
from vercel_ai_sdk_mate.api import RequestBody  # Parses AI SDK request format

# Add project root to sys.path for module imports
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

# fmt: off
from portfolio_ai.paths import path_enum  # System prompt & knowledge base paths
from portfolio_ai.boto_ses import bedrock_runtime_client  # Pre-configured Bedrock client
from portfolio_ai.config import config
from portfolio_ai.chat import build_system, stream_reply
from portfolio_ai.ai_sdk_adapter import request_body_to_bedrock_converse_messages
from portfolio_ai.ai_sdk_adapter import ui_message_stream
# fmt: on

logging.basicConfig(level=logging.INFO, stream=sys.stderr, format="%(levelname)s %(name)s: %(message)s")

FALLBACK_REPLY = (
    "Sorry, the assistant can't answer right now. "
    "You can reach Grace directly at zhanluman0612@gmail.com."
)

# Built once per cold start; identical for every request, which is what lets
# Bedrock serve it from cache.
SYSTEM = build_system(path_enum.instruction_content, path_enum.knowledge_base_content)

app = FastAPI()


@app.get("/api/hello")
async def hello_world():
    """Health check endpoint for testing FastAPI integration."""
    return JSONResponse(content={"message": "Hello from FastAPI!", "status": "success"})


@app.post("/api/chat")
async def handle_chat_data(request: Request):
    """Stream the assistant's reply to the conversation so far."""
    request_body = RequestBody(**(await request.json()))
    messages = request_body_to_bedrock_converse_messages(request_body)

    deltas = stream_reply(
        client=bedrock_runtime_client,
        model_id=config.model_id,
        system=SYSTEM,
        messages=messages,
        max_tokens=config.max_output_tokens,
        temperature=config.temperature,
    )
    response = StreamingResponse(
        ui_message_stream(deltas, fallback=FALLBACK_REPLY),
        media_type="text/event-stream",
    )
    response.headers["x-vercel-ai-ui-message-stream"] = "v1"  # Required for AI SDK v5+
    response.headers["Cache-Control"] = "no-cache"
    response.headers["Connection"] = "keep-alive"
    return response
