---
slug: 'github-pr-template'
date: '2020-02-08'
title: 'Create a GitHub PR Template'
description: 'A short tutorial on how to add a github pr template to your project.'
tagline: 'A handy addition for standardizing contributions'
published: true
---

PR Templates are one of my favorite features. I can't remember when I first learned about them but essentially, it's a template which appears when someone opens a pull request on your project. This comes in handy for projects with multiple contributors.

If you prefer to learn by watching, you can find this on [egghead](https://egghead.io/lessons/github-create-a-github-pr-template?af=fd8rz3).

Here's how you can set it up:

1. Create a `.github` directory at the root of your project
2. Add a file called `pull_request_template.md` . Here's example:

```markdown
This PR...

## Changes

-

## Screenshots

(prefer animated gif)

## Checklist

- [ ] tested locally
- [ ] added new dependencies
- [ ] updated the docs
- [ ] added a test

Fixes #
```

3. Make sure these changes are on the default branch
4. Open a PR and viola! See your template in action.

Enjoy the added benefits of using PR templates!
