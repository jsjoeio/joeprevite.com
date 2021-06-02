import React, { FC } from 'react'
import { css } from '@emotion/core'
import { GatsbyLinkProps, Link } from 'gatsby'
import { useTheme } from '../Theming'
import { rgba, darken } from 'polished'

type LinkPropsType = Omit<GatsbyLinkProps<unknown>, 'ref'> & {
  secondary?: boolean;
};

type HTMLButtonElementPropsType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  secondary?: boolean;
};

type ButtonPropsType = LinkPropsType | HTMLButtonElementPropsType;

const Button: FC<ButtonPropsType> = ({ children, secondary, ...restProps }) => {
  const theme = useTheme()
  const textColor = secondary ? theme.colors.primary : theme.colors.bodyBg
  const styles = css({
    display: 'inline-flex',
    border: 'none',
    borderRadius: '4px',
    background: secondary ? rgba(theme.colors.link, 0.1) : theme.colors.link,
    color: textColor,
    padding: '10px 15px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    '@media (hover: hover)': {
      ':hover': {
        color: textColor,
        background: darken(0.1, theme.colors.link),
        border: 'none',
      },
    },
  })

  return (restProps as LinkPropsType).to ? (
    <Link css={styles} {...(restProps as LinkPropsType)}>
      {children}
    </Link>
  ) : (
    <button css={styles} {...(restProps as HTMLButtonElementPropsType)}>
      {children}
    </button>
  )
}

export default Button
