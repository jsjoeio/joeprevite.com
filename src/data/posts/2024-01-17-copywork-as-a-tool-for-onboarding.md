---
title: Copywork as a Tool for Onboarding
description: In this article, I share a strategy called copywork which can be
  used as a tool to onboard engineers to a new codebase
slug: copywork
tagline: The best way to onboard engineers
date: 2024-01-17T23:33:11.764Z
tags: []
---
### What is copywork?
It's where you copy someone else's work as a way to learn. In frontend engineering, the classic example of this is "Clone Netflix's UI." 

### How does it work in the onboarding context?
When you join a new company, you're thrown into a codebase. It's intimidating. Where to you start? How do you get the ball rolling? Well, that's where copywork comes into play.

### How to apply copywork in a new codebase
To apply copywork in a new codebase (internal or external), follow these steps:
1. Find a merged PR (ideally small but not too small) - [example in OSS](https://github.com/vercel/next.js/pull/60783)
2. Checkout the parent commit
3. Redo the changes introduced by the PR by hand

This takes the guesswork out of where to start when you join a new codebase. It is also less mentally taxing because all you're doing is copying the code that's already been merged. Much easier than trying to find a "good onboarding task". It also gets an engineer familiar with a codebase 5x faster.

###  Summary 
Overall this process is similar to learning how to play an instrument. You play popular songs like Jingle Bells. Then over time, you start playing and creating your own music. We're doing the same thing but with code.