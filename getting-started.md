---
title: Getting Started
layout: default
parent: Home
nav_order: 2
---

# Getting Started

This is the "I have decided to play Titan Reforged and have no idea what I am doing" page. Follow it top to bottom and you will be logged in, in English, and ready to queue.

Quick version for the impatient: you need a NetEase account (not a normal Battle.net one), the Battle.net app pointed at the China region, and the Titan Reforged Classic client. Then you flip the client to English and buy game time with Alipay or whoever helped you get an account. Details below.

## What even is this

World of Warcraft in China is run by NetEase, not Blizzard directly. That means a few things.

Logins go through a NetEase account, also called a NetEase Passport. It is not your normal Battle.net email. NetEase has fully dropped Battle.net login for WoW, so changing your password on the Battle.net website does nothing. Your real credentials are the NetEase email or phone.

One subscription covers the CN versions. Titan Reforged (the "Time" server), plus retail, MoP, anniversary, and hardcore, all on one sub and with no extra cost for expansions.

The client is built on a 3.80.x WotLK era base but uses the MoP Classic API, so most MoP compatible addons work.

## Tier 0, can you even make an account

Overseas players cannot self register. Both NetEase email and CN phone registration want a Chinese ID or number. You have a few options.

1. A friend with Alipay or WeChat who can register and pay on your behalf.
2. Trusted setup partner. A vetted helper will set up a secure account for you for a service fee. You'll find the most commonly used on in #read-me in the Discord ([TRR Info Center](https://discord.gg/YMzFp2MqWN)). There are other third party services, but this one is the most common.

## Step 1, install Battle.net and point it at China

Install the normal Battle.net desktop app. If the China option is not in the login region dropdown, right click the Battle.net launcher, go to Properties then Compatibility, and check "Run this program as an administrator". In the Target field, add a space then `--setregion=CN` (or `--setregion=US` or `--setregion=EU`).

US and EU let you log into both regions with one launcher. CN locks you to Chinese servers only. A bit strange, but that is the behavior.

Open it, tick the box to accept Blizzard and NetEase's terms of service, and log in with your NetEase account.

## Step 2, first login and verification

You will be bounced to a webpage. Right click and translate to English if needed. Make sure to allow access to network devices if your browser asks, this is needed to send the login to the bnet app.

Click "Email Login" in the top right, enter your NetEase email and password, check the three boxes, and hit the blue login button.

On the verification page, pick NetEase General Token Verification (the box on the right). Go to the URL/IP provided when you got your account details, paste the serial number, grab the code, paste it back, and click Log in.

Back in the Battle.net client, click the blue button. If it loops you back to the cycle, just keep clicking through. It resolves.

## Step 3, install the Titan Reforged client

Click the Mists of Pandaria (MoP) icon in the top left. In the bottom left, select Titan Reforged Classic to download and install.

Curious about other versions? Retail, MoP, anniversary, and hardcore are all on the same sub. Flip between them freely. Try the latest expansion. Players are extremely friendly compared to other regions.

## Step 4, switch the client to English

The Chinese client has no in game English option, but you can force it.

Manual method, the classic way:

1. Open `_classic_titan_\WTF\Config.wtf` in any text editor.
2. Change `SET audioLocale "zhCN"` and `SET textLocale "zhCN"` to `SET audioLocale "enUS"` and `SET textLocale "enUS"`.
3. Critical step. Launch `WowClassic.exe` directly, not through Battle.net, sit on the login screen for about a minute, do not exit, then launch through the Battle.net launcher. It should come up in English.
4. You have to do this every time you relaunch. A common trick is to keep Notepad with the file open and the manually launched game running in the background. After you exit your main session, Ctrl+S the file in Notepad, then relaunch via Battle.net and you are back in English.

GearUP Booster added an automatic client locale switch for us. Set your language and hit "Translate" and it rewrites the locale for you, then just launch through Battle.net. No more Config.wtf surgery, but sometimes is breaks.

## Step 5, the queue quirk on the English client

On the English client, if there is a queue you might just see "Logging in to game server" forever and no number. That message means you are in the queue. The CN client shows the actual position and time, the EN client does not. You will get in. It is a visual bug, not a crash.

## Step 6, game time and payment

Titan Reforged uses the same payment flow as global Blizzard. Buy time through the official site, the Battle.net app, or the in game store (bottom left button on the login screen). The site auto translates in most browsers.

Official prices, approximate:

| Duration | CNY | USD |
| 30 days | 75 | 11 |
| 90 days | 198 | 28 |
| 180 days | 360 | 51 |
| 365 days | 720 | 102 |

Start with 30 days to make sure you are hooked. No pressure.

Paying from outside China. Alipay payment options shows a QR code at checkout, scan with the app on your phone. If you already have an Alipay account, that is the smoothest route (see Alipay setup below). No Alipay? Use a third party top up or bribe a friend with Alipay or WeChat.

Bonus packs worth knowing. The Time Journey Supply Pack (时光启程补给包) is 128 CNY, about 18.5 dollars. It includes 30 days time, four 16 slot bags, a 5 percent XP heirloom ring, and consumables. You must log into your main character after buying to claim it, or it will not deliver. The Time Journey Collector's Annual Pass (时光启程典藏年卡) is 888 CNY, about 125 dollars. It includes 365 days, mounts and a pet, and an instant level 80 boost. The "Time" Server Boost Package is 298 CNY, about 43 dollars. One level 80 boost with epic riding, mounts, ilvl 205 gear, 20 slot bags, and some gold. Only usable on the Titan Reforged "Time" server. WoW tokens are live but there have been issues buying them for in-game gold lately.

## Alipay setup for CN payments

1. Download the official Alipay app from the App Store or Google Play. Not AlipayHK, that is a different system.
2. Register. Sign Up, pick Country or Region, enter phone number, SMS code.
3. Verify identity, required to pay. Me tab, Profile, Identity Information, choose Country or Region and ID type, scan or enter manually. Usually instant, sometimes 1 to 2 days.
4. Link a card. Bank Cards, Visa, MasterCard, and AmEx work. PayPal does not.
5. Pay a CN WoW purchase. Choose the item, under 付款信息 (Payment Info) pick "支付宝扫码" (Alipay QR), usually the second option, then scan the on screen QR with the Alipay app.

## You are in, now what

Grab your addons on the AddOns page. Get on voice with the Voice Comms page. Stuck? Ping in the Discord, someone is almost always around. You can join it here: [TRR Info Center](https://discord.gg/YMzFp2MqWN)
