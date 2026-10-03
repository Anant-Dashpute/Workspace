---
title: Python Parallelism Explained
date: 2026-10-03
tags: [Python, Parallelism, Concurrency]
---
Understanding how Python actually runs code at the same time, and when it doesn't.

Python offers several ways to run work concurrently, but the Global Interpreter
Lock (GIL) means only one thread executes Python bytecode at a time. Choosing the
right approach depends on whether your workload is CPU-bound or I/O-bound.

- Threading (`threading` module) suits I/O-bound work like network calls, since threads release the GIL while waiting
- `asyncio` gives cooperative concurrency for I/O-bound tasks with lower overhead than threads
- Multiprocessing sidesteps the GIL entirely by running separate interpreter processes
- Picking the wrong model (e.g. threads for CPU-bound math) gives no speedup at all
