# -*- coding: utf-8 -*-

"""
The AI assistant's model call.

The system prompt is the instruction plus the knowledge base, followed by a
cache point. That prefix is the same for every visitor and every turn, so
after the first call Bedrock reads it from cache instead of billing it as
fresh input; only the conversation itself is new each turn. Caching needs
at least 1,024 tokens before the cache point on Nova models, which the
knowledge base alone clears (a test checks it).

The reply is streamed: text is yielded as Bedrock produces it, and token
usage, including cache reads and writes, is logged when the stream ends.
"""

import logging
import typing as T

if T.TYPE_CHECKING:  # pragma: no cover
    from mypy_boto3_bedrock_runtime import Client

logger = logging.getLogger(__name__)


def build_system(instruction: str, knowledge_base: str) -> list[dict]:
    """The cached prefix: instruction, knowledge base, then the cache point."""
    return [
        {"text": instruction},
        {"text": knowledge_base},
        {"cachePoint": {"type": "default"}},
    ]


def usage_summary(usage: dict) -> dict[str, int]:
    """Token counts from a Bedrock usage block, with missing fields as 0."""
    return {
        "input": usage.get("inputTokens", 0),
        "output": usage.get("outputTokens", 0),
        "cache_read": usage.get("cacheReadInputTokens", 0),
        "cache_write": usage.get("cacheWriteInputTokens", 0),
    }


def stream_reply(
    client: "Client",
    model_id: str,
    system: list[dict],
    messages: list[dict],
    max_tokens: int,
    temperature: float,
) -> T.Iterator[str]:
    """
    Yield the reply's text as it streams from Bedrock.

    Errors from Bedrock (no credentials, throttling, a bad request) are raised
    to the caller, which turns them into a message the visitor can read.
    """
    response = client.converse_stream(
        modelId=model_id,
        system=system,
        messages=messages,
        inferenceConfig={"maxTokens": max_tokens, "temperature": temperature},
    )
    for event in response["stream"]:
        if "contentBlockDelta" in event:
            text = event["contentBlockDelta"]["delta"].get("text")
            if text:
                yield text
        elif "metadata" in event:
            logger.info("chat usage %s", usage_summary(event["metadata"].get("usage", {})))
        elif "messageStop" in event:
            reason = event["messageStop"].get("stopReason")
            if reason != "end_turn":
                logger.info("chat stopped early: %s", reason)
