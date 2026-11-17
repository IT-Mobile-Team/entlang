# ENT-26: Write the tech stack ADR

Ticket: https://linear.app/it-mobile-team/issue/ENT-26 · PR: #<pr> · Date: 2026-11-17
Builds on: ENT-11, ENT-12, ENT-13, ENT-17, ENT-20, ENT-21, ENT-23, Nov 10 meeting

## Goal

Record our main technical decisions in one place, for the team and for the professors on Nov 19.

> 🔴 = not written down in Linear or the repo yet. Must be asked before merge.

## Decisions

### 1. App: React Native, Expo, TypeScript

- **Context:** The app must run on iOS and Android. 
🔴 **TO ASK (Daniel): Why React Native, Expo and TypeScript? Which alternatives were considered?**
- **Decision:** React Native with Expo (SDK 58) and TypeScript in `apps/mobile` (ENT-17).
- **Consequences:** Expo packages must match the SDK version. `npm run doctor` checks this (ENT-17, `apps/mobile/README.md`).

### 2. UI library, icons, styling

- **Context:** This was left open in the Nov 10 meeting (Expo UI? Lucide? Tailwind?).
 🔴 **TO ASK (Daniel): Why Uniwind and Tailwind CSS?**
- **Decision:** Styling uses the free, MIT-licensed Uniwind package with Tailwind CSS v4, without paid dependencies (ENT-17, PR #5). UI library and icon set are still open (see Open points).
- **Consequences:** Screens are styled with Tailwind classes in `className`. Class names must be complete strings, so Tailwind can detect them (`apps/mobile/README.md`, PR #5).

### 3. API: NestJS · Database: PostgreSQL + Prisma

- **Context:** Users have accounts on our own backend (Nov 10 meeting). Prisma follows the proven structure of an earlier project (RevMatchMarket) and matches the ESM setup (ENT-21). 
🔴 **TO ASK (Csongor): Why NestJS and PostgreSQL? Which alternatives were considered?**
- **Decision:** NestJS with TypeScript in `apps/api` (ENT-13). PostgreSQL with Prisma ORM 7 (ENT-21).
- **Consequences:** Endpoints are documented through Swagger at `/api` (Linear doc "How to use Docs directory"). The first database migration is created only after the data model is agreed in ENT-25 (ENT-21).

### 4. Auth: our own JWT, no auth provider

- **Context:** Walk history is stored on the server, so users need accounts (Nov 10 meeting). httpOnly cookies protect against XSS in a browser, which does not apply to a native app, and cookie-based authentication is documented as unreliable in React Native (ENT-20). 
🔴 **TO ASK (Csongor): Why our own JWT instead of an auth provider?**
- **Decision:** Our own JWT login in the API. The app sends the token as a bearer token, not as a cookie (ENT-20).
- **Consequences:** The app stores the token securely on the device (ENT-28). Token lifetime is agreed in ENT-25.

### 5. Map and routing: OpenStreetMap-based, self-hosted routing

- **Context:** Mapbox was rejected because of cost and lock-in (Nov 10 meeting).
- **Decision:** Maps and routing are based on OpenStreetMap data, with a self-hosted routing engine. Map library and routing engine are still open (see Open points).
- **Consequences:** The routing engine must be able to generate a loop from a target distance (ENT-23). The public OpenStreetMap tiles are not meant for production app use (ENT-23).

### 6. Hosting · CI: GitHub Actions

- **Context:** The server must be online by Dec 17, within the budget from ENT-22 (ENT-23). API and PostgreSQL already run in Docker Compose (`infrastructure/`). 
🔴 **TO ASK (Jakob): Why GitHub Actions?**
- **Decision:** CI runs on GitHub Actions (`.github/workflows/ci.yml`). Hosting is still open (see Open points).
- **Consequences:** CI currently checks only the API (`.github/workflows/ci.yml`). A mobile job is added in ENT-27.

## Final scope

This document. The decisions above are recorded as decided in the linked tickets and meetings.

## Verification

- Every decision links to the ticket or meeting it comes from.
- Reviewed by: <frontend person>, <backend person>

## Open points

| Open decision | Owner | Ticket |
| --- | --- | --- |
| UI component library | 🔴 **TO ASK: who decides?** | – |
| Icon set | Melanie | ENT-24 |
| Map library | Sander | ENT-11 |
| Routing engine | Jakob | ENT-12 |
| Hosting | 🔴 **TO ASK: no owner yet** | ENT-23 |

## Contributors

- Ali Pilehvari (research, draft), Claude Opus 5.5 (research, draft)