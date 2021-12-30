// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  buildOptions: {
    site: `https://joeprevite.com/`,           // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
    sitemap: true,      // Generate sitemap (set to "false" to disable)
  },
  // Comment out "renderers: []" to enable Astro's default component support.
  renderers: ['@astrojs/renderer-react'],
});