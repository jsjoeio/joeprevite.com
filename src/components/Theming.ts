import { createTheming } from '@callstack/react-theme-provider'
import { lighten, darken } from 'polished'
import colors from '../lib/colors'

type ThemeType = {
  themeName: 'default' | 'dark';
  colors: typeof colors & {
    primary: string;
    text: string;
    bodyBg: string;
    headerBg: string;
    link: string;
    noteBg: string;
    noteBorder: string;
    noteText: string;
    filterTagsBg: string;
    filterTagsBgHover: string;
    filterTagsBgActive: string;
    filterTagsBorder: string;
    filterTagsText: string;
  };
  toggleTheme: (name: ThemeType['themeName']) => void;
}

const themes: Record<ThemeType['themeName'], ThemeType> = {
  default: {
    themeName: 'default',
    colors: {
      primary: colors.blue,
      text: colors.black,
      bodyBg: colors.gray,
      headerBg: colors.gray,
      link: colors.blue,
      noteBg: colors.oasis,
      noteBorder: colors.goldenGlow,
      noteText: colors.black,
      filterTagsBg: lighten(0.35, colors.contessa),
      filterTagsBgHover: lighten(0.15, colors.contessa),
      filterTagsBgActive: lighten(0.05, colors.contessa),
      filterTagsBorder: colors.transparent,
      filterTagsText: colors.mineShaft,
      ...colors,
    },
    toggleTheme: () => {
      // noop
    },
  },
  dark: {
    themeName: 'dark',
    colors: {
      primary: lighten(0.05, colors.blue),
      text: colors.white,
      bodyBg: colors.black,
      headerBg: colors.black,
      link: lighten(0.25, colors.blue),
      noteBg: colors.balticSea,
      noteBorder: colors.raven,
      noteText: colors.lightningYellow,
      filterTagsBg: darken(0.25, colors.black),
      filterTagsBgHover: darken(0.15, colors.black),
      filterTagsBgActive: lighten(0.25, colors.contessa),
      filterTagsBorder: colors.transparent,
      filterTagsText: colors.contessa,
      ...colors,
    },
    toggleTheme: () => {
      // noop
    },
  },
}

const currentTheme = themes.default;

export type ThemeName = keyof typeof themes;

// filterTagsBg: lighten(0.1, colors.black),
// filterTagsBgHover: lighten(0.25, colors.black),
// filterTagsBgActive: lighten(0.25, colors.contessa),
// filterTagsBorder: colors.transparent,
// filterTagsText: darken(0.25, colors.contessa),

const { ThemeProvider, withTheme, useTheme } = createTheming(currentTheme)

export { ThemeProvider, withTheme, useTheme, themes, colors }
