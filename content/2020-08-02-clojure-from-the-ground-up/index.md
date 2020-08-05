---
slug: 'clojure-from-the-ground-up'
date: '2020-08-02'
title: 'Clojure from the Ground Up '
description: 'My notes and thoughts on Clojure from the Ground Up by Kyle Kingsbury'
tagline: 'My notes and thoughts'
published: true
tags: ['Clojure']
---

I am reading this book as part of my journey with my [ClojureFam](https://github.com/athensresearch/ClojureFam). These are my notes and thoughts that I'm taking as I read through the book. The plan is for this to evolve over time.

## Notes

Below are my notes organized by chapter.

### Chapter 1: Welcome

I am loving the approach the author took for this book. The way it's written, the approach they're taking. I wish more books took this kind of approach. It's friendly and welcoming.

Leiningen is cool. Is it the same as `npm` in JavaScript land?

Symbols like `inc` point to verbs which do things for you.

> We transform expressions by substituting meanings for symbols, and obtain some result. This is the core of the Lambda Calculus, and it is the theoretical basis for almost all computer languages.

Does this mean I should study Lambda Calculus? Either way, neat to learn this.

### Chapter 2: Basic Types

Vectors, lists and other sequences are interchangeable (for the most part). The difference being performance usually.

Maps have key values (like objects in JavaScript).

### Chapter 3: Functions

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

### Chapter 4: Sequences

This section walks you through applying changes to sequences instead of a single number.

We can join two pieces together using `cons` which means create a list starting with the first arg and adding on the rest in the second arg.

```clojure
user=> (cons 1 [2 3 4])
(1 2 3 4)
```

One of the suggestions is recusion. I've used this before in other languages. It's a common technique.

Wow...this may be the best example I've seen that walks you through writing a function which takes a function as the first argument and calls it with a sequence of elements.

Here is the function:

```clojure
(defn transform-all [f xs]
"transform-all takes in a function as the first argument
and a sequence as the second argument. It checks "
    (if (first xs) ; check to make sure we have at least one element
        (cons (f (first xs)) ; apply f to the first of xs, and join
            (transform all f (rest xs))) ; call f with rest of xs
        (list))) ; if no first num, return empty list
```

Clojure is blowing my mind right now with these built-in keywords like `take`, `iterate`, `repeat` and `expand`. I almost wish I had a bunch of exercises to practice these. I know some may come up in 4Clojure though.

Between `interleave`, `interpose`, and `reserve`, there are so many handle functions built into the language. I'm impressed.

It's like if lodash were built into JavaScript.

Ah, `take-last` would have been handy.

> `reduce` really is the uberfunction over sequences

It may be time to finally sit down and learn me some `reduce`!

It's curious to hear that "most of Cljoure's sequence functions are lazy." I am not used to working in this type of context. Most of the time, I think functions are executed immediately. With Clojure, it doesn't seem like that's the case.

The author skillfully takes a difficult problem such as "find the sum of the products of consecutive pairs of the first 1000 odd intgers" and breaks it down into smaller chunks that one can follow. I find it refreshing. I wish we encouraged more learning materials to take this approach. Not only does it show their thinking, but it makes it accessible to all levels of students.

#### Problems

At the end of Chapter 4 are 4 problems. Here they are listed with the answers I came up with:

1. "Write a function to find out if a string is a palindrome—that is, if it looks like the same forwards and backwards.

```clojure
(fn palindrome
    "returns true if word is a palindrome"
    [word]
    (= (seq word) (seq (reverse word))))
```

2. "Find the number of 'c's in "abracadabra"

This one was tougher than the first. I tried a few things like splitting the string into characters and then counting. No luck there. I also tried spliting and then filtering for a character. That didn't work either.

I cheated and used [this solution](https://stackoverflow.com/a/29040450/3015595) from Stack Overflow.

```clojure
(count (re-seq #"c" "abracadabra"))
```

3. "Write your own version of filter"

```clojure
(fn joe-filter
    "My own implementation of filter"
    [pred coll]
    ; loop over coll with x
    ; if pred true for x
    ; add to list
    ; return list
    ; todo finish
    )
```

4. "Find the first 100 prime numbers: 2, 3, 5, 7, 11, 13, 17"

todo

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

- **base case** - used in recursion to stop the infinite loop
- **inductive case** - also called the _recurrence relation_, the thing that gets called repeatedly
- **lazy** - constructed, but not executed
- **unrealized** - waiting to be executed

## Cheatsheet

A few tips and tricks to remember.

### Refer to something without evaluating

Use the single quote `'` like so:

```clojure
`inc
```

### loose vs strict equality

`==` is more loosely while `===` in JavaScript is stricter.

### truthiness vs falseness

`nil` is negative, but `0` is truthy.

The only negative values are `false` and `nil`.

### writing comments

```clojure
(let [x 1]
;; this is a comment
    x) ; and another one
```

### split a string into characters

```clojure
(seq "joe")
```
