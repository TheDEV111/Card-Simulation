# Stacks Card Game

A provably fair, on-chain card game built on the Stacks blockchain. Players stake STX, pick a card, and a Clarity smart contract resolves the outcome using the block VRF seed — no server, no house manipulation, no trust required.

**Live contract:** [`SPQG93AEB9GACWCPZ92Z6FB440HX1CNP4ADT8S0X.card-game`](https://explorer.hiro.so/txid/939026d44e8e8913dce31a099aa099b2e4184c2d766f77aad7667418c1ea405a?chain=mainnet)

---

## Features

### Gameplay
- **Provably fair** — outcomes resolved entirely on-chain via block VRF seed; no backend, no manipulation
- **Instant payouts** — winners receive 2× their stake in the same transaction resolution
- **Flexible stakes** — play with as little as 0.001 STX or up to 1 STX per round
- **Per-address cooldown** — 2-block cooldown prevents rapid-fire abuse and ensures fair VRF entropy
- **Wallet-native** — integrates with Leather and Xverse; no account creation or email required

### Progressive Web App
The app ships as a fully featured PWA, giving players a native app experience directly from the browser.

| Capability | Detail |
|---|---|
| **Offline support** | Service Worker caches all static assets and game UI; play resumes when connectivity returns |
| **Installable** | Add to Home Screen on iOS (Safari) and Android (Chrome) — no app store required |
| **Background sync** | Queued transactions replay automatically when the device reconnects |
| **Push notifications** | Opt-in alerts for game results and challenges via VAPID push |
| **Wake Lock** | Screen stays on during active gameplay so the session never interrupts |
| **Network-aware** | Polling intervals and prefetch scale automatically with connection speed (4G/3G/2G) |
| **Storage management** | Named cache stores (static, dynamic, API, fonts, images) with quota monitoring and one-tap clear |
| **Battery awareness** | Reduces animations and polling when battery is low; surfaces warnings at 25% and 10% |
| **Persistent storage** | Prompts users to protect game data from browser eviction |
| **Update flow** | New versions detected in the background; players are prompted to reload with zero disruption |

---

## How it works

1. Connect your Stacks wallet (Leather or Xverse)
2. Pick a card — Spades, Hearts, or Diamonds
3. Enter a stake between 0.001 and 1 STX
4. Confirm the transaction in your wallet
5. The Clarity contract draws a card using the block VRF seed
6. **Match** → 2× payout sent back to your address instantly
7. **No match** → stake is held by the contract

Outcomes are deterministic and auditable. Anyone can verify a result by reading the contract state and the block VRF on-chain.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite 5 |
| Styling | Tailwind CSS v3 |
| Wallet integration | @stacks/connect |
| Contract calls | @stacks/transactions |
| Smart contract | Clarity 2 on Stacks mainnet |
| Service Worker | Workbox-free, hand-authored SW with named cache stores |
| PWA manifest | Web App Manifest with shortcuts, screenshots, and themed icons |
| Deployment | Vercel |

---

## PWA architecture

```
public/
  sw.js              — Service Worker: cache-first (fonts/icons), network-first (API), SWR (origin)
  manifest.json      — Web App Manifest: icons, shortcuts, theme colors, display mode

src/pwa/
  config.js          — Centralized cache names, API hosts, and PWA constants
  sw-register.js     — SW registration with updatefound → sw:update-ready event
  sw-utils.js        — isSWSupported, isStandalone, getCacheSize, formatBytes
  sw-messages.js     — MessageChannel bridge for bidirectional SW ↔ app communication
  push-utils.js      — VAPID subscribe/unsubscribe, permission check
  background-sync.js — SyncManager + PeriodicSyncManager registration
  sync-queue.js      — localStorage sync queue with retry tracking
  offline-tx-queue.js— STX transaction queue: queued → pending → broadcast → failed
  cache-manager.js   — LRU cache pruning, warmCache, getCacheSummary
  prefetch.js        — Deduplicated asset prefetch with cache-awareness
  analytics.js       — Lightweight PWA event log (install, update, offline visits)
  diagnostics.js     — Full health check: SW, push, sync, storage, manifest, HTTPS
  share.js           — Web Share API: scores, transactions, challenge links
  network-middleware.js — fetch interceptor that queues failed mutations when offline
  pwa-init.js        — Bootstrap: register SW, prefetch assets, prune caches, wire analytics

src/hooks/           — 30+ React hooks covering every PWA API surface
src/components/pwa/  — 50+ UI components: banners, toasts, panels, drawers, badges
src/context/         — PWARoot provider stacking Network → Install → Update → PWA context
```

### Cache strategy

| Request type | Strategy | TTL |
|---|---|---|
| Fonts | Cache-first | Indefinite |
| App icons / images | Cache-first | Indefinite |
| API calls (Hiro / Stacks node) | Network-first | 30s timeout → cache fallback |
| Origin pages and assets | Stale-while-revalidate | Background refresh |

---

## Smart contract

Source: [`contracts/card-game.clar`](contracts/card-game.clar)

| Function | Visibility | Description |
|---|---|---|
| `(play card stake)` | Public | Pick a card (1–3) and stake µSTX |
| `(withdraw amount)` | Owner only | Withdraw house balance |
| `(get-balance)` | Read-only | Read contract STX balance |
| `(get-last-play principal)` | Read-only | Last play block for an address |

**Constraints**

- Minimum stake: 1,000 µSTX (0.001 STX)
- Maximum stake: 1,000,000 µSTX (1 STX)
- Cooldown: 2 blocks between plays per address
- Randomness source: block VRF seed — not manipulable by miners or players

---

## Local development

```bash
# 1. Clone and install
git clone <repo-url>
cd Card-Simulation
npm install

# 2. Configure environment
cp .env.example .env
# Set VITE_CONTRACT_ADDRESS and VITE_VAPID_PUBLIC_KEY in .env

# 3. Start dev server
npm run dev
```

The Service Worker is registered in development. Use Chrome DevTools → Application → Service Workers to inspect cache stores and simulate offline mode.

---

## Deployment

### Smart contract

```bash
clarinet deployments generate --mainnet --low-cost
clarinet deployments apply --mainnet --no-dashboard
```

### Frontend

```bash
vercel --prod
```

The Vercel deployment serves the app over HTTPS, which is required for Service Worker registration, Push API, and Wake Lock.

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `VITE_CONTRACT_ADDRESS` | Yes | Deployed Clarity contract address |
| `VITE_VAPID_PUBLIC_KEY` | No | VAPID public key for push notifications |
