---
slug: 'book-review-writing-an-interpreter-in-go'
date: '2020-05-22'
title: 'Book Review: Writing an Interpreter in Go'
description: 'My notes and thoughts on Writing an Interpreter in Go by Thorsten Ball'
tagline: 'My notes and thoughts'
published: true
---

Go forth, and write thee blog post!

TODOS

- [ ] Find cover image for book
- [ ] Add support for Go syntax highlighting
- [ ] Add excalidraw embed support

---

When I started my new job, I was told that I would be the "Programming Languages" person. I knew I wanted to learn more not only about specific programming languages like Rust and Reason, but understand them on a higher level.

I believe it was [@sugarpirate](https://twitter.com/sugarpirate_) who originally recommended both this book and "[Writing a Compiler in Go](https://compilerbook.com/)" by Thorsten Ball. I was hesitatant to purchase the book because I had never written Go before and wasn't planning to. However, others insisted that you didn't need to know Go to read this book. I took their word. And now I can say, they were right.

##### Table of Contents

## Notes

This is a collection of my thoughts from each chapter in the book, along with my overall thoughts and recommendations.

### Introduction

In the beginning of the book, Thorsten explains why he wrote this book and who it's for. One thing that stuck out to me was this,

> So I wrote this book, for you and me. This is the book I wish I had. This is a book for people who love to look under the hood. For people that love to learn by understanding how something really works.
>
> -Ball 7

The part that resonated with me was the last sentence in hat quote -- "people that love to learn by understanding how something really works." That made me glad I picked this book up.

> "Tree-walking interpreter"

I highlighted this because I know I'll forgot what it means if I don't write it down. Summarized, it means an interpreter that parses the source code, builds an abstract syntax tree (AST) and then evaluates it. The "tree" comes from AST. The "walking" comes from walking down the tree.

Lexer vs. parser?

I felt confused in the beginning what the difference once. In my own words, the lexer takes input like charactesr "1;" and goes, "Ah! Yes. That input is equal to these tokens {token.INTEGER, '1', token.SEMICOLON, ';'}" The parser says, "Ah! Thank you lexer for the tokens, I will turn those into an AST."

> Every interpreter is built to interpret a specific programming language. That's how you "implement" a programming language. Without a compiler or an interpreter, a programming language is nothing more than an idea or a specification.
>
> -Ball 8

This was an aha moment for me. The compiler and the interpreter are key. I had no idea. I had been writing JavaScript for so long and never really looked under the hood to understand how the interpreter worked. I'm also learning Rust, which is my first compiled language, so hearing this helped my understanding there as well.

#### hashes vs hashmaps vs dictionaries vs objects

There is probably more to it than I know, but I find that this data structure has a different name depending on which language in which you're writing it:

```javascript
let previte = {"name": "Joe", "age": 26};
```

In the book (which uses Go), the author refers to it as a hash. In JavaScript, I would call this an object. In Python, one might call it a dictionary. Why can't we all decide on one name and use it across all languages? If someone knows the answer to this, please fill me in!

#### first class functions

I wrote a note to myself, "definte this in your own words." It's when a programming language supports functions out of the box? No, it has to be more than that (don't most programming languages support first class functions?).

Pulling from MDN [they say](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function),

> A programming language is said to have **First-class functions** when functions in that language are treated like any other variable.

Well, there you go! They're treated like any other variable. They elaborate and give three examples:

1. function can be used as argument to another function
2. function can be returned by another function
3. function can be assigned as a value to a variable

And now, our definition is complete. 

#### Thorsten was right

Thorsten made a bet with us. He said,

> I'd bet that you can follow this book along even if you've never written a single line of Go in your life.
>
> -Ball 10

I tripped myself up in the beginning when initializing a Go project locally, but quickly solved that thanks to his help and friends on Twitter. So he was right! I don't think the language was an obstacle in anyway. 

> And if you, after reading this book, choose to write your own interpreter in another language this should come in handy. 

I wrote a note to remember this! I don't know if I'll do this, but it could be helpful for learning Reason or Rust more deeply. I'll leave this here as a reminder. 

### Chapter 1 - Lexing

The first part of the interpreter: lexical analysis. 

#### lexical analysis, lexing, and lexer 

Lots of words that sound and look similar, but what do they all mean? "Lexical analysis" is taking the source code and transforming it into tokens. This process is also called "lexing." The "lexer" is the thing that does this. Thorsten mentions that it's also sometimes called tokenizer or scanner. 

https://excalidraw.com/#json=5086916491870208,sLUFfW5oMgrO3ApQwe4YQw

> ...we're going to lex in our first step
>
> -Ball 15

I wrote this down to highlight **lex** and remind myself how to use it in a sentence. An example, "The first thing our interpreter does is lex the source code to generate tokens. The tokens are then parsed into an abstract synax tree."

#### identifiers

These are the variable names. It makes sense too. They are identified by these variable names. They should also be identified by our interpreter and our program.

https://excalidraw.com/#json=5643057177296896,5i_HmKWn3lDRcBRDh9UMdw

#### token types

One of my favorite parts was learning about the limited token types. Thorsten had us create these token types as constants and each one coud be used for different characters in our programming language. Here are some examples:

```go
const (
	EOF = "EOF" // end of file
  // Identifiers + literals
  IDENT = "IDENT" // add, foobar, x, y
  INT = "INT" // 134
  
  // Delimiters 
  COMMA = ","
  SEMICOLON = ";"
)
```

After reading this, I thought, "I wonder if I can find the token types for other languages like Rust." And sure enough, you can! These are a few from the list of the [keywords](https://doc.rust-lang.org/reference/keywords.html) for instance.

```rust
KW_IN : in
KW_LET : let
KW_LOOP : loop
KW_MATCH : match
KW_MOD : mod
KW_MOVE : move
KW_MUT : mut
KW_PUB : pub
KW_REF : ref
```

So cool! 

#### underscores in identifiers

You know how in languages like Rust or Python, people use `snake_case` for their variables or functions? Well while writing the lexer, I learned that in order to allow this in the language, we need to treat the `_` character *as a letter*. This lets users of the language be able to use underscores in their variable names (specifically, identifiers). I wouldn't have realized you needed to do that on my own. I thought that was neat!

#### skipWhitespace 

page 25

### Chapter 2 - Parsing

### Chapter 3 - Evaluation

### Chapter 4 - Extending the Interpreter

### Chapter 5 - Macro System

In case you didn't know, Thorsten added a fifth chapter for free [online](https://interpreterbook.com/lost/).

### Overall Thoughts

### Recommend the Book?

## Purcahse the Book
