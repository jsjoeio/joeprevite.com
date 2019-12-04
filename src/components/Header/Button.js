import { React } from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import { useTheme } from '../Theming'
import { rgba, darken } from 'polished'

const Button = ({ to, children, secondary, ...restProps }) => {
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
  return to ? (
    <Link to={to} css={styles} {...restProps}>
      {children}
    </Link>
  ) : (
    <button css={styles} {...restProps}>
      {children}
    </button>
  )
}

export default Button
