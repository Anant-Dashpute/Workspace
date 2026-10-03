---
title: Kafka Topics
date: 2026-10-03
category: Concepts
tags: [Kafka, Messaging, Streaming]
---
The core unit of organization for messages flowing through Kafka.

A topic is a named stream of records that producers write to and consumers read
from, split into partitions for scalability and parallel processing.

- Partitions allow a topic to be distributed across brokers and consumed in parallel
- Messages within a partition are strictly ordered and retained for a configurable period
- Consumer groups let multiple consumers split partitions for parallel processing
- Replication factor controls how many broker copies exist for fault tolerance
