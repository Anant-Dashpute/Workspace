---
title: Kubernetes ConfigMaps
date: 2026-09-29
category: Concepts
tags: [Kubernetes, ConfigMaps, DevOps]
---
Decoupling configuration from container images in Kubernetes.

A ConfigMap stores non-confidential key-value configuration data that pods can
consume as environment variables, command-line arguments, or mounted files.
This keeps configuration separate from application code so images stay
portable across environments.

- Create from literals, files, or directories with `kubectl create configmap`
- Consume via `envFrom`, individual `env.valueFrom.configMapKeyRef`, or volume mounts
- Updates to a mounted ConfigMap propagate to pods, but env var injections do not
- Not for secrets — use a Secret object for sensitive data instead
