# -*- coding: utf-8 -*-

"""
Runtime detection decides where credentials come from: the AWS profile on a
laptop, environment variables on Vercel. Getting it wrong fails only once
deployed, so it is pinned here.
"""

from portfolio_ai.runtime import Runtime, RuntimeEnum


def test_vercel_is_detected_by_its_env_var(monkeypatch):
    monkeypatch.setenv("VERCEL", "1")
    runtime = Runtime()
    assert runtime.name == RuntimeEnum.VERCEL.value
    assert runtime.is_vercel()
    assert not runtime.is_local()


def test_anything_else_is_local(monkeypatch):
    monkeypatch.delenv("VERCEL", raising=False)
    runtime = Runtime()
    assert runtime.name == RuntimeEnum.LOCAL.value
    assert runtime.is_local()
    assert not runtime.is_vercel()


def test_only_the_exact_value_counts(monkeypatch):
    monkeypatch.setenv("VERCEL", "0")
    assert Runtime().is_local()
