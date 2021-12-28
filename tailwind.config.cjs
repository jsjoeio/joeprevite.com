module.exports = {
    content: [
      './public/**/*.html',
      './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}',
    ],
  theme: {
    extend: {
      colors: {
        default: '#f0c090',
        defaultBg: '#000b3b',
        link: '#A1F090',
        linkLight: '#c8f7bd',
      }
    }
  }
};