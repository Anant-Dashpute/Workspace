---
title: tmux - The Terminal Multiplexer You Need
date: 2026-10-03
tags: [Linux, tmux, Productivity]
---
How tmux keeps sessions alive and makes terminal work far more manageable.

tmux lets you run multiple terminal sessions inside a single window, detach from
them, and reattach later — even after disconnecting from SSH. It's indispensable
for long-running remote work and organizing terminal layouts.

- Sessions persist in the background even if your SSH connection drops
- Windows and panes let you split a single terminal into multiple views
- Detach with `Ctrl+b d` and reattach anytime with `tmux attach`
- Useful for keeping long builds, servers, or monitoring commands running unattended
