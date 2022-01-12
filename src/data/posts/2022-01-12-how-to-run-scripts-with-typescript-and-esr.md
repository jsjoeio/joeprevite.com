---
title: How to Run Scripts with TypeScript and esr
description: This article walks you through running scripts with TypeScript and
  esr as an alternative to ts-node.
slug: typescript-esr
tagline: An alternative to ts-node
date: 2022-01-12T05:03:55.909Z
tags:
  - TypeScript
---
For the past couple of years, the main way to run scripts written in TypeScript has been with `ts-node`. However, now we have something faster and more modern - [`esbuild-runner`](https://github.com/folke/esbuild-runner) or `esr` for short.

It's very fast and very easy to start using today. 

## How to Use

In 2mins or less, lets show you exactly how to use it:

1. `yarn init -y` - create a new project
2. `yarn add -D esbuild esbuild-runner` - add dependencies
3. `echo "console.log('hello world')" > hello-world.ts` - create a script
4. `yarn esr hello-world.ts` - run your script

After that, you should see the following output in your terminal:

```shell
yarn run v1.22.15
$ /esr-test/node_modules/.bin/esr hello-world.ts
hello world
Done in 0.23s
```

Lightning fast! And with that new knowledge, you can now migrate your project's scripts over from Bash to TypeScript. Woohoo!