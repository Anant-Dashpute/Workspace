---
title: Multicore Processing in Python
date: 2026-10-03
tags: [Python, Multiprocessing, Performance]
---
Using the `multiprocessing` module to actually use every CPU core.

The `multiprocessing` module spawns independent processes, each with its own
Python interpreter and memory space, letting CPU-bound workloads scale across
cores without the GIL getting in the way.

- `Pool.map` is the easiest way to parallelize a function across a list of inputs
- Processes communicate via pickling data through queues or pipes, which adds overhead
- Shared memory (`multiprocessing.shared_memory`) avoids copying large data between processes
- Best suited for CPU-heavy tasks like image processing, numeric computation, and data transforms
