---
title: Kubernetes Volume Mounts
date: 2026-10-03
category: Concepts
tags: [Kubernetes, Volumes, Storage]
---
How pods attach storage to containers so data can persist or be shared.

A volume is defined at the pod level and then mounted into one or more containers
at a specific path, decoupling storage lifecycle from the container filesystem.

- Volumes are declared in `spec.volumes` and attached via `volumeMounts` in each container
- Multiple containers in a pod can mount the same volume to share data
- Volume types include `configMap`, `secret`, `persistentVolumeClaim`, and `emptyDir`
- Mount paths can be read-only to prevent accidental writes
