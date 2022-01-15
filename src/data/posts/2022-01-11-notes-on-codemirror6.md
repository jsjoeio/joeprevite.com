---
title: Notes on CodeMirror6
description: My ever-growing notes on working with CodeMirror6 and things I've
  learned along the way.
slug: code-mirror-notes
tagline: Things that were hard to find
date: 2022-01-11T04:42:16.597Z
tags:
  - Miscellaneous
---
I recently started playing around with [CodeMirror 6](https://codemirror.net/6/). 

There are some things that were easy to figure out on my own. Other things, not so much.

I figured I'd pay it forward - for both of us.

These are my ever-growing notes and learnings that I wish had been easier to find. At least now they will be this being published on my website.

## How to 

How to do X in CodeMirror 6:

### Use Vim

CodeMirror 5 had a vim keymap I believe. Recently, the team at Replit released a vim extension which ported over the old behavior. See [this repo](https://github.com/replit/codemirror-vim).

Keep in mind when using this, they assume you have `basicSetup` (the extension) included as well. I [opened an issue](https://github.com/replit/codemirror-vim/issues/7) about the cursor missing in insert mode because I didn't have `basicSetup` as an extension. Don't make the same mistake.

If you want to programmatically change vim modes (i.e. insert -> normal), check [here](https://github.com/replit/codemirror-vim/issues/6#issuecomment-1009362883).

### Get relative line numbers

There wasn't an extension for this so after digging around and pulling from other sources, I wrote my own extension and published [here](https://www.npmjs.com/package/codemirror-line-numbers-relative).

### Use with React

There are two main ways to do this. The first is using a package called `@uiw/react-codemirror` which you can find [here](https://uiwjs.github.io/react-codemirror/). They have CodeSandbox links so you can prototype something pretty quickly.

The other way is using [Sandpack](https://sandpack.codesandbox.io/), which uses CodeMirror 6 under the hood. It's not feature-complete but it's in active development and the team is very responsive to feedback.

### Set cursor position and update text in editor

There are two ways you can do this. You can either create a new state or dispatch a transaction. The latter will preserve history (i.e. hitting the undo shortcut will revert the text) will the former will not.

#### Option 1

```typescript
let newState = EditorState.create({
  doc: "hello world!!!",
  // Updates cursor location
  selection: EditorSelection.cursor(5),
});



view.setState(newState);
```

#### Option 2

```typescript
const transaction = view.state.update({
  changes: {
    from: 0,
    to: view.state.doc.length,
    insert: "my new text",
  },
  // Updates cursor location
  selection: { anchor: 3 },
});



view.dispatch(transaction);
```

## Summary

I hope this helps! If it does, tweet at @jsjoeio and let me know. And if you'd like to see something added, also let me know.