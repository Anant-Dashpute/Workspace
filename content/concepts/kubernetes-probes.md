---
title: Kubernetes Probes (Liveness, Readiness, Startup)
date: 2026-09-29
category: Concepts
tags: [Kubernetes, Probes, DevOps]
---
Health checks that let Kubernetes manage container lifecycle safely.

Probes let the kubelet periodically check container health and act on the
results, keeping traffic away from unhealthy pods and restarting stuck ones.

- Liveness probe: restarts the container if it fails, catching deadlocks
- Readiness probe: removes the pod from service endpoints until it passes
- Startup probe: gives slow-starting containers time before liveness checks begin
- Supported mechanisms: HTTP GET, TCP socket, and exec command checks
