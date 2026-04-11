---
id: end2end-prisma-schema
aliases: []
tags: []
date: 2026-04-11 18:41
description: This schema represents a secure, end-to-end encrypted chat system with Direct conversations only (1-to-1) Signal-like key management (identity + prekeys) Message delivery tracking Multi-device authentication (refresh tokens)
---

## Overview

This schema represents a **secure, end-to-end encrypted chat system** with:

* Direct conversations only (1-to-1)
* Signal-like key management (identity + prekeys)
* Message delivery tracking
* Multi-device authentication (refresh tokens)

---

# ⚙️ Prisma Configuration

## Generator

```prisma
generator client {
  provider     = "prisma-client"
  output       = "../prisma/generated"
  moduleFormat = "cjs"
}
```

### Explanation

| Field          | Meaning                                      |
| -------------- | -------------------------------------------- |
| `provider`     | Prisma client generator                      |
| `output`       | Custom output directory for generated client |
| `moduleFormat` | Uses CommonJS (`cjs`) instead of ESM         |

### Why this is used

* Allows importing Prisma client from a controlled location
* `cjs` ensures compatibility with Node.js environments (especially NestJS)

---

## Datasource

```prisma
datasource db {
  provider = "postgresql"
}
```

### Explanation

* Defines the database type → PostgreSQL

### Why PostgreSQL

* Strong relational integrity
* Native support for indexes and constraints
* Reliable for transactional systems like chat

---

# 🔢 ENUMS

## MessageType

```prisma
enum MessageType {
  TEXT
  IMAGE
  FILE
}
```

### Purpose

Defines the type of message content.

### Why ENUM
 

* Prevents invalid values
* Better than strings (no typos)
* Optimized storage internally

---

## MessageStatus

```prisma
enum MessageStatus {
  SENT
  DELIVERED
  SEEN
}
```

### Purpose

Tracks message lifecycle.

### Flow

```
SENT → DELIVERED → SEEN
```

### Why needed

* Enables read receipts
* Helps UI show message state
* Supports real-time updates

---

# 👤 USER MODEL

```prisma
model User {
  id String @id @default(uuid())
```

### `@id`

* Primary key

### `@default(uuid())`

* Automatically generates unique IDs

---

### Fields

```prisma
displayName  String
uniqueUserId String @unique
```

* `uniqueUserId`: username-like identifier
* `@unique`: ensures no duplicates

---

```prisma
recoveryKeyFingerprint String @unique
recoveryKeyHash        String
```

### Purpose

* Used for **account recovery**
* Fingerprint is public identifier
* Hash is securely stored

---

```prisma
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
```

| Field             | Meaning                            |
| ----------------- | ---------------------------------- |
| `@default(now())` | auto timestamp on creation         |
| `@updatedAt`      | auto updates on every modification |

---

### Relations

```prisma
conversations  ConversationMember[]
messages       Message[]
signedPreKeys  UserSignedPreKey[]
oneTimePreKeys UserOneTimePreKey[]
identityKey    UserIdentityKey?
refreshTokens  RefreshToken[]
```

### Why arrays (`[]`)

* Represents **one-to-many relationships**

### Why optional (`?`)

* `identityKey` → only one, may not exist initially

---

# 💬 CONVERSATION MODEL

```prisma
model Conversation {
  id String @id @default(uuid())
```

---

### Direct conversation constraint

```prisma
directConversationKey String @unique
```

### What it is

A **deterministic key for two users**, e.g.:

```
user1_user2 (sorted)
```

### Why needed

* Prevents duplicate conversations
* Ensures 1-to-1 uniqueness

---

### Relations

```prisma
members  ConversationMember[]
messages Message[]
```

---

# 👥 CONVERSATION MEMBER

```prisma
model ConversationMember {
```

### Purpose

Join table for:

```
User ↔ Conversation (Many-to-Many)
```

---

### Fields

```prisma
conversationId String
userId         String
```

Foreign keys linking:

* a user
* a conversation

---

```prisma
joinedAt DateTime @default(now())
```

Tracks when user joined

---

### Relations

```prisma
conversation Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
user         User         @relation(fields: [userId], references: [id], onDelete: Cascade)
```

### `@relation(...)` breakdown

| Part                | Meaning                          |
| ------------------- | -------------------------------- |
| `fields`            | local FK fields                  |
| `references`        | target primary key               |
| `onDelete: Cascade` | auto-delete if parent is deleted |

---

### Composite Unique Constraint

```prisma
@@unique([conversationId, userId])
```

### What it enforces

```
One user can join a conversation only once
```

### Why critical

* Prevents duplicate memberships
* Enables `findUnique` queries
* Guarantees data integrity

---

# ✉️ MESSAGE MODEL

```prisma
model Message {
```

---

### Core fields

```prisma
conversationId String
senderId       String
```

---

```prisma
ciphertext String
```

### Important

* Stores **encrypted message content**
* Server never sees plaintext

---

```prisma
messageType MessageType
status      MessageStatus
```

### Why ENUMs here

* Strict control over message states and types

---

```prisma
protocolVersion String
isPreKeyMessage Boolean
```

### Purpose

* Supports **Signal protocol versioning**
* Handles initial encrypted messages (pre-key)

---

### Timestamps

```prisma
createdAt   DateTime  @default(now())
deliveredAt DateTime?
seenAt      DateTime?
```

### Why optional (`?`)

* Not all messages are delivered/seen immediately

---

### Relations

```prisma
conversation Conversation @relation(...)
sender       User         @relation(...)
```

---

### Indexes

```prisma
@@index([conversationId])
@@index([senderId])
```

### Why indexes

Optimizes queries like:

* "Get messages of a conversation"
* "Get messages sent by user"

---

# 🔐 IDENTITY KEY

```prisma
model UserIdentityKey {
```

### Purpose

* Long-term cryptographic identity

---

```prisma
userId String @unique
```

### Why unique

* Each user has exactly one identity key

---

```prisma
registrationId Int
publicKey      String
```

Used in encryption protocol

---

# 🔑 SIGNED PRE KEYS

```prisma
model UserSignedPreKey {
```

### Purpose

* Medium-term keys for session setup

---

```prisma
isActive Boolean @default(true)
expiresAt DateTime
```

### Why

* Rotate keys securely
* Avoid reuse vulnerabilities

---

```prisma
@@index([userId])
```

### Why

Fast lookup of keys per user

---

# 🔑 ONE-TIME PRE KEYS

```prisma
model UserOneTimePreKey {
```

### Purpose

* Used once for secure session initiation

---

```prisma
isUsed Boolean   @default(false)
usedAt DateTime?
```

### Why

* Prevent reuse (critical for security)

---

# 🔐 REFRESH TOKENS

```prisma
model RefreshToken {
```

### Purpose

* Supports **multi-device authentication**

---

```prisma
tokenHash String
```

### Why hash

* Never store raw tokens (security best practice)

---

```prisma
expiresAt DateTime
revokedAt DateTime?
```

### Why

* Expiration → security
* Revocation → logout support

---

```prisma
@@index([userId])
```

### Why

Quick lookup for user sessions

---

# 🧠 Key Design Principles Used

## 1. Data Integrity

* `@unique`
* `@@unique`
* Foreign keys

## 2. Performance

* Indexes (`@@index`)
* Composite keys

## 3. Security

* Hashed tokens
* Encrypted messages
* Key management models

## 4. Scalability

* Separation of concerns
* Efficient querying patterns

## 5. Real-time readiness

* Message status tracking
* Membership validation
