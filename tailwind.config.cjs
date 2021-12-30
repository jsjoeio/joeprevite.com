module.exports = {
    content: [
      './public/**/*.html',
      './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}',
    ],
  theme: {
    extend: {
      colors: {
        default: '#ebcdcd',
        defaultBg: '#141010',
        link: '#c67171',
        linkLight: '#cf8888',
      }
    }
  }
};