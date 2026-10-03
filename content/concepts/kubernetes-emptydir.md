---
title: Kubernetes emptyDir Volumes
date: 2026-10-03
category: Concepts
tags: [Kubernetes, Volumes, Storage]
---
A temporary, pod-scoped volume useful for scratch space and sharing data between containers.

An `emptyDir` is created empty when a pod is assigned to a node and exists as long
as that pod runs on that node — deleted permanently once the pod is removed.

- Great for scratch space, caches, or passing files between containers in the same pod
- Can be backed by node disk or `Memory` medium for faster, RAM-based storage
- Data does not survive pod restarts that reschedule it to a different node
- Commonly used alongside sidecar containers for log shipping or data staging
