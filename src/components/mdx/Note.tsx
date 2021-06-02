import React, { FC } from 'react'
import { css } from '@emotion/core'
import { useTheme } from '../Theming'

export const Note: FC = ({ children }) => {
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
      {children}
    </div>
  )
}

export default Note
