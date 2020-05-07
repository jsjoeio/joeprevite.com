import React from 'react'
import { css } from '@emotion/core'
/*


What are the requirements for this component?

1. Looks like a note (styles)
2.

In the ideal world, I would use it like this inside my .md/.mdx file


<Note text={`My cool markdown string that supports markdown so I can do this [link](https://google.com)`}

*/

export function Note({ children }) {
  // parse markdown and then render HTML inside note
  return (
    <div
      className="note"
      css={css`
        background-color: #fff4d5;
        border: 2px solid #ffedbb;
        margin: 1.5rem 0;
        padding: 1rem;
      `}
    >
      {children}
    </div>
  )
}
