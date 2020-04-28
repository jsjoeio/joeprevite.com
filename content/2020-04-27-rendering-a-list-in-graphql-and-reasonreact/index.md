---
slug: "render-data-graphql-api-reasonreact"
date: "2020-04-27"
title: "How to Render Data from a GraphQL API in ReasonReact"
description: "A short post explaining how to render data from a GraphQL API in ReasonReact."
tagline: "Fighting nullable types in your data"
published: true
---
Recently, I decided to start learning [ReasonReact](https://reasonml.github.io/reason-react/). I chose it because my friend [Sean Grove](https://twitter.com/sgrove) recommended it, but also because I've been looking for an excuse to use Reason on a project.

I like that ReasonReact is 
- similar to React
- type-safe (like TypeScript, but out-of-the-box)

There are more benefits that I'm surely not yet aware of, but that's not what this post is about.

This post is me attempting to understand something I took for granted working with React: 

> Query a GraphQL API for some data and render that list of data 

Seems pretty easy, right? I thought so too! But without properly understanding primitives in Reason, like [option](https://reasonml.org/docs/manual/latest/null-undefined-option), it proved to be a bit more difficult.

This post walks through the example I was dealing with, how I figured out the solution thanks to the community and what I learned.

## Context

I felt like writing a plain old ReasonReact app was boring and easy. I wanted to start a little bit higher and see what it was like to add a GraphQL client to the mix, like Apollo.

I thought to myself,

> Why don't I follow Apollo's ApolloClient React tutorial, but do it with ReasonReact?

So that's what I did. I followed [their tutorial](https://www.apollographql.com/docs/react/get-started/) thinking it would be a good way to get things set up.

### What went well

Things started off well. 

I found [`reason-apollo-hooks`](https://github.com/Astrocoders/reason-apollo-hooks), which were the bindings for `@apollo/react-hooks` (thank you [@Astrocoders](https://github.com/Astrocoders)!). 

Following their `README`, I set everything up and it looked good! 

I was even able to log my data to the console with `Js.log2("my data", data)` and it worked! 

If only rendering data was as easy as logging in...

### What I struggled with

When it came to rendering data, I struggled. The GraphQL API I was working with had a lot of nullable data. In regular vanilla React, I don't really worry about this kind of thing. Or at least, I don't think I do.

However, because Reason is typed, I do have to worry about it. And this is where I got stuck. 

I was stuck on this particular error message:

```shell
Error: This pattern matches values of type option('a)
       but a pattern was expected which matches values of type
         Js.Array.t(option({. "currency": option(string),
                             "rate": option(string)}))
           =
           array(option({. "currency": option(string),
                          "rate": option(string)}))
```

I didn't understand the option part. It looked funky to me. After trying to google various things and struggling for a few hours, I finally decided to post in the [Reason Discord](https://discordapp.com/invite/reasonml).

I hadn't spent much time in the Reason Discord community prior to this so I didn't know what to expect.

To my surprise, people were quick to help me! At first, I didn't understand the solutions people gave me. I felt embarrassed to ask more questions and have them clarify, but after I did, it cleared things up.

With a little bit of extra help for rendering an array of `null` (due to the way the API was designed + the types Reason wanted), I figured out the solution!

![Some data or none, drawing](drawing-data.png)
<small>
    Open this drawing in <a href="https://excalidraw.com/#json=4900521227845632,zu4fe5MiNz4AHPb76JnA6A" target="_blank">Excalidraw</a> 
</small>

## Solution

Here's what the code looked like after getting things to work:

```reason
open ApolloHooks;
open Belt;

module GetExchangeRates = [%graphql
  {|
  query getExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
|}
];

[@react.component]
let make = () => {
  let (simple, _full) = useQuery(GetExchangeRates.definition);

  <div>
    {switch (simple) {
     | Loading => <p> {React.string("Loading...")} </p>
     | Data(data) =>
        let currencies =
          switch (data##rates) {
          | Some(rates) =>
            rates->Array.map(rate =>
              rate
              ->Option.map(rate => rate##currency)
              ->Option.mapWithDefault(React.null, currency =>
                  switch (currency) {
                  | Some(currency) => <p> {React.string(currency)} </p>
                  | None => React.null
                  }
                )
            )
          | None => [||]
          };
       React.array(currencies);
     | NoData
     | Error(_) => <p> {React.string("Get off my lawn!")} </p>
     }}
  </div>;
};
```

I wouldn't call it pretty, but it's certainly functional!

The hurdle I fought to get over was handling the different nullable cases. If we walk through this data, this is what's happening (starting on the line `switch(data##rates)`):

1. Rates either returns an array or `null` so we need to switch on it
   1. If it returns some data, we map over that data
   2. If it returns no data, we return an empty array
2. Mapping over rates, we switch on rate because it could be a value or `null`
   1. If we have a rate, we move into currency
   2. If we don't, we return `null`
3. With the `currency`, we switch on some data or none
   1. With some, we can finally use the currency string inside a `<p>` tag
   2. With no data, we return `null`

Struggling through this, I realized a few gaps in my knowledge:
- I wasn't comfortable with pattern matching in Reason
- I didn't understand the option type
- I didn't know about utilities like `Belt`

Once I received an explanation from members of the Reason community and suggestions, I saw my data rendered on the screen and it felt magical.

If you want to see this code in the original repo, you can view the source at [this commit](https://github.com/jsjoeio/goal-app/blob/fd518d581491297ff34c9e18635d19ae11ccec2f/src/Components/Example.re).

## Summary

I learned that having a good understanding of pattern matching and the option type are important when working with GraphQL in ReasonReact. I am excited to continue learning Reason and using it in future projects. Hopefully this is the first post of many!

I've heard there are a lot of exciting things coming up in the newest release([0.8.0](https://github.com/reasonml/reason-react/blob/master/HISTORY.md#080-042020)) of ReasonReact including documentation fixes (and an Apollo/GraphQL recipe!).

Thanks for reading!

### Thanks

Lastly, I want to give thanks to members of the Reason community who helped me understand how to fix my code:

- @yawaramin
- @anmonteiro
- @sgrove
- @the__spyder
- [@fhammerschmidt](https://github.com/fhammerschmidt)
 