import React from 'react'
import Button from './Button'
import { useTheme } from '../Theming'
import { ThemeIcon } from './ThemeIcon'
import colors from '../../lib/colors'

const ThemeToggler = ({ toggleTheme, themeName }) => {
  const theme = useTheme()

  const isDarkTheme = themeName === 'dark'

  return (
    <Button
      css={{
        borderRadius: '50%',
        width: '2.375rem',
        height: '2.375rem',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        color: theme.colors.white,
        background: colors.transparent,
        '@media (hover: hover)': {
          ':hover': {
            background: theme.colors.bodyBg,
          },
        },
      }}
      aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
      onClick={() => toggleTheme(isDarkTheme ? 'default' : 'dark')}
    >
      <ThemeIcon
        title={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
        isDarkTheme={isDarkTheme}
      />
    </Button>
  )
}
export default ThemeToggler
