# -*- coding: utf-8 -*-

"""
Adapter module for converting Vercel AI SDK format to AWS Bedrock format.

This module bridges the gap between the frontend (using Vercel AI SDK) and
the backend (using AWS Bedrock). It transforms message structures from
AI SDK's format into Bedrock Converse API's expected format.

The Vercel AI SDK sends messages in a specific format with 'parts' (for
multi-modal content support), while Bedrock expects a different structure.
This adapter handles that translation.

Dependencies:
- vercel_ai_sdk_mate: https://pypi.org/project/vercel-ai-sdk-mate/
  Provides typed dataclass wrappers for Vercel AI SDK request/response formats,
  making it easier to work with the JSON data from the frontend.
"""

import json
import logging
import typing as T
import uuid

import vercel_ai_sdk_mate.api as vercel_ai_sdk_mate

logger = logging.getLogger(__name__)


def part_to_bedrock_content(part: vercel_ai_sdk_mate.T_PART) -> dict | None:
    """
    Convert an AI SDK message part to a Bedrock content block.

    Only non-empty text is sent. Other parts (reasoning, and anything a later
    SDK version adds) are dropped rather than failing the whole request.
    """
    if part.type == vercel_ai_sdk_mate.MessagePartTypeEnum.TEXT.value and part.text.strip():
        return {"text": part.text}
    return None


def message_to_bedrock_message(message: vercel_ai_sdk_mate.Message) -> dict | None:
    """
    Convert an AI SDK message to Bedrock message format.

    Handles role mapping between AI SDK and Bedrock:
    - AI SDK 'user' -> Bedrock 'user'
    - AI SDK 'assistant' -> Bedrock 'assistant'
    - AI SDK 'system' -> Skipped (Bedrock handles system prompts separately)

    Args:
        message: An AI SDK message object containing role and parts.

    Returns:
        dict: Bedrock message format with 'role' and 'content' fields,
              or None if the role is not mappable (e.g., system).
    """
    # Map AI SDK roles to Bedrock roles
    # Note: Bedrock Converse API handles system prompts separately,
    # so there's no direct mapping for the 'system' role
    ai_sdk_role_to_bedrock_role_mapping = {
        vercel_ai_sdk_mate.MessageRoleEnum.USER.value: "user",
        vercel_ai_sdk_mate.MessageRoleEnum.ASSISTANT.value: "assistant",
    }

    if message.role not in ai_sdk_role_to_bedrock_role_mapping:
        return None  # e.g. system messages: the server owns the system prompt
    content = [block for part in message.parts if (block := part_to_bedrock_content(part))]
    if not content:
        return None  # Bedrock rejects a message with no content
    return {"role": ai_sdk_role_to_bedrock_role_mapping[message.role], "content": content}


def request_body_to_bedrock_converse_messages(
    request_body: vercel_ai_sdk_mate.RequestBody,
) -> list[dict]:
    """
    Convert an entire AI SDK request body to Bedrock message list.

    This is the main entry point for converting frontend chat history
    into Bedrock's expected format. It processes all messages in the
    request and filters out any that can't be mapped.

    Args:
        request_body: The parsed request body from the AI SDK frontend,
                      containing the full conversation history.

    Returns:
        list[dict]: List of Bedrock-formatted messages ready for the
                    Converse API's 'messages' parameter.

    Example:
        >>> request_body = RequestBody(**await request.json())
        >>> bedrock_messages = request_body_to_bedrock_converse_messages(request_body)
        >>> # bedrock_messages can now be passed to ChatSession
    """
    messages = []
    for message in request_body.messages:
        bedrock_message = message_to_bedrock_message(message)
        if bedrock_message is not None:
            messages.append(bedrock_message)
    return messages


def get_last_user_message_text(request_body: vercel_ai_sdk_mate.RequestBody) -> str | None:
    """
    Extract the text content from the last user message in the request.

    This is useful for validation (e.g., message length check) before
    processing. Returns None if extraction fails for any reason, allowing
    the caller to gracefully skip validation rather than crash.

    Args:
        request_body: The parsed AI SDK request body.

    Returns:
        str: The text content of the last user message.
        None: If extraction fails (no messages, wrong format, etc.).
    """
    try:
        # The last message in the list is always the user's latest input
        last_message = request_body.messages[-1]
        # AI SDK stores text in parts[0].text for text messages
        return last_message.parts[0].text
    except (IndexError, AttributeError, TypeError):
        # If anything goes wrong, return None to skip validation
        return None


def _sse(payload: dict | str) -> str:
    data = payload if isinstance(payload, str) else json.dumps(payload)
    return f"data: {data}\n\n"


def ui_message_stream(deltas: T.Iterable[str], fallback: str) -> T.Iterator[str]:
    """
    Wrap streamed text in the AI SDK UI message stream protocol (SSE).

    https://ai-sdk.dev/docs/ai-sdk-ui/stream-protocol
    Each delta is sent as it arrives. If the model call fails, before or
    midway through the reply, the visitor gets ``fallback`` as text instead
    of a broken chat, and the error goes to the server log.
    """
    text_id = str(uuid.uuid4())
    yield _sse({"type": "start"})
    yield _sse({"type": "text-start", "id": text_id})
    sent_any = False
    try:
        for delta in deltas:
            sent_any = True
            yield _sse({"type": "text-delta", "id": text_id, "delta": delta})
    except Exception:  # the stream boundary: log it, tell the visitor
        logger.exception("chat stream failed")
        prefix = "\n\n" if sent_any else ""
        yield _sse({"type": "text-delta", "id": text_id, "delta": prefix + fallback})
    yield _sse({"type": "text-end", "id": text_id})
    yield _sse({"type": "finish", "finishReason": "stop"})
    yield _sse("[DONE]")
