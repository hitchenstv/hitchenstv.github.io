---
title: AddOns
layout: default
parent: Home
nav_order: 3
---

# AddOns

The good news. The TRR client runs on a 3.80.x build with the MoP Classic API, so most MoP compatible addons work. The catch is the distribution is different. CurseForge now has a TRR section, but the Chinese scene moves faster on its own platform. Here are some notes.

## Where to get addons

### CurseForge

Blizzard added an official TitanReforged (TRR) game version category. Small but growing. You can browse it here: [CurseForge TRR addons](https://www.curseforge.com/wow/search?page=1&pageSize=20&sortBy=relevancy&class=addons&gameVersionTypeId=81212)

### NewBeeBox, also called WCLBox, the CN CurseForge

This is the one you actually want. NewBeeBox (WCLBox) is the Chinese equivalent of CurseForge, and it now has an English UI and Google or WeChat login. It also hosts WoWSims for Titan Reforged and most of the CN maintained addons.

1. Download from [wclbox.com](https://www.wclbox.com/) in the top right.
2. Install and (optionally) log in with Google or WeChat.
3. Click World of Warcraft.
4. Top right language menu, switch to English.
5. Game version, select "Titan".
6. Browse, install, and update like CurseForge or Wago.

WCLBox also has a Server Data Migration tool and cloud backups, and you will want these. Server names sometimes change with a new phase (they literally rename realms), and your WTF folder breaks each time. The migration tool is a one click fix, or you can rename the `WTF/Account/<server>` folder and references in SavedVariables by hand.

## WeakAuras Patcher

I built a tool to patch WeakAuras from NewBeeBox or other sources, it replaces zhCN spell-, item- and npc-names with the enUS variants. You'll find it [in the /wapatcher subdirectory to this wiki](https://hitchenstv.github.io/wapatcher/).


## Essential AddOns

BiaoGe is the Gargul of CN GDKPs. It handles all bids, healer and tank bonuses, fines, and gold splits, browses available gear, and manages wishlists so you get pinged when your item drops. There is a WeakAura alternative if you would rather not run the full addon. Paid version exists (NetEase does not care about paid addons) and adds batch mailing gold splits, MRT style assignments, AtlasLoot, and full GDKP bill history.

MeetingHorn is the CN LFG tool. Pretty much everyone uses it for premade groups. There is an international MeetingHorn build on NewBeeBox, grab that one. Heads up, on the EN client, comms from other players still arrive in Chinese because the addon pulls names from the client. Usable, just do not expect English chatter.

## Recommended, they mostly just work

DBM or BigWigs. DBM has CN maintained builds, BigWigs is popular for raids.

WeakAuras. Grab Titan specific packs, spell IDs can differ from WotLK classic. (Possibly outdated advice: Do not update to 5.21, something with talents broke, use 5.20.7.)

Details, the damage meter. If it will not load after a patch, update to the NewBeeBox or Curse version. One version even shipped a dead man's switch that wiped itself, just update.

ElvUI, NDUi, Plater, ThreatPlates for unit frames and nameplates. The Lulu (露露組姫) UI packs on NewBeeBox are excellent ElvUI and NDUi profiles and perform well on TRR.

EasyAuction for the Auction House, patched versions for enUS (DE values, Titan Fragments, alaTradeSkill) are sometimes posted in the discord but not needed. The AH is throttled, if you see "Internal Auction Error" that means you hit the per minute limit, wait a full minute.

AtlasLoot, Postal for mailing alts, Questie (occasionally flaky after patches, a relog often fixes it), Cell for healer frames, Decursive, and Leatrix Plus. Some Leatrix versions break after the 3.80.1 update, the one with the cool cat logo works.

Plater and WA import issues are common on CN. Plater profiles especially break easily, delete and reimport the font folder if nameplates go blank. Some aura and spell IDs differ from WotLK, so grab Titan maintained packs, like the community Warlock WA fork or the Titan Spriest WA thread on bbs.nga.cn.

## Translation and chat

Most people do the copy and paste thing. Grab the Chat Copy Paste addon from NewBeeBox (or use the built-in ElvUI one), copy the Chinese message, and paste it into Google Translate. That works for most players.

To make it smoother, try Crow Translate ([github.com/crow-translate/crow-translate](https://github.com/crow-translate/crow-translate)). Set it to pop up on a hotkey, always translating CN to EN, and you barely have to leave the game.

If you want it automated in game, try the TranslateCN AddOn ([CurseForge: TranslateCN](https://www.curseforge.com/wow/addons/translatecn)), but I don't know if anyone actively uses this.

For big Chinese UI WeakAura packs, some players batch replace spell, item, and location names with English ones. Great if you know how to do this, check the Discord if someone is sharing.

## WoWSims

WoWSimsCN, the TRR version of WoWSims, lives inside NewBeeBox. A subscription is needed to run more than 5 simulations/day to pay for the China-specific development.

## Quick checklist

- NewBeeBox installed, language set to English, version set to Titan
- BiaoGe and the international MeetingHorn for GDKPs and LFG
- Chat Copy Paste plus Google Translate (or TranslateCN) so you can parse /ra or /p
- Details, WeakAuras, DBM, Plater, ElvUI, all the usual stuff works

Next, get on voice so your raid can yell at you. That is the Voice Comms page.
