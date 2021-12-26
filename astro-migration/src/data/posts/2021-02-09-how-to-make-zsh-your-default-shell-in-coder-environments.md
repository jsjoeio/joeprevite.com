---
slug: 'zsh-default-shell-in-coder-environments'
date: '2021-02-09'
title: 'How to Make zsh Your Default Shell in Coder Environments'
description: 'This article walks you through setting zsh as your default shell in Coder environments.'
tagline: 'zsh for the win'
published: true
tags: ['Miscellaneous']
---

To set `zsh` as your default shell in your Coder environment, modify your dotfiles repo and follow these steps:

1. Create a `.bashrc` file with the contents below:

```bash
# Note: this is included because of a weird bug
# Seems to be the only way to make zsh the correct shell
# See: https://askubuntu.com/a/1292415
export SHELL=`which sh`
zsh
exit
```

2. Double-check that your `.zshrc` file has the following:

```shell
export ZSH=$HOME/.oh-my-zsh
source $ZSH/oh-my-zsh.sh
```

3. Add this to your install script

```shell
# Credit: Joe Previte (@jsjoeio) - https://github.com/jsjoeio/dotfiles/blob/master/install.sh
###########################
# zsh setup
###########################
echo -e "⤵ Installing zsh..."
sudo apt-get -y install zsh
echo -e "✅ Successfully installed zsh version: $(zsh --version)"

# Set up zsh tools
PATH_TO_ZSH_DIR=$HOME/.oh-my-zsh
echo -e "Checking if .oh-my-zsh directory exists at $PATH_TO_ZSH_DIR..."
if [ -d $PATH_TO_ZSH_DIR ]
then
   echo -e "\n$PATH_TO_ZSH_DIR directory exists!\nSkipping installation of zsh tools.\n"
else
   echo -e "\n$PATH_TO_ZSH_DIR directory not found."
   echo -e "⤵ Configuring zsh tools in the $HOME directory..."

   (cd $HOME && sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended)
   echo -e "✅ Successfully installed zsh tools"
fi

# Set up symlink for .zshrc
ZSHRC_LINK=$HOME/.zshrc
if [ -L ${ZSHRC_LINK} ] ; then
   if [ -e ${ZSHRC_LINK} ] ; then
      echo -e "\n.zshrc is symlinked corrected"
   else
      echo -e "\nOops! Your symlink appears to be broken."
   fi
elif [ -e ${ZSHRC_LINK} ] ; then
   echo -e "\nYour .zshrc exists but is not symlinked."
   # We have to symlink the .zshrc after we curl the install script
   # because the default zsh tools installs a new one, even if it finds ours
   rm $HOME/.zshrc
   echo -e "⤵ Symlinking your .zshrc file"
   ln -s $HOME/dotfiles/.zshrc $HOME/.zshrc
   echo -e "✅ Successfully symlinked your .zshrc file"
else
   echo -e "\nUh-oh! .zshrc missing."
fi

# Set the default shell
echo -e "⤵ Changing the default shell"
sudo chsh -s $(which zsh) $USER
echo -e "✅ Successfully modified the default shell"

###########################
# end zsh setup
###########################
```

And that's it! 🎉

Enjoy zsh as your default shell!
