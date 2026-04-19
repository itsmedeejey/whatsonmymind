---
id: libsignal
date: 2026-04-20 01:52
description:
tags: []
aliases: []
updated: 2026-04-20 01:52
---


 codex found a bug in the libsignal-typescript port i was using for my end2end messsaging platform project for last 2 days i have been refactoring the library and finaly it finished today 

# what i have added --
- [x] Deferred state mutation until after authentication
- Moved saveIdentity, removePreKey, and storeSession out of processV3
- so state changes happen only after successful decrypt (MAC verified)

- [x] Prevented TOFU poisoning
- Identity is no longer saved from unauthenticated PreKey messages
- Blocks attackers from pinning arbitrary identity keys

- [x] Prevented OPK (One-Time PreKey) consumption attack
- OPKs are now removed only after successful decrypt
- Stops attackers from burning OPKs with malformed messages

- [x] Removed duplicate OPK deletion path
- Eliminated double removePreKey() call
- Prevents unintended key exhaustion
