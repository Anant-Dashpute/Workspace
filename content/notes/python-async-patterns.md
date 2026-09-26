---
title: Python Async Patterns
category: Programming
date: 2025-02-20
file: notes/python-async-patterns.pdf
---
Practical patterns for asyncio, coroutines, and concurrency in Python.

`asyncio` lets you run many I/O-bound tasks concurrently on a single thread.

- Use `asyncio.gather` to run coroutines concurrently
- Avoid blocking calls inside async functions
- Prefer `async with` for connection pools and clients
