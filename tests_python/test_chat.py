# -*- coding: utf-8 -*-

"""The assistant's model call and its stream, against a fake Bedrock client."""

import json
import logging

import pytest
import vercel_ai_sdk_mate.api as sdk

from portfolio_ai.ai_sdk_adapter import (
    request_body_to_bedrock_converse_messages,
    ui_message_stream,
)
from portfolio_ai.chat import build_system, stream_reply, usage_summary
from portfolio_ai.paths import path_enum


class FakeBedrock:
    """Records the converse_stream call and replays a canned event stream."""

    def __init__(self, events=None, error=None):
        self.events = events or []
        self.error = error
        self.calls = []

    def converse_stream(self, **kwargs):
        self.calls.append(kwargs)
        if self.error:
            raise self.error
        return {"stream": iter(self.events)}


def text_events(*chunks, usage=None):
    events = [{"messageStart": {"role": "assistant"}}]
    events += [{"contentBlockDelta": {"delta": {"text": c}, "contentBlockIndex": 0}} for c in chunks]
    events += [{"messageStop": {"stopReason": "end_turn"}}]
    events += [{"metadata": {"usage": usage or {}}}]
    return events


def parse_sse(lines):
    out = []
    for line in lines:
        assert line.startswith("data: ") and line.endswith("\n\n")
        body = line[len("data: "):-2]
        out.append(body if body == "[DONE]" else json.loads(body))
    return out


def test_system_prompt_caches_instruction_and_knowledge_base():
    system = build_system("rules", "facts")
    assert system == [{"text": "rules"}, {"text": "facts"}, {"cachePoint": {"type": "default"}}]


def test_stream_reply_yields_text_and_sends_the_cached_prefix(caplog):
    client = FakeBedrock(
        text_events("Grace ", "built ", "Lumina.", usage={"inputTokens": 20, "cacheReadInputTokens": 2100})
    )
    system = build_system("rules", "facts")
    messages = [{"role": "user", "content": [{"text": "What did Grace build?"}]}]

    with caplog.at_level(logging.INFO, logger="portfolio_ai.chat"):
        text = "".join(stream_reply(client, "model-x", system, messages, max_tokens=600, temperature=0.3))

    assert text == "Grace built Lumina."
    (call,) = client.calls
    assert call["modelId"] == "model-x"
    assert call["system"] == system
    assert call["messages"] == messages
    assert call["inferenceConfig"] == {"maxTokens": 600, "temperature": 0.3}
    assert "'cache_read': 2100" in caplog.text


def test_usage_summary_defaults_missing_counts_to_zero():
    assert usage_summary({"inputTokens": 5}) == {"input": 5, "output": 0, "cache_read": 0, "cache_write": 0}


def test_ui_stream_follows_the_ai_sdk_protocol():
    events = parse_sse(ui_message_stream(iter(["Hi", " there"]), fallback="sorry"))
    types = [e if e == "[DONE]" else e["type"] for e in events]
    assert types == ["start", "text-start", "text-delta", "text-delta", "text-end", "finish", "[DONE]"]
    text_id = events[1]["id"]
    assert all(e["id"] == text_id for e in events[1:5])
    assert "".join(e["delta"] for e in events if e != "[DONE]" and e["type"] == "text-delta") == "Hi there"


def test_ui_stream_turns_a_failed_call_into_a_readable_reply():
    client = FakeBedrock(error=RuntimeError("no credentials"))
    deltas = stream_reply(client, "m", [], [], max_tokens=10, temperature=0)
    events = parse_sse(ui_message_stream(deltas, fallback="Email Grace instead."))
    deltas_sent = [e["delta"] for e in events if e != "[DONE]" and e["type"] == "text-delta"]
    assert deltas_sent == ["Email Grace instead."]
    assert events[-2] == {"type": "finish", "finishReason": "stop"}


def test_ui_stream_keeps_partial_text_when_the_stream_breaks():
    def broken():
        yield "Grace evaluated"
        raise ConnectionError("dropped")

    events = parse_sse(ui_message_stream(broken(), fallback="Try again."))
    deltas_sent = [e["delta"] for e in events if e != "[DONE]" and e["type"] == "text-delta"]
    assert deltas_sent == ["Grace evaluated", "\n\nTry again."]


def make_body(messages):
    return sdk.RequestBody(id="chat-1", trigger="submit-message", messages=messages)


def msg(role, *texts, extra_parts=()):
    parts = [{"type": "text", "text": t} for t in texts] + list(extra_parts)
    return sdk.Message(**{"id": f"{role}-{len(texts)}", "role": role, "parts": parts})


def test_history_converts_to_bedrock_turns_and_drops_empty_ones():
    body = make_body([
        msg("user", "What is Lumina?"),
        msg("assistant", "An analytics agent."),
        msg("assistant", "   "),  # empty: Bedrock would reject it
        msg("user", "Who built it?"),
    ])
    assert request_body_to_bedrock_converse_messages(body) == [
        {"role": "user", "content": [{"text": "What is Lumina?"}]},
        {"role": "assistant", "content": [{"text": "An analytics agent."}]},
        {"role": "user", "content": [{"text": "Who built it?"}]},
    ]


def test_prompts_load_and_name_grace():
    assert "Grace" in path_enum.instruction_content
    assert "Generated from the site's data/ files" in path_enum.knowledge_base_content


@pytest.mark.parametrize("field", ["instruction_content", "knowledge_base_content"])
def test_prompts_are_not_empty(field):
    assert getattr(path_enum, field).strip()
