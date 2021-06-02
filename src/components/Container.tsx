import React, { FC } from 'react'
import { css } from '@emotion/core'
import { bpMaxSM } from 'lib/breakpoints'

interface ContainerPropsType {
  maxWidth?: number;
  noHorizontalPadding?: boolean;
  noVerticalPadding?: boolean;
}

const Container: FC<ContainerPropsType> = ({
  children,
  maxWidth = 700,
  noHorizontalPadding = false,
  noVerticalPadding = false,
  ...restProps
}) => {
  return (
    <div
      css={css`
        width: 100%;
        margin: 0 auto;
        max-width: ${maxWidth + (noHorizontalPadding ? 0 : 80)}px;
        padding: ${noVerticalPadding ? 0 : '40'}px
          ${noHorizontalPadding ? 0 : '40'}px;
        ${bpMaxSM} {
          padding: ${noVerticalPadding ? 0 : '20'}px
            ${noHorizontalPadding ? 0 : '20'}px;
        }
      `}
      {...restProps}
    >
      {children}
    </div>
  )
}

export default Container
