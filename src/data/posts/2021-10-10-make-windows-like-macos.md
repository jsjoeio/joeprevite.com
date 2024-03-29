---
title: Make Windows Like macOS
description: A guide to walk you through setting up keyboard shortcuts and
  applications to feel similar on Windows as they do on macOS.
slug: windows-like-macos
tagline: Switching between operating systems with ease
date: 2021-10-10
published: true
tags:
  - Miscellaneous
---

I've been using macOS as my main driver for the past 10 years or so. Last month, I bought a PC.

Since I now switch between macOS and Windows daily - mac for work and Windows for personal - I wanted to find a way to synchronize my workflow, specifically:

- applications
- keyboard shortcuts (hotkeys)

## Overview

This guide assumes you prefer the keyboard shortcuts and applications on macOS and you want them to be similar on Windows 10.

### Applications

Here are a list of applications on macOS and their equivalent on Windows. You'll need to install the Windwos ones if you don't already have them:

- [Rocket](http://www.get-emoji.com/rocket/) -> Windows Emoji Picker (built-in with Windows 10)
  - used to quickly type emojis
- [Alfred](https://www.alfredapp.com/) -> PowerToys Run
  - used to quickly open apps, or change computer state (sleep, restart, shutdown)
- macOS Screenshot Tool -> Windows Snipping Tool (built-in)
  - used to take screenshots
- [Clippy](https://github.com/Clipy/Clipy) -> Windows Clipboard
  - manages your clipboard history
- N/A -> [PowerToys](https://github.com/microsoft/PowerToys)
  - comes with a Keyboard Manager and many other tools
- N/A -> [Easy Window Switcher](https://neosmart.net/EasySwitch/)
  - adds a keyboard shortcut to switch between windows of the same application on Windows

### Keyboard Shortcuts

This is the main component to syncing your workflows. I found that after remapping these keys and shortcuts, it became 10x more seamless switching between operating systems.

1. Open PowerToys
2. Go to Keyboard Manager
3. Add the following Keys

<ul>
  <li> 
    <kbd>Caps Lock</kbd> to <kbd>Esc</kbd>
    <p>This is for vim'ing.</p>
  </li>
  <li> 
    <kbd>Esc</kbd> to <kbd>Caps Lock</kbd>
    <p>I don't use the actual Esc key so map back to Caps Lock in case we need it.</p>
  </li>
  <li> 
    <kbd>Ctrl</kbd> to <kbd>Alt</kbd>
    <p>Switch these two to be more like macOS</p>
  </li>
  <li> 
    <kbd>Alt</kbd> to <kbd>Ctrl</kbd>
    <p>Same as above</p>
  </li>
</ul>

4. Add the following Shortcuts

<ul>
  <li> 
    <kbd>Ctrl</kbd><kbd>Tab</kbd> to <kbd>Alt</kbd><kbd>Tab</kbd> - Switch Application Windows similar to macOS
  </li>
  <li> 
    <kbd>Ctrl</kbd><kbd>Space</kbd> to <kbd>Alt</kbd><kbd>Space</kbd> - Launches the shortcut menu (like Spotlight)
  </li>
  <li> 
    <kbd>Ctrl</kbd><kbd>Left</kbd> to <kbd>Home</kbd> - Moves cursor to start of line
  </li>
  <li> 
    <kbd>Ctrl</kbd><kbd>Right</kbd> to <kbd>End</kbd> - Moves cursor to end of line
  </li>
  <li> 
    <kbd>Ctrl</kbd><kbd>Q</kbd> to <kbd>Alt</kbd><kbd>F4</kbd> - Quit applications like on macOS
  </li>
  <li> 
    <kbd>Ctrl</kbd><kbd>`</kbd> to <kbd>Alt</kbd><kbd>`</kbd> - Toggle between windows of same application
  </li>
  <li> 
    <kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>4</kbd> to <kbd>Win</kbd><kbd>Shift</kbd><kbd>S</kbd> - Take screenshots like on macOS
  </li>
  <li> 
    <kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>V</kbd> to <kbd>Win</kbd><kbd>V</kbd> - Launch Clipboard history like with Clippy on macOS
  </li>
  <li> 
    <kbd>Win</kbd><kbd>Shift</kbd><kbd>Left</kbd> to <kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>Left</kbd> - Select word by word moving left
  </li>
  <li> 
    <kbd>Win</kbd><kbd>Shift</kbd><kbd>Right</kbd> to <kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>Right</kbd> - Select word by word moving right.
  </li>
  <li> 
    <kbd>Win</kbd><kbd>Ctrl</kbd><kbd>Left</kbd> to <kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>Tab</kbd> - Move to the previous tab
  </li>
  <li> 
    <kbd>Win</kbd><kbd>Ctrl</kbd><kbd>Right</kbd> to <kbd>Ctrl</kbd><kbd>Tab</kbd> - Move to the next tab
  </li>
</ul>

### Additional Notes

There are some limitations to this. For instance, connecting to bluetooth devices on macOS is only two clicks vs four clicks on Windows. I also couldn't make the Windows Emoji Picker exactly like Rocket.

Sometimes the keyboard manager in PowerToys doesn't work and I have to restart my PC.

Other times, putting my PC to sleep and waking it back up, applications randomly stop working.

PowerToys doesn't let you export your Keyboard Manager settings so there's no easy way to back them up besides taking screenshots.

You may need to restart some apps for the keyboard shortcuts to take effect.

You may need to remap some shortcuts on applications like VS Code or Obsidian.
