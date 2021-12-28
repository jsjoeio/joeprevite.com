---
slug: "create-a-twitter-card-for-your-blog"
date: "2021-12-27"
title: "Create a Twitter Card for Your Blog"
description: "Learn how to quickly create a twitter card for your blog using an npm package and cloudinary."
tagline: "Automate with npm package and cloudinary"
published: true
tags: ["Twitter"]
---

As [@swyx](https://twitter.com/swyx) puts it, the Twitter card or more importantly `og:image` is important because "this is THE FIRST THING newcomers to your blog see, not your actual blog."

You can set yours up fairly quickly thanks to a package called [`@jlengstorf/get-share-image`](https://www.npmjs.com/package/@jlengstorf/get-share-image) by [Jason Lengstorf](https://twitter.com/jlengstorf).

Jason wrote an awesome blog post called ["Automatically Generate Social Images for Blog Posts"](https://www.learnwithjason.dev/blog/auto-generate-social-image/). Assuming you've read his blog post, here's how you can set your Twitter/og:image up quickly.

## How to create your own

1. **[Sign up for Cloudinary](https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/ixsyxixtotweej6u9bzv)**

We'll store our card template here, and be utilizing Cloudinary's free services to lay text on top of our image.

2. **Upload your card template**

After you've signed up, upload your card template to Cloudinary. _Note: if you're having trouble designing one, Jason wrote a blog post on [how to design your own](https://www.learnwithjason.dev/blog/design-social-sharing-card/)._

3. **Change the name to something meaningful like "website-card-template"**

You'll use this later in your blog so make it easy it remember.

4. **Install [Jason's package](https://www.npmjs.com/package/@jlengstorf/get-share-image)**

```shell
# install using npm
npm install --save @jlengstorf/get-share-image

# install using yarn
yarn add @jlengstorf/get-share-image
```

5. **Add the code to generate the URL**

I have an `<SEO />` component on my site, which you can see [here](https://github.com/jsjoeio/joeprevite.com/blob/master/src/components/SEO/index.js) as an example of where to put this code.

```javascript
import getSharingImage from "@jlengstorf/get-share-image";

const socialImage = getSharingImage({
  title: "How to be a x developer",
  tagline: "Learn all the tips from this one post",
  // This is the name you see in your url
  // https://res.cloudinary.com/<Your cloud name will be here>/image/upload/v1579118925/jp-blog-post-card.png
  cloudName: "jsjoeio",
  imagePublicID: "jp-blog-post-card",
  titleFont: "Roboto",
  titleExtraConfig: "_bold",
  taglineFont: "Roboto",
});
```

6. **Use it in your meta tag**

Use your new image in your `meta` tag:

```javascript
<meta name="twitter:image" content={socialImage} />
```

7. **Push to production and test**

Once your code is ready, push it to production then check to see if it's working using something like [Twitter's Card validator](https://cards-dev.twitter.com/validator). If it works, you should see your template in action like this:

8. **Celebrate!**

We did it!

![celebration dance gif.](https://i.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.webp)
