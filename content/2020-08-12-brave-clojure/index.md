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

It saves some time because you don't have to pass two args every time. Instead, only 1.

### Chapter 5: Functional Programming

This chapter covers a lot of the foundation of functional programming:
- pure functions
- immutable data
- function composition

Going through the game we build - the Peg game - felt a bit confusing.

He starts off by explaining a function used to generate triangular numbers. I am not sure why we need this function though. Okay...I went up back a few pages and realized it's used to create the triangle figure itself. If you start with 1, then move to the next row, 2, 3, then the next, 4, 5, 6, you'll see that the right side of the triangle has triangular numbers - 1, 3, 6.

The first function he shows us called `tri` is used to generate these numbers.

The neat thing the author demos here is the cleanliness of pure functions. For moving pegs, he shows four functions. Each function takes in the `board` as the first argument. By doing this, we're able to keep them pure. It's beautiful!

This code is so elegant too! I am enjoying reading it.

TIL you can define a *predicate function*, meaning it's meant to be used in Boolean expressions. Example of a predicate function definition:

```clojure
(defn can-move?
  "Do any of the pegged positions have valid moves?"
  [board]
  (some (comp not-empty (partial valid-moves board))
        (map first (filter #(get (second %) :pegged) board))))
```

<Note>

The sign we look for to tell if this is a predicate function is the "?" at the end of the function name.

</Note>

### Chapter 6: Organizing Your Project

>  In Clojure programs, you are *always* in a namespace.

Probably something important to remember.

`map` and `inc` are referred to as symbols in Clojure. And symbols are data types in Clojure.


You can store your code in namespaces, and also access them from other namespaces using `refer`.

You can define private functions using the `defn-` (note the `-` at the end).

Handy resource: [ns-cheatsheet.clj](https://gist.github.com/ghoseb/287710/)

### Chapter 7: Reading, Evaluation and Macros

#### Macros

Macros allow you to write your own rules to expand a language to fit your needs. Rust supports them too!

It's like writing your own syntax.

They enable *syntactic expansion* i.e. expanding the syntax to match what you want.

#### Evaluation

Clojure will read your source code into data structures and then evaluate it.

The unique part about Clojure is that it evaluates native data structures. Apparently this is uncommon. So when it reads the source code, it creates native data structures like lists.

Things that aren't a list or symbol evaluate to themselves:

```clojure
true
; => true

false
; => false

{}
; => {}
```

#### Reading
The reader looks at the source code and *reads* it into a data structure. Reading and evaluating are two separate processes. You, the user, can interact with the reader.

#### Special Forms

Concepts or key pieces of functionality within the language that rely on core behavior and can't be implemented with functions.

### Chapter 8: Writing Macros 

Macros are another tool in your tool satchel. 

The key difference between functions and macros is their arguments. Functions receive their arguments after they are evaluated while macros receive them before they are evaluated.

The `~` can be used after a `'` to say evaluate that part of the expression.

`gensym` will generate a unique symbol. This is handy when using `let` bindings in a macro and avoiding variable capture (namespace collision).

### Chapter 9: Concurrent and Parallel Programming

Paralleism is like texting in one hand and drinking in the other. You're doing multiple tasks at the same time - in parallel.

This may be the best introduction to concurrency I have ever read. Using the analogy with Lady Gaga is so helpful. I'm amazed.

#### Three Concurrency Problems

1. Reference cell problem - two threads can read and write to the same location.
2. Mutual exclusion - two threads with write access, neither having exclusive write access.
3. Deadlock - threads waiting for something to become available.

#### Future

Executing a task on a separate thread when you don't need the result immediately. When you do request it, it's called *dereferencing* it.

Another cool thing - the future value is cached! This means the second time you request it, it'll be lightning fast!

You can also say to a future, "Hey are you done yet?" by asking if it's `realized?`.

Futures give you the power to sprinkle concurrency into your program without making a big mess.

#### Delays

Similar to futures in that they are not executing or providing the result right away. They are run once and cached.

You can `force` it to run to get the result.

I'm not sure how they differ from futures though.

#### Promises

Woah...this is kind of meta. They allow you to express that you want a result, but you don't know when you'll want it. You use it as a placeholder for an actual value, and then you "deliver" a result to the promise. When you want it, you dereference it. See example:

```clojure
(def my-promise (promise))
(deliver my-promise (+ 1 2))
@my-promise
; => 3
```

It's like giving a box to someone and saying, "I'm going to put something in this box and then I want you to hold on to it."

"Okay, I'm delivering this thing. Put it in the box. I'll let you know when I need it."

"Hey I need that thing."

### Chapter 10: Atoms, Refs, and Vars

Values don't change (because they're immutable), but you can apply a process to derive a new value.

We assign identities using names.

Think of state as snapshot in time representing the value of an identity.

I like this analogy by Rich Hickey. Think of a phone number. In a 5-year span, Joe's phone number might change because I moved states. Even though the numbers may be different, the identity stays the same - it's still Joe's number.

#### Atoms

Create an atom using the `atom` keyword. It then binds to your value and you can deference it to access its current state.

Atoms can't be altered by another thread. 

To assign a new value to an atom, you use `swap!`.

#### Watches and Validators

> A watch is a function that takes four arguments: a key, the reference being watched, its previous state, and its new state.

> Validators let you specify which states are allowable for a reference.

Does this mean it's similar to a...state machine?

#### Refs

If you need to have an event that updates state for multiple identities, then you use refs!

`commute` lets you update a ref's state within a transaction.

#### Vars

Vars are similar to `def`, but they can work well with concurrency because you can dynamically bind them and make other alterations. 

A dynamic var might be handy when you need to create a global name that refers to different values in different contexts.

### Chapter 11: Mastering Concurrent Processes

A *process* is something that piece of logic that runs concurrently and responds to events.

Processes are entities that interact and respond to each other without a central control system. They're independent but work together.

If you're having trouble understanding them, try connecting it to the real-world. Think of objects in life that behave based on the events around them. No examples come to mind right now, but if they do, I'll add them here.

> Channels communicate messages.

You can add message to a channel or remove them. I like to thing of a channel like the gutters in a street when it rains and water is flowing down them like a mini-river. You can add paper boats to them (messages) or remove them.

Maybe not the best analogy but the first one that comes to mind!

> go block--runs concurrently on a separate thread. Go blocks run your processes on a thread pool.

> Buffers are just elaborations of the core model: processes are independent, concurrently executing units of logic that respond to events. You can create processes with go blocks and communicate events over channels.

### Chapter 12: Working with the JVM

There are three aspects to know when thinking about Clojure applications and the JVM.
1. Clojure and Java apps are run the same way
2. To read files and to work with dates, you need to utilize core Java objects
3. You need to know a bit of Java to use its libraries in your apps

You can call methods on an object with `(.methodName object)`.

The main takeaways:
- Clojure apps have access to Java libraries
- You can interop with Java as well

## Questions

I wrote down questions that came up while reading. Here they are

- Are `def` and words defined with ":" both called "keywords"? The ones with ":" are confusing to me.
- Maps vs. vectors vs. lists?
- When to use hash sets vs. sorted sets?
- Why do Clojure lazy sequences only need to be realized once? Are they cached?
- What is "serial code"?
- What are some real use cases for concurrency and parallelism?
- How do futures differ from delays?
- What is software transactional memory (STM)?

## Glossary

- **arity** - the number of parameters of a function
- **coercion** - todo
- **compare-and-set semantics** - todo
- **concurrency** - managing more than one task at the same time
- **consing** - when you use `cons` function
- **contagion** - todo
- **dynamicaltude** - todo
- **expander** - todo
- **function composition** - todo
- **future** - a task defined on another thread without requiring the result right away
- **homoiconic** - todo
- **indirection** - todo
- **interning** - in the context of `var`, it's where you internalize it within a namespace
- **interleaving** - switching between two tasks.
- **Java interop** - the ability to use Java classes, objects and methods
- **just-in-time-compilation** - todo
- **lazy sequence** - members aren't computed until you access them
- **macro expansion** - "the process of determining the return value of a macro"
- **memoize** - todo
- **mutex**
- **nondeterministic** - todo
- **reader macros** - todo
- **referential transparency** - todo
- **reference types** - let you manage identities in Clojure
- **realizing** - "computing a (lazy) seq's members"
- **operator** - todo
- **operand** - todo
- **parallelism** - executing more than one task at the same time
- **predicate function** - "a function whose return value is evaluated for truth or falsity"
- **side effect** - todo 
- **tail call optimization** - todo
- **thread** - a subprogram
- **triangular numbers** - todo

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

### create a new project

```shell
lein new app <name>
```