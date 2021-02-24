---
slug: 'add-custom-domain-convertkit'
date: '2021-02-24'
title: 'How to Add Custom Domain to ConvertKit'
description: 'This article walks you through adding a custom domain to ConvertKit for use with ConvertKit Commerce.'
tagline: 'With only a few steps'
published: true
tags: ['Miscellaneous']
---

If you want to add a custom domain to ConvertKit and you're using a service like Netlify, then follow these steps.

## 1. Add a Domain in ConvertKit Settings

1. Login to your [ConvertKit account](https://app.convertkit.com/)
2. Go to Settings > Domains
3. [Add a Domain](https://app.convertkit.com/account/edit#forms_domains)

In my example, I'm going to add shop.joeprevite.com

I don't expect people to land on the root of this URL so I'll use an old project's landing page. It will then show you the DNS records that we need to modify.

## 2. Add DNS Records to Netlify

My domain is registered with Google Domains, but Netlify manages the DNS.

1. Sign in to your [Netlify account](https://app.netlify.com/)
2. Go to Domains
3. Click on the domain you want to use
4. Click add new record and add a record for the 3 Type A records provided by ConvertKit

Once you've saved all those, you're done with Step 2!

## 3. Verify DNS Records on ConvertKit

1. Head back over to ConvertKit > Settings > Domains
2. Under the domain you added, click "Refresh" on the DNS records

It should verify instantly! If not, it might take an hour or so. Come back later and try again.

And that's it! You're now using a custom domain on ConvertKit!
