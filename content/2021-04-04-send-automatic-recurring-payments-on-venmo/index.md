---
slug: 'send-automatic-recurring-payments-on-venmo'
date: '2021-04-04'
title: 'Send Automatic Recurring Payments on Venmo'
description: 'Learn how to use Python, Telegram and GitHub Actions to send automatic recurring payments on Venmo! This will save you a lot of time.'
tagline: 'Leave the boring stuff to the bots'
published: true
tags: ['GitHub', 'Python']
---

**TLDR**

I wrote a script to send automatic recurring payment requests on Venmo using Python, Telegram and GitHub Actions 🚀

🔗 [Link to repo](https://github.com/jsjoeio/monthly-venmo)

## Backstory

I've had this idea for a while. For the past 2-3 years, every month I send the same Venmo requests to the same 3 family members. I thought to myself, "Is there a way I can make these automatic?"

And, I didn't have a good system. I would send the request if I remembered or if I happened to see the receipt in my email.

I remember looking for a solution back then, but didn't find anything.

Recently, I've been spending a lot of time writing scripts to automate things. I remembered my idea and thought, "Maybe today you can do it."

Low and behold, you can!

[@mohad3s](https://twitter.com/mohad3s) wrote a [wrapper for the Venmo API](https://github.com/mmohades/Venmo) in Python which makes requesting money as easy as calling a function.

Since GitHub Actions gives you 2,000 minutes per month + they can run on a schedule (aka cron), meaning you can run this for free!

The icing on the cake was adding [notifier](https://github.com/liiight/notifiers) by [@liiight](https://twitter.com/liiight) which lets you easily send notifications via various providers (in my case, Telegram).

This meant I could run the script and send notifications using a Telegram bot letting me know things succeeded.

## How it Works

- [Python script](https://github.com/jsjoeio/monthly-venmo/blob/main/init.py) sends Venmo request to 3 people
- Telegram bot [sends me a message](https://github.com/jsjoeio/monthly-venmo/blob/main/init.py#L47-L53) after each request is sent
- Uses GitHub Actions + scheduled workflows to [run automatically](https://github.com/jsjoeio/monthly-venmo/blob/main/.github/workflows/app.yml#L7-L10)
- [Other script](https://github.com/jsjoeio/monthly-venmo/blob/main/.github/workflows/health.yml#L4) runs once a week to make sure everything is working

### Demo

Here's a [~2min video](https://www.youtube.com/watch?v=cMHORRmHDJs) of me talking a bit about it and waking through some of the code.

It was a fun project to build! I open sourced it as well. You can check it out [here](https://github.com/jsjoeio/monthly-venmo) 🌟
