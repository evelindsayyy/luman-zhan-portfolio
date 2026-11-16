# -*- coding: utf-8 -*-

"""
Test for Config Management.

This test is intentionally minimal. We only verify that Config.new() can
successfully create an instance in the current runtime environment.

Why such a simple test?
-----------------------
The Config class uses factory methods that detect the runtime environment
(local vs Vercel) and create appropriately configured instances. If the
factory method runs without error, it means:

1. Runtime detection works (runtime.is_local() or runtime.is_vercel())
2. Environment variables are accessible (on Vercel) or default chain works (locally)
3. The Config dataclass is correctly defined

We don't need to test specific values because:
- On local: values come from defaults, nothing to verify
- On Vercel: values come from environment variables, which are platform-managed

The fact that `config` exists and is usable is the test.
"""

from portfolio_ai.config import Config, config


def test_vercel_config_reads_the_aws_keys(monkeypatch):
    monkeypatch.setenv("AWS_ACCESS_KEY_ID", "AKIA-TEST")
    monkeypatch.setenv("AWS_SECRET_ACCESS_KEY", "secret-test")
    vercel = Config.new_in_vercel_runtime()
    assert vercel.aws_access_key_id == "AKIA-TEST"
    assert vercel.aws_secret_access_key == "secret-test"


def test_vercel_config_without_keys_still_loads(monkeypatch):
    """
    The keys are set only when the AI assistant is deployed. Until then the
    API must still start: a KeyError here took down every /api route on
    Vercel, /api/hello included.
    """
    monkeypatch.delenv("AWS_ACCESS_KEY_ID", raising=False)
    monkeypatch.delenv("AWS_SECRET_ACCESS_KEY", raising=False)
    vercel = Config.new_in_vercel_runtime()
    assert vercel.aws_access_key_id is None
    assert vercel.aws_secret_access_key is None


def test_new_config():
    """
    Verify that config singleton is successfully created.

    This test passes if the module-level `config = Config.new()` executed
    without raising an exception. The underscore assignment is a Python
    idiom meaning "I'm using this value just to verify it exists."
    """
    _ = config


def test_chat_model_defaults_to_nova_micro(monkeypatch):
    monkeypatch.delenv("CHAT_MODEL_ID", raising=False)
    assert Config().model_id == "us.amazon.nova-micro-v1:0"


def test_chat_model_can_be_switched_by_env(monkeypatch):
    monkeypatch.setenv("CHAT_MODEL_ID", "us.anthropic.claude-haiku-test")
    assert Config().model_id == "us.anthropic.claude-haiku-test"


def test_blank_chat_model_env_falls_back_to_default(monkeypatch):
    monkeypatch.setenv("CHAT_MODEL_ID", "")
    assert Config().model_id == "us.amazon.nova-micro-v1:0"
