---
slug: 'auto-assign-pull-requests-github'
date: '2020-03-21'
title: 'Auto-Assign Pull Requests on GitHub'
description: 'A short tutorial on how to auto-assign pull requests on GitHub.'
tagline: 'Skip the hassle of manual assignment'
published: true
tags: ['GitHub']
---

Back when I was working at [Echobind](https://echobind.com/), we used a Slack + GitHub integration to notify you of PRs you needed to review. I loved it! As soon as a PR was assigned to me, I would get a ding on Slack. It worked really well.

Since we worked on small teams, the PR reviewers were always the same 1-2 devs. I thought,

> Wouldn't it be great if we could auto-assign them?

Turns out you can! Here's how:

1. Create a file called CODEOWNERS (no extension)
2. Place it at the root or in the `.github` directory
3. Add the following code to your file:
   ```shell
   # Make @lukeskywalker @yoda reviewers for every file
   *       @lukeskywalker @yoda
   ```

BOOM! And the cool part, you won't be assigned your own pull requests (I don't think you can be?)!

Note: you can get fancy and set up code owners for specific directories, extensions, etc. [Read the docs](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/about-code-owners).

If you prefer to learn by watching, you can find this on [egghead](https://egghead.io/lessons/github-auto-assign-a-pull-request-on-github?pl=github-tips-tricks-6fc4?af=fd8rz3).
