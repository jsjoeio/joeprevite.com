[![Netlify Status](https://api.netlify.com/api/v1/badges/6a7baf29-1359-4b73-88cd-3204b797321c/deploy-status)](https://app.netlify.com/sites/jsjoeio-astro-starter/deploys)

# astro-starter

## [Demo Site](https://jsjoeio-astro-starter.netlify.app/)

If you couldn't tell from the GitHub repo page, this starter is built off another starter called [`astro-minimal-starter`](https://github.com/jaydanurwin/astro-minimal-starter).

I decided to make my own starter because I wanted to make a couple changes to the base template. These are the changes I've made:

- minor SEO adjustments
- store post/page data in `src/data/posts`
- add Netlify CMS
- add Netlify Redirects
- add Netlify Redirects
- add Tailwind
- write components in React & TypeScript

### Structure

One thing to note about Pages vs Posts. All posts (i.e. blog posts) live in `/src/data/posts` and are Markdown files. Pages live under `/src/pages` and can be Markdown or Astro components.

In the past, I've had some pages live next to blog posts, but I find that more confusing from a maintainence perspective.

## Get Started

# Install Dependencies

```shell
yarn
```

# Run Site locally

```shell
yarn start
```

To access Netlify CMS, you need to run the proxy server in a separate terminal:

```shell
npx netlify-cms-proxy-server
```

See [here](https://prince.dev/astro-netlify-cms) for more information.

# Build Site

```shell
yarn build
```

Navigate to `src/data/site.ts` and edit to match your site's information.

Start writing new blog posts in Markdown at `src/data/posts/`.
