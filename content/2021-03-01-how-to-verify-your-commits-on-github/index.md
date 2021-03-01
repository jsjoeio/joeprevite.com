---
slug: 'verify-commits-on-github'
date: '2021-03-01'
title: 'How to Verify Your Commits on GitHub'
description: 'This articles walks you through step-by-step verifying your commits for GitHub.'
tagline: 'A step-by-step walkthrough'
published: true
tags: ['GitHub']
---

![verified commit badge on GitHub](./verified.png)

If you've ever needed to verify your commits, either for an open source project, or your employer, but not sure how then this is the guide for you!

I'll walk you through verifying your commits on GitHub for Linux.

## Steps

### 1. Create a GPG Key

To do this, follow these steps:

1. Generate a GPG key using RSA with size of 4096 bits
   ```shell
   gpg --full-generate-key
   ```
2. Press enter to accept default RSA.
3. Type in `4096` for size.
4. Enter length of time key should be vaid. Press enter to never expire.
5. Verify everything looks Okay.
6. Enter the same email used by your GitHub account and git config.
7. Type in a secure password and save it somewhere.
8. List the key with:
   ```shell
   gpg --list-secret-keys --keyid-format LONG
   ```
9. Grab the key ID. In this example, the key ID is `99E91413F3F0F32A`:
   ```shell
   ➜  dotfiles git:(master)    gpg --list-secret-keys --keyid-format LONG
   gpg: checking the trustdb
   gpg: marginals needed: 3  completes needed: 1  trust model: pgp
   gpg: depth: 0  valid:   1  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 1u
   /home/coder/.gnupg/pubring.kbx
   ------------------------------
   sec   rsa4096/99E91413F3F0F32A 2021-03-01 [SC]
         2E7C0CDB3335CA962145539d7F99E91413F3F0F32A
   uid                 [ultimate] Joe Previte <____@gmail.com>
   ssb   rsa4096/FDAAA3AF85CEF1E0 2021-03-01 [E]
   ```
10. Now run this command which will print the GPG key in ASCII armor format:

```shell
gpg --armor --export 99E91413F3F0F32A
```

11. Copy the whole block to your clipboard. Then we'll add it to GitHub.

### 2. Add the GPG key to your GitHub account

Now that we have the key, we need to tell GitHub about it.

1. Go to Settings > [New GPG Key](https://github.com/settings/gpg/new)
2. Paste the key from the Step 1.
3. Hit add key.

### 3. Add key to local Git Settings

The key exists locally and GitHub knows about it. Now we need to tell our local git settings to use it.

1. Remember the key we used above? Mine was `99E91413F3F0F32A`. Get that.
2. Run `git config --global user.signingkey` followed by your key.
3. Tell git to automatically sign your commits with
   ```shell
   git config --global commit.gpgsign true
   ```

#### 4. Update `~/.zshrc` or `~/.bashrc` file

The final step is to update your shell config file. This ensure the key is set as an environment variable for git and GPG to use.

1. Open your `~/.zshrc` or `~/.bashrc` file.
2. Add this to the bottom
   ```shell
   export GPG_TTY=$(tty)
   ```
3. Restart your shell by running `zsh` or `bash`.

#### 5. Cache passphrase

If you try committing, you'll notice that GPG asks for your passphrase. But we don't want this. At least, we want to cache our passphrase so we don't have to enter it for every commit. To do that, follow these steps:

1. Go to `~/.gnupg/gpg-agent.conf`. If it doesn't exist, create it.
2. Add this line:
   ```text
   default-cache-ttl 360000
   ```
3. Save and restart your shell again.

And that's it! You can verify that it's working by pushing any commit to any repo.

Kudos to [@Beneboe](https://github.com/Beneboe) for writing these instructions in a [gist](https://gist.github.com/Beneboe/3183a8a9eb53439dbee07c90b344c77e) and [this Stack Overflow question](https://unix.stackexchange.com/questions/395875/gpg-does-not-ask-for-password).
