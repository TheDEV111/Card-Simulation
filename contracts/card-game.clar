;; card-game.clar
;; 1-of-3 card game. Players stake STX and pick a card (1, 2, or 3).
;; Winners receive 2x their stake; losers forfeit to the contract.

;; --- constants ---

(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_INVALID_CARD (err u100))
(define-constant ERR_STAKE_TOO_LOW (err u101))
(define-constant ERR_STAKE_TOO_HIGH (err u102))
(define-constant ERR_COOLDOWN_ACTIVE (err u103))
(define-constant ERR_INSUFFICIENT_BALANCE (err u104))

(define-constant MIN_STAKE u1000)
(define-constant MAX_STAKE u1000000)
;; Minimum blocks between plays per address (anti-spam)
(define-constant COOLDOWN_BLOCKS u2)

;; --- storage ---

(define-map last-play-block principal uint)

;; --- read-only helpers ---

(define-read-only (get-balance)
  (stx-get-balance (as-contract tx-sender)))

(define-read-only (get-last-play (player principal))
  (default-to u0 (map-get? last-play-block player)))

;; Pseudo-random card draw (1-3) seeded by block VRF + salt.
;; Not cryptographically secure; sufficient for a demo.
(define-read-only (pseudo-random-card (salt uint))
  (let (
    (vrf (unwrap-panic (get-block-info? vrf-seed (- block-height u1))))
    (mixed (xor (buff-to-uint-le (unwrap-panic (slice? vrf u0 u16))) salt))
  )
  (+ u1 (mod mixed u3))))

;; --- public functions ---

(define-public (play (card uint) (stake uint))
  (let (
    (player tx-sender)
    (last-block (get-last-play player))
    (contract-card (pseudo-random-card (+ stake card)))
    (is-win (is-eq card contract-card))
    (payout (* stake u2))
  )
    ;; validate card
    (asserts! (and (>= card u1) (<= card u3)) ERR_INVALID_CARD)
    ;; validate stake
    (asserts! (>= stake MIN_STAKE) ERR_STAKE_TOO_LOW)
    (asserts! (<= stake MAX_STAKE) ERR_STAKE_TOO_HIGH)
    ;; enforce cooldown
    (asserts!
      (or (is-eq last-block u0)
          (>= block-height (+ last-block COOLDOWN_BLOCKS)))
      ERR_COOLDOWN_ACTIVE)

    ;; accept stake from player
    (try! (stx-transfer? stake player (as-contract tx-sender)))

    ;; record play block
    (map-set last-play-block player block-height)

    ;; pay out or retain
    (if is-win
      (begin
        (asserts! (>= (stx-get-balance (as-contract tx-sender)) payout) ERR_INSUFFICIENT_BALANCE)
        (try! (as-contract (stx-transfer? payout tx-sender player)))
        (ok { outcome: "win", card: card, contract-card: contract-card, payout: payout }))
      (ok { outcome: "loss", card: card, contract-card: contract-card, payout: u0 }))))

;; Owner withdraws accumulated house funds
(define-public (withdraw (amount uint))
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) (err u403))
    (as-contract (stx-transfer? amount tx-sender CONTRACT_OWNER))))
