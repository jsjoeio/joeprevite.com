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

### Chapter 5: Macros

Macros are a programming concept that I'm still wrappig my head around. Here's what I understand:

- you, the programmer, define them
- they run before the other rules of the program

Borrowing the example from the book, here is a macro called `ignore`:

```clojure
(defmacro ignore
    "Cancels the evaluation of an expression, returning nil instead."
    [expr]
    nil)

;; Example
user=> (ignore (+ 1 2))
nil
```

My issue with macros is these examples often start like so: preventing evaluation. I can't think of a time where I needed something like this, which makes the concept hard to grasp. Let's hope we have a more practical example ahead of us.

> Where functions rewrite values, macros rewrite code.

Simple. Concicse. Beautiful. We are making progress.

`macroexpand` implements the macro without evaluating the expression. Sounds like a handy tool to test that a macro wrote the code you expected.

When a programming language uses the same language for the macros, we call it a _procedural macro system._ Clojure falls into this category, while C doesn't (C uses the C preprocessor for macros).

This section on _special forms_ feels a bit fuzzy. I'm not groking what the author is saying related to the _syntax-quote_ or the _unquote_ and _unquote-splice_. I'll have to revisit this in the future.

More terms here that sound foreign:

- symbol capture
- anaphoric
- unhygenic

#### Control Flow

Covering control flow, it appears there are a lot of options for us including:

- `if` - takes a predicate and two expressions
- `when` - takes one predicate and any num of expressions
- `if-not` - inverts `if`
- `when-not` - inverts `when-not`
- `while` - evaluates expression as long as predicate is truthy
- `cond` - multiheaded `if`
- `condp` - like `cond` but with a predicate
- `case` - doesn't evaluate in order, much faster than others

#### Recursion

> Use `recur` wherever possible. It requires much less memory and is much faster than the explicit recusion.

As the author explains, it tells the Clojure compiler that we can re-use a space for other things.

They tell us to think of it like a "recursive `let`."

Note to self: practice `recur`.

_On an unrelated note, the author used smörgåsbord and this is the first time in my life I've seen the word spelled. I am guessing here, but think it's a Sweedish breakfast? Need to double-check, but eye-opening to see how its spelled._

> In essence, ->> flattens and reverses a nested chain of operations

Sounds like witchcraft. Another thing I need to familiarize myself with.

_Side note: I wish I could practice using these different tools in Clojure. Like short, 2-min exercises. Wouldn't that be nice? Think 4Clojure, but 4-5 problems focusing on a specific function/tool/keyword._

#### Problems

Oh boy. These problems sound tougher than the last ones. I'm going to select a few here:

1. "Using the control flow constructs we’ve learned, write a schedule function which, given an hour of the day, returns what you’ll be doing at that time. (schedule 18), for me, returns
   :dinner ."

2. "Write a macro id which takes a function and a list of args: (id f a b c), and returns an expression which calls that function with the given args: (f a b c)."

3. "Write a macro log which uses a var, logging-enabled, to determine whether or not to print an expression to the console at compile time. If logging-enabled is false,
   (log :hi) should macroexpand to nil. If logging-enabled is true, (log :hi) should macroexpand to (prn :hi). Why would you want to do this check during compilation, instead of when running the program? What might you lose?"

### Chapter 6: State

This chapter focuses on changes to your program i.e. mutability.

The bindings used by default in Clojure are immutable.

We see that Clojure supports closures (that's hard to say) and allows you to carry over values from an outer function.

> This is the basis of concurrency: evaluating expressions outside their normal, sequential order.

Now I feel like I'm making progress with concurrency.

`delay` is in an interesting macro. It sounds like it utilizes memoization, meaning it caches the result of the expression.

#### futures, promises and delays

- delays defer evaluation (I will evaluate this later)
- futures paralleize it (I'll do this later)
- promises will come back with a value

Still working through this part.

With promises, the program can guarantee that when you read it, you it will wait until it has a value for you.

#### vars

These are global variables. They are mutable. However, a dynamic var can only be mutated within the scope of a particular function call.

This brings safety to variables which may have the same name, but are used in different threads. The thread with special powers can change the value without changing it for the other threads.

#### atoms

I love the sound of these, probably because it reminds me of the React logo.

I like these because you can create them, and safely mutate them. Their values are protected. You can't look inside and see what they hold unless you `deref` or use `@`.

> Clojure’s reliance on immutable datatypes, immutable variables, and pure functions enables this approach to linearizable mutability

Yay immutability and pureness!

Multi-identity updates—i.e. you want to update two atoms—then reach for a special identity type called _Ref_. These are updated in groups.

You use `dosync` transactions.

### Chapter 7: Logistics

`lein` has a useful scaffolding tool built into the CLI. The default boilterplate comes with your traditional nuts and bolts. The exceptions are:

- `resources` which is for additional files, like images
- `test` for tests
- `target` for compiled code

I like that they recommend a structure. It's something the JS ecosystem refuses, but I like it.

<!-- stopped at fbi json -->

## Questions

I wrote down questions that came up while reading. Here they are:

- If Clojure is built on top of Java, does that mean Java is the host language?
- What's the difference between 16 bits, 32 bits and 8 bit?
- Are vars stored in their own file when created with `def`?
- What's the difference between `meta` and `source`?
- Vectors aren't evaluated like lists so no need to quote them to stop evaluation...but why?
- What's the difference between Integers vs. Longs vs. Shorts?
- What's it called where the repl checks for matching parens?
- How do you use the syntax-quote, unquote and unquote-splice?
- When to use futures, promises and delays?
- When do I need to use parens vs. not? (atoms, (deref xs) vs. @xs)

## Glossary

- **anaphoric** - todo
- **base case** - used in recursion to stop the infinite loop
- **concurrency** - todo
- **inductive case** - also called the _recurrence relation_, the thing that gets called repeatedly
- **lazy** - constructed, but not executed
- **macro** - meta-code that runs before your program runs
- **parallelism** - todo
- **predicate** - used with `if` expressions. it's the condition we use to check if it evaluates to turthy or falsey
- **procedural macro system** - a macro system implemented in the language in which you use it
- **special forms** - syntax like `if` which are built into the language
- **symbol capture** - todo
- **tail-recursive function** - todo
- **unhygenic** - todo
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

### how to define a macro

```clojure
(defmacro ignore
    "Cancels the evaluation of an expression, returning nil instead."
    [expr]
    nil)

;; Example
user=> (ignore (+ 1 2))
nil
```

### generate a new symbol

Useful for when you need a new variable in a macro

```clojure
user=> (gensym "hi")
hi326
```

### access code in other namespaces

```clojure
; If we want to access `scratch.core` from the outside
(ns user (:require (scratch.core)))
```
