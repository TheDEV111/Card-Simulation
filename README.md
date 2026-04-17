# Stacks Card Game

A single-page web app where players stake STX and pick a card. A Clarity smart contract determines the outcome pseudo-randomly. Winners receive 2× their stake; losers forfeit to the contract.

**Live contract:** [`SP24BDDZQHPNM6CMH2NVXSGZHD1M0S3ZE1NSQ68EX.card-game`](https://explorer.hiro.so/txid/939026d44e8e8913dce31a099aa099b2e4184c2d766f77aad7667418c1ea405a?chain=mainnet)

---

## How it works

1. Connect your Stacks wallet (Leather / Xverse)
2. Pick a card — Spades, Hearts, or Diamonds
3. Enter a stake between 0.001 and 1 STX
4. Click **Play** and confirm the transaction
5. The contract draws a pseudo-random card using the block VRF seed
6. Match → 2× payout sent back instantly. No match → stake goes to the house

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Wallet | @stacks/connect |
| Contract calls | @stacks/transactions |
| Smart contract | Clarity 2 on Stacks mainnet |
| Deployment | Vercel |

---

## Local development

```bash
cp .env.example .env
# fill in VITE_CONTRACT_ADDRESS

npm install
npm run dev
```

---

## Smart contract

The contract lives in [`contracts/card-game.clar`](contracts/card-game.clar).

| Function | Description |
|---|---|
| `(play card stake)` | Pick a card (1–3) and stake µSTX |
| `(withdraw amount)` | Owner-only: pull house funds |
| `(get-balance)` | Read contract STX balance |
| `(get-last-play principal)` | Read last play block for an address |

**Constraints**
- Min stake: 0.001 STX (1,000 µSTX)
- Max stake: 1 STX (1,000,000 µSTX)
- Cooldown: 2 blocks between plays per address

---

## Simulation script

Sends 50 transactions against the deployed contract for load testing.

```bash
cd scripts
npm install
CONTRACT_ADDRESS=SP24BDDZQHPNM6CMH2NVXSGZHD1M0S3ZE1NSQ68EX \
PRIVATE_KEYS=key1,key2 \
node simulate.js
```

---

## Deployment

### Contract (Clarinet)
```bash
clarinet deployments generate --mainnet --low-cost
clarinet deployments apply --mainnet --no-dashboard
```

### Frontend (Vercel)
```bash
vercel --prod
```
