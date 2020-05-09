---
slug: 'writing-custom-note-component-mdx'
date: '2020-05-06'
title: 'Writing a Custom Note Component for MDX'
description: 'A short post exploring how I wrote a custom note component for MDX.'
tagline: 'MDX for the win'
published: true
---

import { Note } from '../../src/components/Note'

Back when I was looking for inspiration while building my personal website and blog, I stumbled upon [Tania Rascia's site](https://www.taniarascia.com/understanding-generators-in-javascript/).

One of my favorite parts were her "custom blocks" - colorful components used to annoate or add helpful information to her articles. I made a note to create some for mine when I had the time.

Now that I've found the time, I've learned there are multiple ways to do it. In this post, I'll explain a couple of ways to write a custom `<Note />` component for MDX.

## JSX

We can go the JSX route and do it straight up.

Code:

```jsx
<Note>
  <p>hello</p>
</Note>>
```

Rendered:
<Note><p>hello</p></Note>

This works and it's intuitive, but it feels like a lot of work! I'd rather write Markdown and let MDX handle the rest for me.

## Content

I learned(thanks to [@woorm](https://github.com/wooorm) for [pointing this out](https://spectrum.chat/mdx/general/react-component-markdown-as-a-prop~66bae3e4-bb27-4537-b3b3-ee3712a6eb49?m=MTU4ODc0NzA0NTI5Nw==) on the MDX Spectrum community) that I can use my component as a "JSX Wrapper". This means I can wrap my Markdown content within my `<Note />`.

Code:

```markdown
<Note>
  **Note:** You _might_ want to check this out! [Link](https://freecodecamp.org/)
</Note>
```

Rendered:
<Note>

**Note:** You _might_ want to check this out! [Link](https://freecodecamp.org/)

</Note>

I like this approach more because it allows me to a) write markdown and b) put it in a styled container. I let MDX handle the hard stuff for me!
