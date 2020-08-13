---
slug: 'brave-clojure'
date: '2020-08-12'
title: 'Brave Clojure'
description: 'My notes and thoughts on Brave Clojure'
tagline: 'My notes and thoughts'
published: true
tags: ['Clojure']
---

I am reading this book as part of my journey with my [ClojureFam](https://github.com/athensresearch/ClojureFam). These are my notes and thoughts that I'm taking as I read through the book. The plan is for this to evolve over time.

Per the ClojureFam curriculum, I am only reading Chapters 3 - 13.

## Notes

Below are my notes organized by chapter.

### Chapter 3: Do Things: A Clojure Crash Course

This chapter covers the foundation of Clojure including:

- syntax
- functions
- data

With this, we should be able to start writing code and solving problems!

> constant supply of parentheses delivered from the parenthesis mines hidden beneath the Massachusetts Institute of Technology, where Lisp was born

TIL Lisp was born at MIT, but I'm not surprised. Also loving the humor of the author.

#### Control Flow

`if`, `do` and `when`

`if` is your typical singular control flow.
`do` lets you wrap multiple forms and run each of them
`when` like `if` and `do` but without an `else`

#### naming values

`def` lets you name values.

Treat it as a special power for defining constants.

#### Strings

Strings can only be defined with double-quotes. No need to argue about it like in JS Prettier configs!

#### Keywords

Hmm...it showed a little but I'm feeling confused still.

So far, I know:

- they are defined with a ":" like `:a`
- they can bed used as functions to look up values in a data structure
  - you can provide a default value

That's it...I'll have to explore this area more later.

<!-- Stopped at Sets https://www.braveclojure.com/do-things/ -->

## Questions

I wrote down questions that came up while reading. Here they are

- Are `def` and words defined with ":" both called "keywords"? The ones with ":" are confusing to me.
- Maps vs. vectors vs. lists

## Glossary

**coercion** - todo
**contagion** - todo
**operator** - todo
**operand** - todo

## Cheatsheet

A few tips and tricks to remember.

### write an if statement

```clojure
(if boolean-form
  then-form
  optional-else-form)
```

### write a do statement

```clojure
(if true
  (do (println "Success!")
      "By Zeus's hammer!")
  (do (println "Failure!")
      "By Aquaman's trident!"))
; => Success!
; => "By Zeus's hammer!"
```

### equality operator

```clojure
; = sign. only one. (not ike JS where we have == or ===)
(= 1 1)
```

### add items to the end of a vector

```clojure
(conj [1 2 3] 4)
```
