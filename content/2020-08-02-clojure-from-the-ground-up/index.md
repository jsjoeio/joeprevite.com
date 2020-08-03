---
slug: "clojure-from-the-ground-up"
date: "2020-08-02"
title: "Clojure from the Ground Up "
description: "My notes and thoughts on Clojure from the Ground Up by Kyle Kingsbury"
tagline: "My notes and thoughts"
published: true
tags: ["Clojure"]
---

I am reading this book as part of my journey with my [ClojureFam](https://github.com/athensresearch/ClojureFam). These are my notes and thoughts that I'm taking as I read through the book. The plan is for this to evolve over time.

## Notes

Below are my notes organized by chapter.

### Chapter 1

I am loving the approach the author took for this book. The way it's written, the approach they're taking. I wish more books took this kind of approach. It's friendly and welcoming.

Leiningen is cool. Is it the same as `npm` in JavaScript land?

Symbols like `inc` point to verbs which do things for you.


> We transform expressions by substituting meanings for symbols, and obtain some result. This is the core of the Lambda Calculus, and it is the theoretical basis for almost all computer languages.

Does this mean I should study Lambda Calculus? Either way, neat to learn this.

### Chapter 2

Vectors, lists and other sequences are interchangeable (for the most part). The difference being performance usually.

Maps have key values (like objects in JavaScript).

### Chapter 3

> For instance, we can redefine addition to mean subtraction, for the duration of a let:

This is trippy.
```clojure
(let [+ -] (+ 2 3))
```
> Functions represent unrealized computation.

This is a beautiful sentence.

> Good Clojurists use def to set up a program initially, and only change those definitions with careful thought.

I want to be a good Clojurist. Keep this in mind, Future Joe!

Doc-strings remind me of Python.

Love the `doc` command to see a function signature and doc string.

The fact that you can get meta information and see for instance when a function was added and where it lives is incredible.

## Questions

I wrote down questions that came up while reading. Here they are:
- If Clojure is built on top of Java, does that mean Java is the host language?
- What's the difference between 16 bits, 32 bits and 8 bit?  
- Are vars stored in their own file when created with `def`?
- What's the difference between `meta` and `source`?
- Vectors aren't evaluated like lists so no need to quote them to stop evaluation...but why?
- What's the difference between Integers vs. Longs vs. Shorts?
- What's it called where the repl checks for matching parens?


## Glossary

## Cheatsheet

A few tips and tricks to remember.

### Refer to something without evaluating

Use the single quote `'`  like so:

```clojure
`inc
```

### loose vs strict equality

`==` is more loosely while `===` in JavaScript is stricter.

### truthiness vs falseness

`nil` is negative, but `0` is truthy.

The only negative values are `false` and `nil`.