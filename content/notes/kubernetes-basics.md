---
title: Kubernetes Basics
category: DevOps
date: 2025-06-01
file: notes/kubernetes-basics.pdf
---
Introduction to Kubernetes concepts: pods, deployments, and services.

Kubernetes is a container orchestration platform. A **Pod** is the smallest deployable
unit, a **Deployment** manages replicas and rollouts, and a **Service** exposes pods on
a stable network endpoint.

- Pods share network namespace and storage
- Deployments handle rolling updates and self-healing
- Services provide load balancing across pods
