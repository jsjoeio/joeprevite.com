import Typography from 'typography'

export const FONT_FACE = 'system-ui'

export const fontStyles = {
  light: `300 ${FONT_FACE}`,
  lightItalic: `italic 300 ${FONT_FACE}`,
  normal: `400 ${FONT_FACE}`,
  normalItalic: `italic 400 ${FONT_FACE}`,
  medium: `500 ${FONT_FACE}`,
  mediumItalic: `italic 500 ${FONT_FACE}`,
  bold: `700 ${FONT_FACE}`,
  boldItalic: `italic 700 ${FONT_FACE}`,
}

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.55,
  headerLineHeight: 1.4,
  headerFontFamily: [FONT_FACE, 'sans-serif'],
  headerWeight: 700,
  bodyFontFamily: [FONT_FACE, 'sans-serif'],
  bodyWeight: 400,
  headerColor: 'hsla(0,0%,0%,0.9)',
  bodyColor: 'hsla(0,0%,0%,0.8)',

  overrideStyles: ({ rhythm }) => ({
    h1: {
      color: 'hsla(0,0%,0%,0.75)',
    },
    h2: {
      color: 'hsla(0,0%,0%,0.775)',
    },
    h3: {
      color: 'hsla(0,0%,0%,0.8)',
    },
    'h1,h2,h3,h4,h5,h6': {
      lineHeight: 1,
    },
    'h1,h2,h3,h4': {
      lineHeight: 1.25,
      marginTop: rhythm(1),
      marginBottom: rhythm(1 / 2),
    },
  }),
})
// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
