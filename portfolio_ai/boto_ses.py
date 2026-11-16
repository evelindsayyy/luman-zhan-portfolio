# -*- coding: utf-8 -*-

"""
AWS session and client factory.

Provides pre-configured boto3 session and clients for the entire codebase.
Import what you need:

    from .boto_ses import bedrock_runtime_client

One place handles credentials, everywhere else just uses the client.
"""

import boto3
from botocore.config import Config as BotoConfig

from .config import config

boto_ses = boto3.Session(
    region_name=config.aws_region,
    aws_access_key_id=config.aws_access_key_id,
    aws_secret_access_key=config.aws_secret_access_key,
)

# One retry, short timeouts: a visitor waiting on a chat reply is better
# served by a quick "can't answer right now" than by botocore's default
# four retries with backoff, which held a throttled request for ~8 seconds.
BEDROCK_CLIENT_CONFIG = BotoConfig(
    retries={"max_attempts": 2, "mode": "standard"},
    connect_timeout=5,
    read_timeout=30,
)

# Shared client instance - reuse across requests to avoid connection overhead
bedrock_runtime_client = boto_ses.client("bedrock-runtime", config=BEDROCK_CLIENT_CONFIG)
