---
title: MR Approval Bot
date: 2026-10-03
category: Projects
tags: [AI, GitLab API, Automation, DevOps]
---
An AI-powered bot that reviews merge requests and auto-approves when changes pass checks.

Uses an AI model to analyze merge request diffs for code quality and risk, then
calls the GitLab API to approve automatically once the requested changes are verified.

- Fetches MR diffs and comments through the GitLab API
- Uses an AI model to review code changes against defined review criteria
- Automatically re-checks requested changes and approves the MR once satisfied
- Stack: Python, GitLab API, AI/LLM review model
