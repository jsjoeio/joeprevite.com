import React from 'react'
import { css } from '@emotion/core'
import { useTheme } from '../Theming'

// TODO
// Make this a button like link
// Figure out what it should look like?
// look at public.

export function VimForVSCode() {
  const theme = useTheme()

  return (
    <div
      css={css`
        background-color: ${theme.colors.noteBg};
        border: 2px solid ${theme.colors.noteBorder};
        border-radius: 4px;
        color: ${theme.colors.noteText};
        font-weight: bold;
        margin: 1.5rem 0;
        padding: 1rem;

        p {
          margin-bottom: 0;
        }
      `}
    >
      <p>Buy it</p>
    </div>
  )
}

export default VimForVSCode
