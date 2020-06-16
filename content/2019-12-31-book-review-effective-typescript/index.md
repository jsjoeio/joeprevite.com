---
slug: 'book-review-effective-typescript'
date: '2019-12-31'
title: 'Book Review: Effective Typescript'
description: 'My notes and thoughts on &#34;effective typescript&#34; by dan vanderkam'
tagline: 'My notes and thoughts'
published: true
banner: ''
tags: ['TypeScript', 'Book']
---

[![cover of effective typescript](https://images-na.ssl-images-amazon.com/images/I/41jnU0V%2BcBL._SX379_BO1,204,203,200_.jpg)](https://amzn.to/2tcTQVJ)

> 62 Specific Ways to Improve Your TypeScript

I pre-ordered this book at the recommendation from my friend [@swyx](https://github.com/swyx). I read the book in December 2019.

##### Table of Contents

- [Notes](#notes)
  - [Chapter 1 - Getting to Know TypeScript](#chapter-1---getting-to-know-typescript)
  - [Chapter 2 - TypeScript's Type System](#chapter-2---typescripts-type-system)
  - [Chapter 3 - Type Inference](#chapter-3---type-inference)
  - [Chapter 4 - Type Design](#chapter-4---type-design)
  - [Chapter 5 - Working with any](#chapter-5---working-with-any)
  - [Chapter 6 - Type Declarations and @types](#chapter-6---type-declarations-and-types)
  - [Chapter 7 - Writing and Running Your Code](#chapter-7---writing-and-running-your-code)
  - [Chapter 8 - Migrating to TypeScript](#chapter-8---migrating-to-typescript)
  - [Overall Thoughts](#overall-thoughts)
  - [Recommend the Book?](#recommend-the-book)
- [Purchase the Book](#purchase-the-book)
- [Get in touch](#get-in-touch)

## Notes

This is a collection of my thoughts from each chapter in the book, along with my overall thoughts and recommendations.

### Chapter 1 - Getting to Know TypeScript

As you can guess by the title of this chapter, the author summarizes the basic concepts of TypeScript. This chapter was pretty boring because I previously read ["Programming TypeScript" by Boris Cherny](https://amzn.to/2tXQ3vB). Here are some things I highlighted:

> TypeScript's type system _models_ the runtime behavior of JavaScript. (Vanderkam 5)

Good reminder.

> So long as your TypeScript is valid JavaScript (and often even if it isn't), the TypeScript compiler will produce output. **it's better to say that your code has errors, or that it "doesn't type check."** (Vanderkam 11)

I liked the way this is phrased. Helpful to have the correct vocabulary to describe your code.

My personal notes:

> I want to "just write TS" without worrying about a `tsconfig`, ESlint or Prettier.

Yes, I know you can do that with [TypeScript Playground](https://www.typescriptlang.org/play/index.html), but I want some time of framework or library that comes with those three out of the box.

### Chapter 2 - TypeScript's Type System

This chapter dives into the "nuts and bolts of TypeScript's type system" so that you understand how things work. The beginning felt boring for the same reason I mentioned about Chapter 1 but then towards the middle/end of the chapter, I started learning new things. Highlights:

> ..."excess property checking" , which helps catch an important class of errors that the structural type system would otherwise miss. (Vanderkam 47)

I knew of this feature, but didn't know the technical name. The example he gives is with this snippet:

```typescript
// (Vanderkam 46)
interface Room {
  numDoors: number
  ceilingHeightFt: number
}

const r: Room = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: 'present',
}
```

When TypeScript complains by saying 'elephant' does not exist in type 'Room', this is excess property checking. It makes sense because 'elephant' is an excess, or extra, property on the object `r` but not present in the interface.

> Prefixing interface types with `I` is commin in C#, and this convention made some inroads in the early days of TypeScript. But it is considered bad style today because it's unnecessary, adds little value and is not consistently followed in the standard libraries. (Vanderkam 53)

I have done this in past projects but didn't realize it was considered bad practice. Now I know!

> You can express something _like_ a typle using an interface:

```typescript
// (Vanderkam 55)
interface Tuple {
  0: number
  1: number
  length: 2
}

const t: Tuple = [10, 20]
```

I did not know this was possible! While it's feasible, it is not recommended because it "drops all the tuple methods like `concat`."

> TypeScript uses [declaration] merging to get different types for the different versions of JavaScript's standard library. (Vanderkam 55)

I knew about "declaration merging" but I couldn't think of a good use case. Here, Vanderkam explains how it's useful for the different standards of JS because as methods get added to proper interfaces like `Array`, TypeScript can merge the interface declarations into 1, which ensures the interface has both older and newer methods.

> Are you publishing type declarations for your API? Then it might be helpful for your users to be able to merge in new fields via an `interface` when the API changes. So use `interface`. But for a type that's used internally in your project, declaration merging is likely to be a mistake. So prefer `type`. (Vanderkam 56)

I think this is the most clear explanation of the `interface` vs. `type` debate.

> Mapped types are the type system equivalent of looping over the fields in an array.

Here's an example with a built-in type called `Pick`:

```typescript
type Pick<T, K> = { [k in K]: T[k] }

// example
type TopNavState = Pick<State, 'userId' | 'pageTitle' | 'recentFiles'>
```

Another slick example:

```typescript
// (Vanderkam 60)
interface SaveAction {
  type: 'save'
  // ...
}

interface LoadAction {
  type: 'load'
  // ...
}

type Action = SaveAction | LoadAction

// Repeated types
// ❌ type ActionType = 'save' | 'load';

// Better! DRY!
// ✅ you index into the Action union
// Boris Cherny calls this "keyin" operator
type ActionType = Action['type']
```

A good example of a `Record` type:

```typescript
// (Vanderkam 67)
type Vec3D = Record<'x' | 'y' | 'z', number>

// Results in this
/*
type Vec3D = {
  x: number;
  y: number;
  z: number;
}
*/
```

> If your function does not mutate its parameters, you should declare them `readonly`. (Vanderkam 73)

I don't think I ever thought about doing this but seems really smart and easy!

### Chapter 3 - Type Inference

A few things that I highlighted in this chapter:

> An experienced TypeScript developer will use relatively few annotations (but use them to great effect), while a beginner may drown their code in redundant type annotations. (Vanderkam 81)

A friendly reminder to myself.

> Consider using explicit annotations for object literals and function return types even when they can be inferred. This will help prevent implementation errors from surfacing in user code. (Vanderkam 87)

This explains the ESLint rule "explicit-return-types" that I didn't understand previously. With this quote, now i get it.

### Chapter 4 - Type Design

Highlights:

Actually a quote from someone else named Jon Postel, called Postel's Law:

> TCP implementation should follow a general principle of robustness: be conservative in what you do, be liberal in what you accept from others. (Vanderkam 122)

Vanderkam goes on to elaborate using function contracts. Be broad in terms of input you accept, but be specific in what they produce.

A quote from Vanderkam's professor:

> when your code and your comments disagree, they're both wrong (Vanderkam 125)

Brands vs Tags?

You can create a discriminated union type by adding a "tag" so TypeScript knows to differentiate the two, but I don't quite understand how that is different from "branding" your types. Seems like the same idea. Here are some examples:

```typescript
// Here the tag is "kind"
interface Circle {
  color: string
  kind: 'circle'
}

interface Square {
  color: string
  kind: 'square'
}

type Shape = Circle | Square

// (Vanderkam 152)
// Here there is a "_brand" property
type Meters = number & { _brand: 'meters' }
type Seconds = number & { _brand: 'seconds' }
```

To me, they look the same. I'll have to investigate further.

### Chapter 5 - Working with any

I didn't highlight anything in this chapter.

### Chapter 6 - Type Declarations and @types

I didn't highlight anything in this chapter.

### Chapter 7 - Writing and Running Your Code

I didn't highlight anything in this chapter.

### Chapter 8 - Migrating to TypeScript

I didn't highlight anything in this chapter.

### Overall Thoughts

🙁

I may have had too high of expectations for the book In the Preface, the author says,

> My goal with this book is not to teach you TypeScript or JavaScript but to hel pyou advance from a beginning or intermediate user to an expert.

When I started reading this book, I had already been studying TypeScript heavily for the last 3 months. If I had read this book at the beginning of those 3 months, my opinion would probably be different. I do consider myself an intermediate user of TypeScript, but I don't think this book has helped me reach a level of "expert." Although the author and I may have differing opinions on levels of expertise.

Overall, this book does a great job at focusing on specific topics based on the way it's organized. It provides a lot of useful tips along with examples. It does cover more advanced topics and does a great job explaining the _why_ behind opinions or the way things work.

### Recommend the Book?

It depends.

What is your level of TypeScript knowledge? If you've read "Programming TypeScript" and been working with TypeScript for a while, then **no** I would not recommend it. If you are a beginner to TypeScript and want to learn practical knowledge to help you reach the next level, then **yes** I would recommend it.

## Purchase the Book

If you're interested in buying the book, you can buy it off [Amazon](https://amzn.to/2tcTQVJ).

## Get in touch

If you have follow up questions, you can [open an issue](https://github.com/jsjoeio/effective-typescript-notes/issues) or [@ me on Twitter](https://twitter.com/intent/tweet?text=@jsjoeio%20I%20want%20to%20talk%20to%20you%20about%20%22Effective%20TypeScript%22)
