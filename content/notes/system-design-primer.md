---
title: System Design Primer
category: System Design
date: 2025-04-12
file: notes/system-design-primer.pdf
---
Notes on scalability, caching, load balancing, and database design.

Good system design balances **latency**, **throughput**, and **consistency**.

- Cache reads with a CDN or in-memory store (Redis)
- Use load balancers to distribute traffic across replicas
- Choose between SQL and NoSQL based on access patterns, not hype
