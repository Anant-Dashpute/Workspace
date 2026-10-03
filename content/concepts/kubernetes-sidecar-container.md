---
title: Kubernetes Sidecar Containers
date: 2026-10-03
category: Concepts
tags: [Kubernetes, Sidecar, Architecture]
---
Running a helper container alongside your main app inside the same pod.

A sidecar container runs in the same pod as the primary container, sharing its
network namespace and volumes, to add functionality without changing app code.

- Common uses: log shippers, proxies (e.g. service mesh), metrics exporters, config reloaders
- Shares the pod's network (localhost) and any mounted volumes with the main container
- Since Kubernetes 1.28, native sidecar support lets you mark them as `restartPolicy: Always` init containers
- Keeps the main application container focused on a single responsibility
