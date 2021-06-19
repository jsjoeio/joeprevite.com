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

The first thing I do in any new technology or program is the famous, "Hello world!".

To do that in Doom, do the following:

1. Open Emacs
2. Hit `SPC b N` — create new empty buffer
3. Type "Hello, Doom Emacs!"
4. Hit `SPC b s` - save buffer (use default location or pick)
5. Type in name of file — hello.txt
6. Hit enter

Boom! You've created your first file with Doom Emacs.

<Note>

Note: I like to think of a _buffer_ as a scratchpad. It exists in memory but has not yet been written to disk as a file.

</Note>

### Return to Start

After you've created this file, you probably want to close it.

To do so, we have to clear the frame. Hit `SPC q F`.

This will bring you back to the start with the Doom logo.

## How to

A list of things you might be wondering how you can do.

### Auto-save Buffers

I felt annoyed that I had to save my buffer every so often. Well turns out you can turn on auto-save.

Using this below, it auto-saves every 15 seconds.

1. Open your config: `.doom.d/config.el`
2. Add this block:
   ```clojure
   ;; This is so buffers auto-save
   ;; auto save
   (setq auto-save-visited-interval 15)
   (auto-save-visited-mode +1)
   ```
3. Restart Doom

### Fix M-RET in org-mode

If you're like me and you want it to add a new item when hitting `return` in a bulleted list, you can use a package called [`org-autolist`](https://github.com/calvinwyoung/org-autolist).

1. Add the package inside `.doom.d/packages.el`

```clojure
(package! org-autolist)
```

2. Add this to your `config.el`

```clojure
(add-hook 'org-mode-hook
          (lambda () (org-autolist-mode)))
```

3. Close Doom and run `doom build`
4. Open Doom and voilà, it works!

## Resources

Here are a list of handy resources:

- [Doom Emacs Cheatsheet](https://gist.github.com/hjertnes/9e14416e8962ff5f03c6b9871945b165)
- [Time Parsing](https://www.gnu.org/software/emacs/manual/html_node/elisp/Time-Parsing.html) - useful for inserting time-related values into your snippets
- [Focus on a Single Org SubTree](https://www.reddit.com/r/orgmode/comments/gm3g46/focus_on_single_org_subtree/)
