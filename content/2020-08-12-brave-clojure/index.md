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

#### Sets

Hash sets are used more often.

#### Functions

Clojure has first-class support for functions (meaning it supports higher-order functions).

Docstrings provide a way for you to document your functions. They can be viewed by called `doc fn-name`.

Arity is the number of parameters for a function. Clojure functions can take zero or more params.

Clojure functions also support function overloading, aso called arity overloading. This means you can use different function bodys based on the number of arguments called with the function.

Functions support a *rest* parameter meaning "give me the rest", but it must come last in the function signature.

Clojure functions automatically return the last evaluated value.

There is a strange looking syntax for an annonymous function which uses the `#` symbol. This is possible thanks to *reader macros*. More on that later.

```clojure
;; Function call
(* 8 3)

;; Anonymous function
#(* % 3)
```

You can see that the function takes one parameter and substitutes it in place of the `%`.

Returning functions from other functions create closures, meaning they have access to variables defined within them.

`loop` has better performance than say a normal function which is called recursively.

`re-find` alows you to check whether a string matches a regex pattern.

#### Exercises

Things to practice what I've learned in the chapter so far:

1. Use the `str`, `vector`, `list`, `hash-map`, and `hash-set` functions.
2. Write a function that takes a number and adds 100 to it.
3. Write a function `dec-maker` that works exactly like `inc-maker` but with subtraction.

```clojure
(def dec9 (dec-maker 9))
(dec9 10)
; => 1
```
4. Write a function `mapset` that works like `map` except the return value is a set.

```clojure
(mapset inc [1 1 2 2])
; => #{2 3}
```

### Chapter 4: Core Functions in Depth

I like the sound of the chapter name! Deep learning. My kind of thing.

One of the central tenants of Clojure's philosophy is "programming to abstractions". What this means is they program to abstractions (i.e. functions) rather than data structures (like lists vs. hashes).

> I think of abstractions as named collections of operations

I love this description. I've never heard of it described this way. And a function is simply an abstraction.

`take-while` can be more efficient than `filter` because it doesn't have to process all of the data.

Lazy seq elements only need to be realized once. Does Clojure cache them?

> `apply` explodes a seqable data structure so it can be passed to a function that expects a rest parameter

Well that's an unusual use of the word "explodes."

An example:

```clojure
(apply max [0 1 2])
```

By doing this, we apply all the elements in the vector to `max`.

When to use `partial`? The answer:

> In general, you want to use partials when you find you’re repeating the same combination of function and arguments in many different contexts.

Another example of this using a logger:

```clojure
(defn lousy-logger
  [log-level message]
  (condp = log-level
    :warn (clojure.string/lower-case message)
    :emergency (clojure.string/upper-case message)))

(def warn (partial lousy-logger :warn))

(warn "Red light ahead")
; => "red light ahead"
```

It saves some time ebcause you don't have to pass two args every time. Instead, only 1.

### Chapter 5: Functional Programming

This chapter covers a lot of the foundation of functional programming:
- pure functions
- immutable data
- function composition



## Questions

I wrote down questions that came up while reading. Here they are

- Are `def` and words defined with ":" both called "keywords"? The ones with ":" are confusing to me.
- Maps vs. vectors vs. lists?
- When to use hash sets vs. sorted sets?
- Why do Clojure lazy sequences only need to be realized once? Are they cached?

## Glossary

- **arity** - the number of parameters of a function
- **coercion** - todo
- **consing** - when you use `cons` function
- **contagion** - todo
- **expander** - todo
- **function composition** - todo
- **indirection** - todo
- **lazy sequence** - members aren't computed until you access them
- **memoize** - todo
- **reader macros** - todo
- **referential transparency** - todo
- **realizing** - "computing a (lazy) seq's members"
- **operator** - todo
- **operand** - todo
- **predicate function** - "a function whose return value is evaluated for truth or falsity"
- **tail call optimization** - todo

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

### write a hash set

```clojure
#{"kurt vonnegut" 20 :icicle}
```