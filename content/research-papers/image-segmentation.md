---
title: U-Net — Convolutional Networks for Image Segmentation
date: 2026-09-29
category: Research
tags: [Computer Vision, Segmentation]
---
Summary notes on the U-Net encoder-decoder architecture for segmentation.

U-Net uses a contracting encoder path to capture context paired with a
symmetric expanding decoder path that enables precise localization, with skip
connections linking corresponding encoder and decoder layers.

- Skip connections preserve fine-grained spatial detail lost during downsampling
- Trains effectively with very few annotated images via heavy data augmentation
- Widely used beyond biomedical imaging, forming the basis for many segmentation models
