---
title: The Missing Bug.n Blog Post
description: A blog post about using bug.n, the Windows 10 window manager, I
  wish I had when I first started using it
slug: bug-n-window-manager
tagline: Notes I wish I had from the start
date: 2022-01-10T00:18:29.545Z
tags:
  - Miscellaneous
---
Not too long ago, I heard [Prime](https://twitter.com/ThePrimeagen) talking about "window managers." I hadn't heard of them before. Essentially they let you manage windows with hotkeys. For instance, I have a shortcut that _always_ takes me to my browser. This means I can get there quickly. It's amazing.

But, you probably already know that if you're here. 

If you don't, check out this [demo of bug.n on Windows 10](https://www.youtube.com/watch?v=-lcVSgevTd0). 

## Getting Started

Here are some basic steps for getting started with bug.n

### Installing bug.n
When you're installing bug.n, you might have to get past some pesky "download blocked" error. I can't remember exactly how I solved it but I remember I had to disable blocking suspicious downloads in Chrome. 

The first time you install it, you'll need to extract it and create a bug.n `Config.ini`. You can do this by hitting `Windows+Ctrl+E`.

The path to the file is something like: `C:\Users\16024\AppData\Roaming\bug.n`

### Configuring bug.n

Once you have it installed, you'll want to edit your `Config.ini` (hit `Windows+Ctrl+E`) and set some defaults for applications. For instance, always show Brave/Chrome in View 1.

Here's mine for example:

```text
; bug.n - tiling window management
; @version 9.0.2

Monitor_#1_aView_#1=2
View_#1_#6_layoutMFact=0.500000
View_#1_#6_layoutMY=2
View_#1_#8_layout_#1=2
View_#1_#8_layoutMFact=0.700000

; Testing window configuration
Config_showTaskBar=0
Config_barTransparency=0
Config_verticalBarPos=tray

; Config rules
Config_viewNames=1;2;3;4;5;6;7;8;9

; Application Rules
;; Browser on View 1
Config_rule=Chrome_WidgetWin_1;.*Brave;;1;1;1;0;1;0;

;; Editor and Chrome on View 2
Config_rule=Chrome_WidgetWin_1;.*Web;;1;1;2;0;1;0;

;; Obsidian on View 3
Config_rule=Chrome_WidgetWin_1;.*Obsidian;;1;1;4;0;1;0;

;; Spotify on View 5

Config_rule=Chrome_WidgetWin_0;.*Spotify;;1;1;16;0;1;0;

;; Show Chrome on View 7 
Config_rule=Chrome_WidgetWin_1;.*Google Chrome;;1;1;64;0;1;0;

;; Show OBS on View 8
Config_rule=Qt5152QWindowIcon;OBS.*;;0;;;;;1;


; Hotkeys
Config_hotkey=#^Left::
Config_hotkey=#^Right::
Config_hotkey=#+Left::
Config_hotkey=#+Right::
```

## Tips
I've been using it for a couple months now. Here are some tips I wish someone had shared with me.

### Memorize these shortcuts

You'll want to memorize a few specific things such as:
- changing view mode (monacle, tile, float)
- switching views
- restart, quit

You can find all these in the [default_hotkeys](https://github.com/fuhsjr00/bug.n/blob/master/doc/Default_hotkeys.md) doc.

### Override shortcuts that conflict

You can do this by writing this:
```text
Config_hotkey=#^Left::
```

This disables the `#^Left` hotkey.

### Run on startup

Another thing you'll want to do is start bug.n on startup. Unfortunately this isn't not super straightforward on Windows 10. I had to google it. Follow [this help doc](https://support.microsoft.com/en-us/windows/add-an-app-to-run-automatically-at-startup-in-windows-10-150da165-dcd9-7230-517b-cf3c295d89dd).

### Common Gotchas

There were a couple things that tripped me up when first using bug.n

If you add a new rule, make sure you close application then reopen. Otherwise it won't take effect.

Using regular expression to select the right application can be tricky. Look for other examples on GitHub.

If you want to hide the task bar or title bar, look at other `Config.ini` or read the docs on GitHub.

That's all. Happy window managing! 