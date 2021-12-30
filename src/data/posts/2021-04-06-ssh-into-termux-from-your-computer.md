---
slug: 'ssh-termux-from-computer'
date: '2021-04-06'
title: 'SSH into Termux from Your Computer'
description: 'Learn how to SSH into Termux on your Android phone from your computer by following this step-by-step guide.'
tagline: 'A step-by-step guide'
published: true
tags: ['Miscellaneous']
---

The other day, I was debugging something on my Android phone (Pixel 2). Instead of typing on the phone, I thought it would be easier to SSH into Termux from my laptop.

It took me a while to get everything working so I figured I'd write up a post to help me remember next time (and hopefully help you!).

Follow these steps:

1. Open Termux on your Android phone
2. Install OpenSSH:
   ```shell
   pkg upgrade
   pkg install openssh
   ```
3. Set up a password:
   ```shell
   passwd
   ```
4. Find your username by running this in Termux:
   ```shell
   whoami
   ```
   Save this value for later. Might look like `u0_a254`
5. Find the host by running this in Termux:
   ```shell
   ipconfig
   ```
   Look for something like `inet addr:192.168.0.100` Save this value for later.
6. Start the ssh server on Termux:
   ```shell
   sshd
   ```
   Verify that it's running with:
   ```shell
   logcat -s 'ssh:*'
   ```
   You should see something like "Server listening on port 8022"
7. On your computer, SSH into your machine on port 8022 (default port):
   ```shell
   ssh <username>@<jjhost> -p8022
   ```
8. Type in your password and viola! You're accessing Termux from your computer.

## Additional Resources

These are the resources that helped me figure this out and might provide more context.

- [How do I find the user name and host name of my local machine?](https://superuser.com/questions/667171/ssh-usernamehost-how-do-i-find-the-user-name-and-host-name-of-my-local-mach/667173#667173)
- [Remote Access - Termux Wiki](https://wiki.termux.com/wiki/Remote_Access)

Remember, ssh depends on your network settings. If you're having issues with the ssh part (possibly if your phone is connected to a celluar network instead of WiFi), you can try this:

```shell
sshd -e -d -d -d
```
