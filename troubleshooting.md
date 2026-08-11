---
title: Troubleshooting
layout: default
parent: Home
nav_order: 9
---

# Troubleshooting

Half the #bug-report channel is the same handful of problems, so here they are with the fixes people actually found. If your issue is not here, check the Discord, someone has almost certainly hit it before.

## Login and Battle.net issues

Infinite loop asking to connect your Battle.net and NetEase accounts. A few things that have worked for people:

1. Restart the Battle.net app a couple of times. Sounds dumb, fixes it more often than you would think.
2. Clear the Battle.net cache folders in AppData (multiple locations, no need to touch Program Files).
3. Copy the login URL that pops up into a different browser (Firefox if your default is Chromium, and the other way around) and log in there.
4. Make sure the website is allowed to access devices on the local network. Edge and work profiles sometimes block this setting without telling you.

Stuck before the client even loads, or client never gets past the red stage. Usually a network path problem to China. Try the DNS fix below first, then your booster.

Region locked out of bnet through CN region settings. People have fixed it with a VPN, or by manually setting DNS to 1.1.1.1 (Cloudflare) and 8.8.8.8 (Google), followed by `ipconfig /flushdns`. It looks like routing rather than an IP ban.

Verification prompt every time you switch devices. Logging in from a new computer triggers an SMS verification to the number on the account. That is normal, you just need the code. If you never get the code, the number is the problem, not the login.

## GearUP and connection issues

Working fine without GearUP, but with it you get "world server is down", stuck on the loading screen, or "Transfer Aborted: instance not found". This is the classic booster routing problem. In order of likelihood:

1. Switch the GearUP node. Auto node often picks bad routing, people have had luck forcing Frankfurt or picking a node close to you. Change nodes and retry.
2. Try logging in without the booster first, then enable it after you are in.
3. Change your DNS to 1.1.1.1 or 8.8.8.8 and flush.
4. If it still does it, play without GearUP for a while. There have been stretches (like the Feb 2026 undersea cable mess) where the infrastructure itself was broken and no node helped.

Random disconnects and world server down even with normal ping. Same node dance applies. If you are getting "Transfer Aborted" when changing zones or characters, that is the same routing issue, pick a different node.

## Queues

"Logging in to game server" forever on the English client. You are in the queue, it just does not show a number or timer on the EN client. The CN client shows the position. You will get in eventually.

Want the actual queue number on a regular client? Check the NewBeeBox Observatory (WCLBox), it shows real time queue status.

Queue timing. Peak queues run from around 7 pm to 9 am China time, worst in the evening. Queues were brutal at launch (3 hour waits were normal) but server capacity was raised and they mostly went away. New realms still queue during peak.

Got DCed and lost your place. Relogging right away sometimes gets a grace window. If not, you eat the queue again, sorry.

## Auction House

"Internal Auction Error" on every search or buy. The AH is throttled per minute. Wait a full minute, do not reopen the window or spam clicks, that does not help because the limit is time based.

AH feels sluggish or bricked on the EN client. Some people report a much snappier AH after switching locale to zhCN in game. The AddonLocale addon handles this: set `/addonlocale set zhCN` then `/rl`, and back to `enUS` before dungeons. YMMV.

## Addon issues

Lua errors when a loot window pops up, or client freezes when you see Wrath loot. Usually a tooltip addon. People have had this with Leatrix Plus tooltip features, disable those. Install BugSack and BugGrabber to see what is actually erroring instead of guessing.

Plater breaks or disables itself on CN. It is a known problem. Delete and reimport the font folder, and avoid importing profiles, that tends to break it again.

WeakAuras, do not update to 5.21. Something with talents is broken, stick with 5.20.7.

Details will not load after a patch. Update it to the current NewBeeBox or Curse version. One version shipped a dead man's switch that wiped itself, updating fixes that too.

MeetingHorn not showing 40 man raids, or world boss listings missing. Locale issue. Set AddonLocale to zhCN even on an EN client, then back to enUS. There is also an international MeetingHorn build that handles more of this.

Questie breaks after patches. A relog sometimes fixes it, otherwise grab the updated version from NewBeeBox.

Drag and dropped addon does not load. WoW does not like the version number in the folder name, remove the trailing `1.0.0` from the folder.

Suddenly seeing Chinese instead of English in game, or vice versa. Your Config.wtf locale or AddonLocale got changed. See the Getting Started page for the Config.wtf fix.

## Dungeon and zone quirks

Azjol-Nerub can softlock. It has been broken in both WotLK and TRR for ages and never fixed. You will see it while leveling or farming pre-raid gear at 80. A lot of tanks do not know about it, so try to avoid queueing into it.

Faction lockouts. New realms periodically lock character creation for a faction when population is too high. Check the other realm, or wait for low traffic hours (3 to 4 am server time).

## Settings quirks that are not bugs

Mature language filter re-enables every time you log out. That is mandatory on CN servers, there is no workaround, the CN client cannot even toggle it.

## Still stuck?

Ping in the Discord, someone is almost always around. TRR Info Center: [discord.gg/YMzFp2MqWN](https://discord.gg/YMzFp2MqWN)