---
slug: 'doom-emacs'
date: '2021-05-26'
title: 'Doom Emacs'
description: 'Learn how to use Doom Emacs with this getting started guide.'
tagline: 'The getting started guide'
published: true
tags: ['Miscellaneous']
---

This is my guide for getting started with Doom Emacs as a complete noob.

I know there are a ton of videos on YouTube and a lot of content out there, but nothing seemed to give me that "Hello world!" experience I am used to when trying out new things. This guide is here to solve that.

## Installation

There is no point in me repeating the installation instructions since the Doom Emacs official ["Getting Started"](https://github.com/hlissner/doom-emacs/blob/develop/docs/getting_started.org) covers way more than I ever could.

The only to remember is this:

1. Install Emacs & Dependencies
2. Install Doom Emacs

That's it.

They also recommend running `doom doctor` after if it's you're first time. I would do this if I were you.

This will identify any missing dependencies and prevent issue when we run Doom Emacs.

### Troubleshooting

There were a couple issues I ran into after following the installation steps for macOS.

#### doom not found in PATH

It's supposed to add it for you, but maybe my zsh configuration is wonky and messed that up. To fix, run this from the terminal:

```shell
path+=($HOME/.emacs.d/bin)
```

#### couldn't find marked

I don't remember the exact error, but I was missing a package/dependency called `marked`. To fix, install with npm/yarn:

```shell
npm i -g marked

yarn global add marked
```

Figured it out thanks to [this issue](https://github.com/hlissner/doom-emacs/issues/1424).

#### fontconfig isn't installed

> unable to detect fonts because fontconfig isn't installed

To fix, install with brew using:

```shell
brew install fontconfig
```

## Hello, Doom Emacs

Coming soon!
