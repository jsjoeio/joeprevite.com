---
slug: "rust-lang-book-chapter-4-notes"
date: "2020-08-03"
title: "Rust Lang Book - Chapter 4 Notes"
description: "My notes from Chapter 4 of the Rust Lang Book."
tagline: "Understanding Ownership in Rust"
published: true
tags: ['Rust', 'Book']
---

This is the next blog post in a series related to The Rust Programming Language Book. Previously, I covered other chapters (most recently [Chapter 3](https://joeprevite.com/rust-lang-book-chapter-3-notes)) and [contributing to Rust open source](https://joeprevite.com/contributing-to-rust-open-source). Here, I cover my notes on [Chapter 4](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html).

## Notes on Chapter 4

In this chapter, we learn all about ownership. This feature — unique to Rust — allows the language to guarantee memory safety without using a garbage collector.

Coming from languages like JavaScript or Python, this might feel foreign to you. At least it did for me. I would encourage you to scroll to the Glossary section at the bottom if you see an unfamiliar term. This chapter covers the following:
- Ownership
- Borrowing
- References
- The Slice Type

### basics of the ownership rules

- Every value has an owner
- They are only allowed one owner at a time
- When a value goes out of scope, Rust drops the value

This means that Rust can guarantee a value is never owned by more than one owner so that it can safely drop the value when it's out of scope and free up that memory.

### is dropping a value the same as removing a value?

I asked myself this question, and I think the answer is it depends. Dropping a value in the context of ownership means that the value is no longer guaranteed to be in memory. This means you can't access it. It isn't accessible by your program.

Removing can mean the same thing depending on how you use it. I don't want to hyper-focus because it isn't useful. I think this is a semantics thing. Drop means to free up the memory. You can't *remove* memory though.

Dropping seems to be the one the authors use so we will stick *with* that. But be aware that by dropping a value when it goes out of scope, we *remove* the ability to use or reference it.

### scopes feel similar to JS

In JavaScript, there are rules where variables are only accessible within specific scopes. In Rust, there are similar rules. Values are only valid within a certain range. Outside of that range, they are not. As they say in the book,
> At this point, the relationship between scopes and when variables are valid is similar to that in other programming languages.

### String vs string literal

I won't go into depth on this because I could write an entire article on it, but look at this code:
```rust
let s = String::from("hello");
```

`String` is a string type which has a function under its namespace called `from()`. It takes in a string literal like `"hello"` and returns a `String`. The key here is that `"hello"` is a string literal. That's all I'll say here for now.

Further reading: [What’s the difference? - String::from() vs “literal”](https://users.rust-lang.org/t/whats-the-difference-string-from-vs-literal/15415/3)

### Rust won't let your memory go to waste

Instead of having to keep track of what memory you use throughout your program, Rust returns the memory after your variable goes out of scope. The compiler does the work for you, no garbage collection needed!

> Here! A gift for you—it's the memory that is no longer in use. You're welcome.
> —Rust

The way it does this is by calling `drop` automatically at the closing curly bracket where your value goes out of scope. Here's some code from [Variable Scope](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html#variable-scope) section of the book (pg. 64) :

```rust
    {                      // s is not valid here, it’s not yet declared
        let s = "hello";   // s is valid from this point forward

        // do stuff with s
    }                      // this scope is now over, and s is no longer valid
```

### resource acquisition is initialization

I am not familiar with C++, but they mention something called *Resource Acquisition Is Initialization (RAII).*

It's a "pattern of deallocating resources at the end of an item's lifetime." ([source](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html#variable-scope))

### length vs capacity

I highlighted this because I wanted to remember the difference.

> The length is how much memory, in bytes, the contents of the String is currently using. The capacity is the total amount of memory, in bytes, that the String has received from the allocator.

- length = how much memory is in use by said String
- capacity = total amount of memory that String has received

### double-free error

This was a new concept to me. It's where two data pointers point to the same piece of data. When they both go out of scope, they will try to free the same piece of memory, which could lead to memory corruption.

### copy vs clone

I felt confused reading about these two ways to interact with data. I found the `std::clone::Clone` [defintion](https://doc.rust-lang.org/std/clone/trait.Clone.html) to be most clear:

> [Clone differs] from Copy in that Copy is implicit and extremely inexpensive, while Clone is always explicit and may or may not be expensive.

### ownership and functions

Another "gotcha" in this section.

> Passing a variable to a function will move or copy, just as assignment does.

How are you supposed to know which it is? I guess the compiler will tell you if you choose the wrong one? I'm not sure about this. Here's the example [they use](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html#ownership-and-functions):

```rust
fn main() {
    let s = String::from("hello");  // s comes into scope

    takes_ownership(s);             // s's value moves into the function...
                                    // ... and so is no longer valid here

    let x = 5;                      // x comes into scope

    makes_copy(x);                  // x would move into the function,
                                    // but i32 is Copy, so it’s okay to still
                                    // use x afterward

} // Here, x goes out of scope, then s. But because s's value was moved, nothing
  // special happens.
```

The only difference I see is in the type of the variable being passed to each. `s` is a String type and the ownership is transferred to the function. But `x` is an `i32` and gets copied instead of moved. Still working through understanding this.

Update: my colleague Jk explained to me:

> Essentially, if a struct implements the `Copy` trait it will be copied. If not it will be moved.

And recommended this [StackOverflow answer](https://stackoverflow.com/questions/29490670/how-does-rust-provide-move-semantics/29490907#29490907) as a resource to dig deeper.

### dropping dimes or dropping values?

Okay. The analogy isn't one-to-one. "dropping dimes" means "to make an assist in basketball" (source: [Urban Dictionary #3](https://www.urbandictionary.com/define.php?term=Dropping%20Dimes)) But they're close, right?

Dropping values is something Rust will do for you (assist?).

Sometimes, you don't want that value to be dropped though. Here's an example of a reference:
```rust
let s1 = String::from("balling");

let len = calculate_length(&s1);
```

Since we passed a reference (the `&` is the key)to `calculate_length`, and the function does not own it (it just refers to the value), `s1` won't be dropped when that reference goes out of scope in `calculate_length`. Neat, huh?


### but can I mutate that reference?

References are not mutable. But they can be with a special keyword: `mut`. This lets you mutate them.
```rust
let mut s = String::from("a regular string");
let other_s = &mut s;
```

I won't dig into the rules around mutable references here, but know that there are some gotchas!

### Rust prevents data races

I knew about data races before, but the book gives a clear definition.

> A *data race* is similar to a race condition and happens when these three behaviors occur:
> - Two or more pointers access the same data at the same time.
> - At least one of the pointers is being used to write to the data.
> - There's no mechanism being used to synchronize access to the data.

These can cause unwanted behavior and be hard to track down. Rust prevents this from even happening by checking at compile-time and yelling at you! Yay prevention!

### borrow as mutable or immutable, but not both

You can borrow a variable as mutable or immutable, but not both in the same scope. If you do this, Rust will complain.

### dangling references

I wasn't familiar with this before, but in other languages, you can have dangling references. These are values that you're pointing to where someone else freed the memory. Rust prevents this from happening with errors from the compiler.

### three rules of references

There are three and only three rules to reference:

> 1. At any given time, you can only have *either* but not both of the following: one mutable references *or* any number of immutable references.
> 2. References must always be valid.

Oh, and rule #3—don't break rule #1 or rule #2.

### slice type - is it a pizza slice?

No, sadly, it does not refer to a slice of pizza (I wish it did).

This is a data type in Rust that does not have ownership. It lets you reference a "contiguous sequence of elements in a collection rather than the whole collection." Kinda like if you wanted a slice of pizza, but not the whole thing, right?

Let's say you had a pizza with eight slices, but you only wanted two of them. You could grab the first two like this:
```rust
let pizza = ["slice", "slice", "slice", "slice", "slice", "slice", "slice", "slice"];

let my_slices = &pizza[0..2]; // ["slice", "slice"]
```

Read more about the [slice type](https://doc.rust-lang.org/std/slice/index.html) in the docs.

### string literals are string slices

I didn't dig further, but on page 81 in the code example they say "string literals *are* string slices."

That means this:
```rust
let my_string_literal = "hello world";
```

is a string slice.

I'm still working through this. It doesn't fully make sense. This comes from the [String Slices as Parameters](https://doc.rust-lang.org/book/ch04-03-slices.html#string-slices-as-parameters) section of the book.

### how Rust ensures memory safety

You hear this as a benefit of Rust when people advocate for it. There are three main concepts, all of which we covered. Here they are in my own words:
- ownership -> values can only have one owner
- borrowing -> restrictions to borrowing makes it safe
- slices -> you can safely use pieces of data

Rust automatically cleans up the data for you by calling `drop` when values go out of scope. Less work for you. Hooray!

## What's next?

I hope to continue going through The Rust Language Book and move on to Chapter 5. I find that working through each chapter and reflecting afterwards helps solidify what I'm learning.

Following the pattern of the last post, I included a glossary and cheatsheet at the end here. I hope it helps!

**If these notes helped with your own learning of Rust, could you let me know by [sharing on Twitter](https://twitter.com/intent/tweet?url=https%3A%2F%2Fjoeprevite.com%2Frust-lang-ecosystem%2F&via=jsjoeio) or [sending me a DM](https://twitter.com/messages/compose?recipient_id=1567529924&text=Hey%21%20Your%20Rust%20Lang%20Chapter%204%20notes%20helped%20a%20lot.)?**

## Glossary

I find it helpful to define new terms when I learn them. Here they are in my own words:
- **ampersand** - the name of this character `&`
- **borrowing** - using data without taking ownership
- **byte** - "a unit of digital information that most commonly consists of eight bits" (Wikipedia )
- **char** - a piece of a string
- **dangling reference** - a value still in use but that has been freed from memory
- **data race** - trying to manipulate the same piece of data from two pointers
- **double-free error** - an error which occurs when two pointers free the same value from memory
- **garbage collector** - a tool or algorithm that checks what memory is being used and what isn't and frees it accordingly (memory manager)
- **heap** - "unlimited in size and globally accessible" (Rust Lang Book)
- **owner** - the thing in charge of a value
- **reference** - something you have access to without owning it
- **slice type** - referencing a piece of data, not the whole thing
- **stack** - very fast, the default for Rust, but local to the function call and limited in size

## Cheatsheet
A few of the commands covered in Chapter 4:

### Creating a string literal

```rust
// this is a string literal
let hello_world = "Hello world";
```

### cloning a string

This can be expensive.

```rust
let s1 = String::from("hello");
let s2 = s1.clone();
```

### slicing a string

```rust
let s = String::from("hello world");
let hello = &s[0..5];
let world = &s[6..11];
```

## Thank you

A special thank you to Jk Jensen for review, and providing explanations/examples on some of these topics.

