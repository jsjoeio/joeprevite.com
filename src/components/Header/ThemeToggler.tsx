import React, { FC } from 'react'
import { keyframes } from '@emotion/core'
import Button from './Button'
import { ThemeType, useTheme } from '../Theming'
import { ThemeIcon } from './ThemeIcon'
import colors from '../../lib/colors'

const spin = keyframes`
  0% {
    transform: rotate (0deg);
  }

  25% {
    transform: rotate (90deg);
  }

  50% {
    transform: rotate (180deg);
  }

  75% {
    transform: rotate (270deg);
  }

  100% {
    transform: rotate(360deg);
  }
`

interface ThemeTogglerPropsType {
  themeName: ThemeType['themeName'];
  toggleTheme: ThemeType['toggleTheme'];
}

type AnimationPlayState = 'paused' | 'running';

const ThemeToggler: FC<ThemeTogglerPropsType> = ({ toggleTheme, themeName }) => {
  const [animationPlayState, setAnimationPlayState] = React.useState<AnimationPlayState>('paused')
  const theme = useTheme()

  const isDarkTheme = themeName === 'dark'

  function resumeAnimation() {
    setAnimationPlayState('running')
  }

  function pauseAnimation() {
    setAnimationPlayState('paused')
  }

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
        animation: `${spin} 3s linear infinite`,
        // animationTimingFunction: 'ease-in-out',
        animationPlayState,
        '@media (hover: hover)': {
          ':hover': {
            background: colors.transparent,
          },
          ':active': {
            background: colors.transparent,
          },
        },
      }}
      aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
      onClick={() => toggleTheme(isDarkTheme ? 'default' : 'dark')}
      onMouseEnter={() => resumeAnimation()}
      onMouseLeave={() => pauseAnimation()}
    >
      <ThemeIcon
        title={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
        isDarkTheme={isDarkTheme}
      />
    </Button>
  )
}
export default ThemeToggler
