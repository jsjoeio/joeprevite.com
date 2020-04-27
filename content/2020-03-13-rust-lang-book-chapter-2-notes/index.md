---
slug: "rust-lang-book-chapter-2-notes"
date: "2020-03-13"
title: "Rust Lang Book - Chapter 2 Notes"
description: "My notes from Chapter 2 of the Rust Lang Book."
tagline: "Building a guessing game"
published: true
---
This is the second blog post in my Rust Ultralearning series. In my [first post](https://joeprevite.com/rust-learning-plan-chapter-1-notes/), I talked about why I am learning Rust and my study plan. Here, I cover my notes on [Chapter 2](https://doc.rust-lang.org/book/ch02-00-guessing-game-tutorial.html) of the [Rust Lang Book](https://doc.rust-lang.org/book/).

### Notes on Chapter 2

The Rust Lang Book includes two types of chapters: concept and project. The concept chapters cover the aspects of the language while the project chapters walk you through building a program. Chapter 2 is the first of the three project chapters in the book (out of 20 total chapters).

In this chapter, we program a guessing game. You can find my version of the completed project [here](https://github.com/jsjoeio/guessing_game). These are the notes I took while reading this chapter: 

### std is the standard library

Although JavaScript has [standard built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) like `Math`, there is no “standard library”. It has been [proposed](https://github.com/tc39/proposal-javascript-standard-library) though. Learning that Rust does, I had to ask myself, “What does this mean?” Well, let’s look at the Rust docs for `std` and see what they say:

> The [Rust Standard Library](https://doc.rust-lang.org/std/) is the foundation of portable Rust software, a set of minimal and battle-tested shared abstractions for the[ broader Rust ecosystem](https://crates.io).

Cool! It sounds like high-quality code for all to use. The other thing to note is “[`std` is available to all Rust crates by default](https://doc.rust-lang.org/std/).” You don’t need to install anything. Add your import statement and it’s available. We can think of Rust as a batteries-included language. Here is an example:

```rust
// Rust 
// module with things for doing input and output
use std::io;
```

This imports the [`io` module](https://doc.rust-lang.org/std/io/) which is useful when working with input and output. 

For those familiar with JavaScript, see this example. In NodeJS, you can import modules from `child_process` without modifying your `package.json.` Example: 
```javascript
// JavaScript - Node 
// spawn a shell for executing commands that is 
import { execSync } from "child_process";
```

It’s not 1-to-1, but this may help the concept of “standard library” sink in.

### :: means it’s an associated function

During the tutorial, we use the standard `String` type and call the `new` method using the `::`. Here is a snippet from our program:

```rust
let mut guess = String::new();
```

I wrote this down to remember it because it was syntax that I hadn’t seen before. I’m used to the dot notation used in JavaScript. I did notice you can access certain methods in Rust using this same dot notation like this:

```rust
guess.trim().parse()
```

What I’m confused about is when to use `::` and when to use `.`? I couldn’t figure it out from the “[Operators and Symbols](https://doc.rust-lang.org/book/appendix-02-operators.html)” appendix of the Rust Lang Book. A coworker suggested I read the [“Disambiguating Function Calls”](https://doc.rust-lang.org/reference/expressions/call-expr.html#disambiguating-function-calls) section of the reference docs. Once I have a better answer, I’ll come back and update this section. 


### The Rust Prelude

Following the topic of the standard library, what gets imported automatically and what doesn’t? That’s where the **prelude** comes in. 

>  [The prelude](https://doc.rust-lang.org/book/ch02-00-guessing-game-tutorial.html#processing-a-guess) is the list of things that Rust automatically imports into every Rust program. 

Cool! I thought this was something to be aware of.


### immutable by default

Variables are immutable by default. This means there is less room for unintentional side effects - hooray! Here’s an example:

```rust
// Rust 
let guess = String::new();
```

If we wanted to make `guess` mutable, we have to add the `mut` keyword after the `let` keyword like so:

```rust
// Rust 
let mut guess = String::new();
```

### comments like in JavaScript

The syntax for writing comments in Rust is the same as in JavaScript.

```rust
// This is a comment in Rust

/* Or
A multiline comment in Rust
*/

// But 
// most pepople
// do it this way. (So I've been told)
```

```javascript

// And this is a comment in JavaScript

/* Same 
As JavaScript that is!
*/
```


### & indicates a reference

In this code snippet:

```rust
io::stdin()
    .read_line(&mut guess)
    .expect("Failed to read line");
```

This is the part of the program where the user is asked to guess a number (via the command line) and we ask them to enter it. We use a reference so that we don’t unnecessarily write the data to memory more than once. And we make it mutable because references are immutable by default. 

> The & indicates that this argument is a _reference_, which gives you a way to let multiple parts of your code access one piece of data without needing to copy that data into memory multiple times

Great! This reminds me of working with objects and arrays in JavaScript. They are mutable by default. You have to be extra careful when working with them because they are references. Most of the time, I copy the piece of data I’m working with so I don’t mutate the original. Here, Rust provides a way to reference data so that we **don’t need to copy** the data. There is a [section in Chapter 4](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html) on this topic so we can dive deeper then. 


### What is Result? 

In this program, we work with `Result.` Referring to our previous example, the method `.read_line()` returns a `Result.` Well, what is it?

It is an enum (short for _enumeration_). An enum is a type that has multiple variants. In the case of `Result`, we can either receive `Ok` or `Error`. To be extra clear, let’s look at the example as a whole and walk through it:

```rust
io::stdin()
    .read_line(&mut guess)
    .expect("Failed to read line");
```

We read the input from the user. That function call `.read_line()` returns a result. If the result is `Error` then we print the string we pass to `.expect()`. If the result is `Ok`, it will give us the input from the user and pass that into our string `guess`. 


### {} are placeholders

I didn’t quite understand this when I saw this line of code:

```rust
println!("You guessed: {}", guess);
```

We’re using the `println!` macro, which takes >= 0 arguments. The first is the string to print, and the second one is the value we want to use. What do the `{}` mean? I liked the way the book described it: 

> The set of curly brackets, {}, is a placeholder: think of {} as little crab pincers that hold a value in place.

This is identical to using [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) in JavaScript.

```javascript
const theWay = “the way”;

console.log(`This is ${theWay}`);
```

### binary vs library crate 

In this chapter, the author makes a distinction between binary and library crates. Our guessing game program is a binary crate. I didn’t quite understand the difference between the two. I found this explanation [on Reddit by WellMakeItSomehow](https://www.reddit.com/r/rust/comments/cj8f14/understanding_rust_binaries_libraries/) helpful: 

> Binaries are things you can run. Libraries are used as dependencies by other projects -- either binaries or libraries themselves.

### Add your dependencies to cargo.toml

Similar to a `package.json`, you add your dependencies to your project configuration file, which is the `cargo.toml` in Rust projects. The only difference is that it’s a manual process in Rust. 

In JavaScript land, we add dependencies with `npm` or `yarn` using `npm install <dependency>` or `yarn add <dependency>`. Then, the package manager installs the dependency in your `node_modules` and adds the dependency to your `package.json`. 
 
This isn’t the case with Rust. You have to go in and manually edit the `cargo.toml` to add a dependency. This surprised me. I investigated and it appears [I’m not the only one](https://github.com/rust-lang/cargo/issues/4). Luckily, this is an active [work in progress](https://github.com/rust-lang/cargo/issues/5586).


### Cargo.lock is like package-lock.json

For me, I always remember it as “that one file you want to commit, but is a pain in the butt if there are merge conflicts.” The [formal definition from npm](https://docs.npmjs.com/configuring-npm/package-lock-json.html) is:
 
> [package-lock.json] describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.

In the Rust Lang Book, they describe the purpose of `Cargo.lock` with the following,
 
> When you build your project in the future, Cargo will see that the _Cargo.lock_ file exists and use the versions specified there rather than doing all the work of figuring out versions again. This lets you have a reproducible build automatically.

Both serve the same purpose: 
* Document the exact versions of dependencies you’re using
* Allow you to reproduce the build


### cargo update to update your crates

You can update all your crates with `cargo update` which will look for newer versions. They follow [Semantic Versioning](https://semver.org/) (SemVer). From the semver crate, [they say],(https://steveklabnik.github.io/semver/semver/index.html) 
 
> Rust itself follows the SemVer specification, as does its standard libraries. The two are not tied together.

[Cargo](http://crates.io), Rust's package manager, uses SemVer to determine which versions of packages you need installed.


### You won't know which traits to use

This is a friendly reminder that you won’t know which traits to use. What even is a trait? They don’t dive into traits in this chapter but they will later in the book. All we need to know is this:

> You won’t just know which traits to use and which methods and functions to call from a crate. Instructions for using a crate are in each crate’s documentation.

Something to keep in the back of our mind for now. We’ll dive more into traits in [Chapter 10](https://doc.rust-lang.org/book/ch10-00-generics.html).


### cargo can generate offline docs for your crates!

I learned that you can run the command `cargo doc --open` from the root of your project and something magical happens. Not only will it build documentation for your project, but it will include docs for all your dependencies. And, it’s all local! Congratulations, you now have offline docs!


### Ordering is another enum

`Ordering` has three variants: `Less`, `Greater` and `Equal`. We use this in our program to compare the user input guess to the actual number. This lets us provide them with hints. Here’s the code:

```rust
match guess.cmp(&secret_number) {
    Ordering::Less => println!("Too small!"),
    Ordering::Greater => println!("Too big!"),
    Ordering::Equal => {
        println!("You win!");
        break;
    }
}
```

Note: it wasn’t obvious to me, but `cmp` is short for “compare.”


### What are match expressions?

It’s an expression that executes different blocks of code depending on the pattern. The keyword used is `match`, which “matches” the pattern. Reminds me of `switch` statements in JavaScript. In JS, a switch statement looks like this:

```javascript
// Example borrowed from MDN: 
// t.ly/GxzmB

const expr = 'Papayas';

switch (expr) {
  case 'Oranges':
	console.log('Oranges are $0.59 a pound.');
	break;
  case 'Mangoes':
  case 'Papayas':
	console.log('Mangoes and papayas are $2.79 a pound.');
	// expected output: "Mangoes and papayas are $2.79 a pound."
	break;
  default:
	console.log('Sorry, we are out of ' + expr + '.');

}
```

And here is the equivalent in Rust:

```rust

let expr = "Papayas";

match expr {
    "Oranges" => {
        println!("Ornages are $0.59 a pound.");
    },
    "Mangoes" | "Papayas" => {
        println!("Mangoes and papayas are $2.79 a pound.");
    },
    _ => {
        println!("Sorry, we are out of {}", expr)
    }
}
```

Another term to be aware of is “arms.” When we talk about `match` expressions in Rust, we say that they are made up of “arms” i.e. the different branches like “Oranges” or “Mangoes Papayas” in the example. This would be equivalent to the different cases in the `switch` statement.

Although they say JavaScript doesn’t have true pattern matching, Rust does. I don’t yet understand the power behind `match` expressions, but I’m sure we’ll explore this further down the road. 


### You can shadow variables 

I don’t feel great about shadowing variables. Here’s an example from the guessing game program:

```rust
let mut guess = String::new();

io::stdin()
    .read_line(&mut guess)
    .expect("Failed to read line");

// Convert user input to number before we try to match
let guess: u32 = match guess.trim().parse() {
    Ok(num) => num,
    Err(_) => continue,
};
```

Notice how we declare `guess` twice. This is allowed because we can shadow variables in Rust. I don’t like that because it’s confusing, but there are valid use cases. According to the book, they say,

> This feature is often used in situations in which you want to convert a value from one type to another type. Shadowing lets us reuse the guess variable name rather than forcing us to create two unique variables, such as guess_str and guess for example.
 
I have run into situations like this in JavaScript. A function receives data and then sorts it. This leads to two declarations: `data` and `sortedData`. I understand the second reason. Either way, good to know this language feature is available to us.


### “enter” from the command line adds a line break

In our program, we ask a user to guess the number. They submit their input by pressing the “enter” key from the command line. The tutorial instructs us to call the `.trim()` method on our `guess.` I didn’t understand why at first.  Later, I learned it is because it would otherwise include a line break from the “enter” key. A good thing to remember.


### Annotating types

The experience annotating types in Rust feels similar to that of TypeScript. You write the annotation by placing a “:” and then the type after the name of the variable. Although, this is usually not required. The Rust compiler does a great job at inferring types. Here is an example:

```rust
let guess: u32
```


### signed vs unsigned integers

To be honest, I had some real confusion around this. In JavaScript, I’m used to working with numbers and that’s it. I know the difference between floats and integers, but signed vs unsigned? That’s new to me. I [dug a bit deeper](https://stackoverflow.com/questions/247873/signed-versus-unsigned-integers) though. It boils down to whether or not we need signs i.e. plus/minus. If we need a sign, then we can use a signed integer. Otherwise, we can use an unsigned integer because the sign (plus/minus sign) is unimportant. 


### loop keyword creates an infinite loop

I found this interesting. When you create a loop using the `loop` keyword, it’s infinite! I remember the first loop I learned in JavaScript was a `for` loop. You had to worry about the initializer, a condition, and an incrementer/decrementer. With Rust, you have your loop and then throw in a `break` when you want it to stop. It feels like less mental-overhead. 


### use a match expression for better error handling

In the first iteration of the guessing game program, we assume the happy case: the user enters a valid number. If they don't, we crash the program with our `.expect()` and say, “Failed to read line.” That’s not great UX. 

We then refactor our `guess` to handle both scenarios using a `match` statement. Here’s the snippet:

```rust
io::stdin().read_line(&mut guess)
	.expect("Failed to read line");

let guess: u32 = match guess.trim().parse() {
        Ok(num) => num,
        Err(_) => continue,
    };

``` 

The benefit of the `match` statement is this. It allows us to continue the loop if there is an error with the user input. This allows the program to continue running and prompt the user for new input. Brillant! To quote advice from the book, they say,

> Switching from an `expect` call to a `match` expression is how you generally move from crashing on an error to handling the error.

Something to keep in mind for future Rust programs and graceful error handling.


### What’s next?

After Chapter 2, I am onto [Chapter 3](https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html) of the Rust Lang Book. It will cover common programming concepts in the language.

The next blog post in this series will continue along the same path and cover my notes. Until next time, happy coding my fellow [Rustaceans](https://doc.rust-lang.org/book/ch01-01-installation.html?highlight=rustacean#troubleshooting)! 🦀

Similar to the last post, I included a glossary and cheatsheet at the end here. I hope it helps!


### Glossary

I find it helpful to define new terms when I learn them. Here they are in my own words:

*   **arms ** - branches or paths of a `match` expression
*   **associated function** - usually associated with the type, but doesn’t operate on an existing instance of that type (i.e. `String::new` - we don’t have a string yet, but `new` is the function associated with the `String` type)
*   **binary crate ** - a crate you can run
*   **enum **- short for enumeration, it is a type with different variations  
*   **immutable **- cannot be modified 
*   **match **- an expression that executes different blocks of code depending on the pattern
*   **mutable** - can be modified
*   **Rust Prelude **- a base set of utility functions, traits, helpers included out-of-the-box	
*   **shadow **- using the same name of a variable that’s already been declared in the same scope
*   **static method **- same as an associated function
*   **standard library **- some basic utilities which are available in Rust programs out-of-the-box
*   **reference **- data that exists elsewhere which we want to use. More on [“References and Borrowing”](https://doc.rust-lang.org/stable/book/ch04-02-references-and-borrowing.html) in the future
*   **toml **- file extension(`Cargo.toml`), stands for “Tom’s Obvious, Minimal Language”
*   **type system **- rules around shapes of data and what they can do
*   **type inference** - information related to the type is inferred based on contextual information
*   **type annotation **- specific information declaring the type for a piece of data
*   **unsigned vs signed **- whether or not a plus/minus sign is important for an integer


## Cheatsheet 

Most of the commands that were covered in Chapter 2:

### Write a comment in Rust 


```
// Here is a comment
```


### Write a multiline comment in Rust

```rust
/*
You can do it this way
*/

// But
// this is more
// common
```

### Update your crates with 

```shell
cargo update
```

### Generate documentation and open locally

```rust
cargo doc --open
```

## Thank you!

A special thank you to [Cami Williams](https://twitter.com/cwillycs), Pedro Ritter and Jeremy Fitzhardinge for review, providing explanations/examples on some of these topics and suggesting readings for further learning. 