---
slug: 'book-review-writing-an-interpreter-in-go'
date: '2020-05-22'
title: 'Book Review: Writing an Interpreter in Go'
description: 'My notes and thoughts on Writing an Interpreter in Go by Thorsten Ball'
tagline: 'My notes and thoughts'
published: true
---

![Writing an interpreter in go paperback on wood](./book_cover.jpg)

When I started my new job, I was told that I would be the "Programming Languages" person. I knew I wanted to learn more not only about specific programming languages like Rust and Reason, but understand them on a higher level.

I believe it was [@sugarpirate](https://twitter.com/sugarpirate_) who originally recommended both this book and the sequel "[Writing a Compiler in Go](https://compilerbook.com/)" by Thorsten Ball. I was hesitatant to purchase the book because I had never written Go before and wasn't planning to. However, others insisted that you didn't need to know Go to read this book.

I took their word. And now I can say, they were right.

##### Table of Contents

## Notes

This is a collection of my notes from each chapter in the book, along with my overall thoughts and recommendations.

### Introduction

In the beginning of the book, Thorsten explains why he wrote this book and who it's for. One thing that stuck out to me was this,

> So I wrote this book, for you and me. This is the book I wish I had. This is a book for people who love to look under the hood. For people that love to learn by understanding how something really works.
>
> -Ball 7

The part that resonated with me was the last sentence in hat quote -- "people that love to learn by understanding how something really works." That made me glad I picked this book up.

> "Tree-walking interpreter"

I highlighted this because I know I'll forgot what it means if I don't write it down. Summarized, it means an interpreter that parses the source code, builds an abstract syntax tree (AST) and then evaluates it. The "tree" comes from AST. The "walking" comes from walking down the tree.

Lexer vs. parser?

I felt confused in the beginning what the difference once. In my own words, the lexer takes input like characters "1;" and goes, "Ah! Yes. That input is equal to these tokens {token.INTEGER, '1', token.SEMICOLON, ';'}" The parser says, "Ah! Thank you lexer for the tokens, I will turn those into an AST."

> Every interpreter is built to interpret a specific programming language. That's how you "implement" a programming language. Without a compiler or an interpreter, a programming language is nothing more than an idea or a specification.
>
> -Ball 8

This was an aha moment for me. The compiler and the interpreter are key. I had no idea. I had been writing JavaScript for so long and never really looked under the hood to understand how the interpreter worked. I'm also learning Rust, which is my first compiled language, so hearing this helped my understanding there as well.

#### hashes vs hashmaps vs dictionaries vs objects

There is probably more to it than I know, but I find that this data structure has a different name depending on which language in which you're writing it:

```javascript
let previte = { name: 'Joe', age: 26 }
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

You know how in languages like Rust or Python, people use `snake_case` for their variables or functions? Well while writing the lexer, I learned that in order to allow this in the language, we need to treat the `_` character _as a letter_. This lets users of the language be able to use underscores in their variable names (specifically, identifiers). I wouldn't have realized you needed to do that on my own. I thought that was neat!

#### skipWhitespace

In the language we write, whitespace serves only to separate tokens. For example, in this line `let name = "Joe";` the whitespace between `let` and `name` separate the two, but do nothing more. During lexical analysis, we want to skip the whitespace so we write a helper function called `skipWhitespace`. I highlighted this as a reminder, but also because Thorsten pointed out that this same helper function is sometimes called `eatWhitespace` or `consumeWhitespace` which I found funny.

#### keywords

These are reserved words like "function" and "let" in our language. Similar to how "mut" is reserved in Rust, but not JavaScript.

#### repl means something

I remember a few years ago hearing about [repl.it](https://repl.it/) and thinking to myself, "What a strange name!" It was only then in 1.5 of this book where Thorsten enlightened me. It stands for "read evaluate print loop."

> Python has a REPL, Ruby has one, JavaScript runtime has one, most Lisps have one and a lot of other languages too.
>
> -Ball 33

It reads your input, lets the interpreter evaluate it, prints the result or output and then repeats. Another aha moment from this book.

### Chapter 2 - Parsing

The parser is the "software component that takes input data (frequently text) and builds a data structure" (Ball 36).

> "Code is data, data is code" is something you hear a lot from Lisp programmers.
>
> -Ball 37

#### serialization languages

I don't think I had heard this term/concept mentioned before, but he was referring to JSON, YAML, TOML, INI, etc.

#### syntactic analysis

Again, I don't think I had heard this before.

> ...the process of parsing is also call syntactic analysis
>
> -Ball 39

#### parser generator

Another new term, Thorsten explains that parser generators are "tools that, when fed with a formal description of a language, produce parsers as their output" (Ball 39).

To be honest, this is still a bit foreign to me. Of course when I google it, the term "[compiler-compiler](https://en.wikipedia.org/wiki/Compiler-compiler)" comes up which doesn't help. I think I'll leave it at that for now, but may revisit.

> Parsing is one of he most well-understood branches of computer science...
>
> -Ball 40

#### top-down vs bottom-up vs recursive decent parsing

I bet I could write a blog post on this alone (I don't know all of the differences, and won't explore them here). The method we take in the book is recursive decent parsing which he mentions is a "top down operator precedence" parser and also called "Pratt parser" after Vaughan Pratt.

#### binding vs identifier vs expression

I wrote a note to myself "define binding identifier vs. expression." Let's give it a shot. Let statements like `let x = 5;` bind the expression "5" to the identifier "x". And as Thorsten reminds us, "Expressions produce values, statments don't" (Ball 42). To be clear, if we take this `let x = 5;` it is a statement because it does not produce a value. However, this `5` does produce a value. It's like a tupperware container with some food inside. The tupperware doesn't give us food, but if we go inside and look, we get food.

#### AST with Nodes

> The AST we are goign to construct consists solely of `Nodes` that are connected to each other - it's a tree after all.
>
> -Ball 43

I wrote that down as a reminder that our AST has a root Node, which has other nodes connected to it. Yay trees!

#### operator precedence

I remember algebra and learned about operator precedence. For example, let's say I have this `let x = 1 + 2 * 3`. In math, we would first do `2 * 3` because multiplication precedes addition so our answer evaluates to `7` and not `9`. To be explicit, we can throw in parens like this `let x = 1 + (2 * 3)`. When we parse an expression like the one here, we need to make sure the parser knows these rules like multiplication precedes addition. Hopefully that makes sense.

#### prefix vs infix operators

Take a look at this line: `-5 - 10`. Can you guess which `-` is a prefix and which is an infix?

Correct! The `-` in front of the `5` is a prefix operator because it's next to the integer and denotes negativity. The `-` in between the two integers is the infix operator and denoes subtraction.

#### binary operators

The `+`, `-`, `*` and `/` are all types of infix operators, or binary operators, meaning they operate with two operands.

#### Vaughan Pratt

Professor at Stanford born in 1944. You can read more about him on [Wikipedia](https://en.wikipedia.org/wiki/Vaughan_Pratt).

His parsing method is explained in his paper "Top Down Operator Precedence" which was published in 1973 (gasp!) and can be read [here](https://dl.acm.org/doi/10.1145/512927.512931).

As a reminder to myself, `prefixParseFns` is used in the book and is the same as "nuds" for "null denotations" by Pratt. `infixParseFns` is equivalent to "leds" or "left denotations" by Pratt.

#### terminology

Thorsten points out some useful terms on page 63:

- **prefix operator** - in front of operand
- **postfix operator** - after operand like `foobar++`
- **infix operator** - in between operands
- **binary expressions** - the operator has two operands like `5 * 8`
- **operator precedence** - also called "order of operations" (ring a bell?)

#### IntegerLiteral

I wrote a note to show an example of what an integer literal data structure looks like in our language:

```go
type IntegerLiteral struct {
  Token token.Token
  Value int64
}
```

As you can see, we store the token type and the actual value. For example, `5` would look like this:

```go
{
  Token: token.INT, // integer
  Value: "5"
}
```

Pretty cool, huh?

Sidenote: I love that he abbreviates literal to `lit` in our helper functions. I laugh because it reminds me of the colloquial saying, "that's so [lit](https://www.urbandictionary.com/define.php?term=lit)!"

#### prefixParseFns and infixParseFns

I found this part of the book a bit confusing. I'm struggling to even explain what I don't know...If I have the integer `5`, why do I call `prefixParseFns`? Is it because I need to check if `5` has a prefix such as a minus sign "-"? Ah...now that I'm writing this, I think that's it. Because as a human, I can look at `-5` and say, "Yes, that has a prefix we need to parse." But as a machine, I don' know that from looking at the token alone because these tokens `5` and `-5` are the same token type but have different values.

This is also the part of the parser where we look at precedence, which also confused me.

If I were to spend more time on this book, I would focus on section 2.7 - How Pratt Parsing Works because it's clear to me as I write this that I don't fully comprehend what is happening.

#### parseBoolean

Inside our `parser/parser.go` file, we add a helper function:

```go
func (p *Parser) parseBoolean() ast.Expression {
  return &ast.Boolean{
    Token: p.curToken,
    Value: p.curTokenIs(token.TRUE)
    }
}
```

I wrote a question mark next to the `token.TRUE` because I was confused on why this works even when parsing a `false` boolean. Again, this is probably do to my lack of understanding here and another area I would focus on again.

#### grouped expressions

Some how, we can group expressions like `(5 + 5) * 2` to influence the parsing to our liking. We add a function called `parseGroupedExpression` and it "just works." I couldn't tell you why though. Here's the function in case you can figure it out:

```go
func (p *Parser) parseGroupedExpression() ast.Expression {
  p.nextToken()
  exp := p.parseExpression(LOWEST) // this LOWEST thing I don't get

  if !p.expectPeek(token.RPAREN) {
    return nil
  }

  return exp
}
```

#### block statements

These are a series of statements which are surrounded by `{` and `}`.

#### infix parse functions

I wrote a note later where he says,

> Yes, we need to register an `infixParseFn` for `token.LPAREN`. This way we parse the expression that is the function (either an identifier, or a function literal), then check for an `infixParseFn` associated with `token.LPAREN` and call it with the already parsed expression as argument. And in this `infixParseFn` we can then parse the argument list.
>
> -Ball 122

I'm blocking myself here. In my mind, I think "infix === things like +, -, \*, /" so it feels strange here to use an LPAREN or "(" as an infix, but I guess infix can also mean in between two other characters. Example: `add(5, 5)` where the `(` is in between the "d" and the "5". Still, future me should revisit this.

#### serialization

Thorsten mentions this,

> What we want is an AST that (serialized as a string)...
>
> -Ball 89

And I thought, "Do I really know what this means?" And the answer is no, no I do not. Wikipedia [explains it](https://en.wikipedia.org/wiki/Serialization) well. I'll summarize it as taking something, translating it into a data structure or object and storing it for later use (possibly restructuring it).

### Chapter 3 - Evaluation

This is the part where the abstract syntax trees are turned into something meaningful.

#### interpreters vs compilers

> The notion of an interpreter as something that doesn't leave executable artifacts behind (in contract to a compiler, which does just that) gets fuzzy real fast when looking at the implementations of real-world and highly-optimized programming languages.
>
> -Ball 132

I found this super helpful (at least comparing it to say Rust). Interpreter has one-step. Compilers have two.

#### tree-walking interpreters

I wrote down this because I wanted to look up a few examples of programming languages that fall into this category. I don't know how trustworthy [these Reddit comments](https://www.reddit.com/r/ProgrammingLanguages/comments/dfi9lk/viability_of_treewalk_interpreters/) are but here are a few notes:

> Ruby was a tree-walk interpreter before version 1.9 (I think) and was used in production quite a bit, albeit with a reputation for being very slow and consuming a lot of RAM.

> R was also a tree-walking interpreter for around 20 years! It only changed in the last 5 or so years, a similar time as Ruby.

> It seems Perl still is a tree-walk interpreter.

A bit later, Thorsten does touch on a few. He mentions the Ruby example.

#### intermediate representation

I hadn't heard this term before. According to [Wikipedia](https://en.wikipedia.org/wiki/Intermediate_representation),

> intermediate representation is the [data structure](https://en.wikipedia.org/wiki/Data_structure) or code used internally by a [compiler](https://en.wikipedia.org/wiki/Compiler) or [virtual machine](https://en.wikipedia.org/wiki/Virtual_machine) to represent [source code](https://en.wikipedia.org/wiki/Source_code).

#### just in time

He also mentions on page 133 a JIT, or "just in time" interpreter/compiler. From what I can tell, [JavaScript](https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e) usually uses this technique.

One thing to note as well,

> An interpreter that compiles to byte code and uses a virtual machine to evaluate said bytecode is going to be a lot faster.
>
> -Ball 133

This is compared to a "tree-walking interpreter that recursively evaluates an AST."

He also mentions WebKit JavaScript engine JavaScriptCore and the interpreter "SquirrelFish" (weird name, right?). This one has "four different stages of JIT compilation."

Lua is another languages that adopted a JIT, but 12 years after the first release (Ball 134).

#### host language

It was interesting that for our evaluator, Thorsten said we only needed two things,

> a tree-walking evaluator and a way to represent Monkey values in our host language Go.
>
> -Ball 135

This stuck out to me because I realized Go, the language in which we were writing the language, is this said host language. It made me think of Reason, whose host language is OCaml. But I believe when you look at Rust, it's host language is Rust. And same with TypeScript whose host language is TypeScript. Weird, but cool!

> How you represent a string of your interpreted language depends on how a string can be represented in the langauge the interpreter is implemented in.
>
> -Ball 136

#### two instances of boolean

One neat thing we did was create an instance of `object.Boolean` which could be `true` or `false` so that we weren't allocating new `object.Boolean` everytime.

#### unary operator expression

This is described where "one operand follows the operator" (Ball 148). Computer Hope [defines it](https://www.computerhope.com/jargon/u/unary-operator.htm) as,

> an [operator](https://www.computerhope.com/jargon/o/operator.htm) that takes only one [value](https://www.computerhope.com/jargon/v/value.htm) for its operation.

In the book, the example we use first is the `!` which can be used to convert and operand to a boolean value and negate it.

#### eight infix operators

The language we make, Monkey, supports 8 operators:

- "+"
- "-"
- "\*"
- "/"
- ">"
- "<"
- "=="
- "!="

The last four produce a boolean result.

#### comparing values directly

> We can't compare these pointers to different instances, othewise `5 == 5` would be false, which is not what we want. In this case we want to explicitly compare the values and not the objects that wrap these values.
>
> -Ball 158

I highlighted that as a reminder.

#### return statements

> return statements stop the evaluation of a series of statements and leave behing the value their expression has evaluated to.
>
> -Ball 162

Good reminder!

#### bindings

Later in Chapter 3, we add support for let statements, but Thorsten describes it as "bindings" (Ball 173). This is a reminder that in this situation, we're referring to "let bindings" or binding an identifier (variable) to a value.

#### environment

> The environment is what we use to keep track of value by associating them with a name.
>
> -Ball 175

This was interesting! I thought it would be more complicated, but Thorsten explains that it's just a "hash map that associates string with objects." Another aha moment. It also helps understand scope and closures a bit more.

He even touches on it by saying,

> ...functions in Monkey carry their own environment with them. That allows for closures, which "close over" the environment they're defined in and can later access it.
>
> -Ball 181

When it's checking if a value exists for an identifier, it starts at the inner-most scope, or the environment where it's currently running. If it doesn't find it, it moves outside to the next environment. If not there, it goes up again. It does this until there are no more environments to check.

Wording to keep in mind:

> The outer scope _encloses_ the innter scope. And the inner scope _extends_ the outer one.
>
> -Ball 186

#### first-class citizens

I heard this often, but have never stopped to understand what it _actually_ means. Here's what [Wikipedia](https://en.wikipedia.org/wiki/First-class_citizen) says,

> a **first-class citizen** (also **type**, **object**, **entity**, or **value**) in a given [programming language](https://en.wikipedia.org/wiki/Programming_language) is an entity which supports all the operations generally available to other entities.

The context where this is mentioned in the book is for functions because they're first-class in the language we build.

### Chapter 4 - Extending the Interpreter

This chapter is where we add in a few more things.

#### built-in functions

These are part of the language and have access to the inner workings. For example, we add one called `len` which returns the length of a string.

#### validate hash keys in evaluation stage

Thorsten explains that we can't do this because it would prevent this:

```javascript
let key = 'name'
let hash = { key: 'Monkey' }
```

> In order to allow this, we need to allow any expression as a key and any expression as a value in a hash literal.
>
> -Ball 234

### Chapter 5 - Macro System

In case you didn't know, Thorsten added a fifth chapter for free [online](https://interpreterbook.com/lost/).

This was by far the most difficult chapter for me. I think it's because macros are relatively new to me. I learned JavaScript as my first language which does not have a macro system. Rust (the language I'm currently learning) does [have them](https://doc.rust-lang.org/book/ch19-06-macros.html).

In this chapter, the first one we implement is `quote`. As explained,

> it stops its argument from being evaluated. Instead it returns the AST node representing the argument.
>
> -Ball (5.3 - Quote)

This was hard for me to grasp. I couldn't think of a practical use case where I would want to do this. After I spend more time understanding macro systems and have a few under my belt, this will make more sense.

Some other highlights:

> Conceptually, “macro expansion” means evaluating all calls to macros in the source code and replacing them with the return value of this evaluation. Macros take source code as their input and return source code, so by calling them we “expand” the source code, because each call might result in more of it.
>
> -Ball (5.5 - Macro Expansion)

> Take a look at Elixir or any Lisp, for inspiration, to see how the syntax gives power to the macro systems and how that in turn makes the language itself more powerful and expressive
>
> -Ball (5.7 - Dream On… In Macros)

## Overall Thoughts

I really enjoyed the book! I feel like I unlocked a new understand. Now, I know how interpreters work. And thanks to that, I have a better understanding of what's happening under the hood! Following along with the author felt straightforward.

I now have a [fully-functioning interpreter](https://github.com/jsjoeio/monkey)! I never thought I would do something like this, and I probably wouldn't have attempted it on my own without this book.

## Recommend the Book?

If you're interested in deepening your understanding of programming languages, I recommend this book! It's practical. It's funny. He walks you through everything and breaks concepts down so they're easy to understand.

It's fantastic way to learn what it takes to write your own language. And at the end of it, you'll have new knowledge, and something you can show your friends.

## Purchase the Book

If you want to purchase the book, you can do so here at [interpreterbook.com](https://interpreterbook.com/). You can even buy this book plus his [compiler book](https://compilerbook.com/) in a [bundle](https://gumroad.com/l/waiig_wacig_bundle) and save! Highly recommend.
