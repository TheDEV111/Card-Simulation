;; stx-bouncer.clar
;; Drip faucet + tip passthrough for generating on-chain activity.

(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_LOW_BALANCE (err u100))
(define-constant ERR_NOT_OWNER   (err u101))
(define-constant ERR_ZERO_AMOUNT (err u102))
(define-constant DRIP_AMOUNT     u3000) ;; 0.003 STX - just above 0.002 STX fee

;; --- read-only ---

(define-read-only (get-balance)
  (stx-get-balance (as-contract tx-sender)))

;; --- public ---

;; Bootstrap: contract pays caller DRIP_AMOUNT uSTX
(define-public (drip)
  (let ((caller tx-sender))
    (asserts! (>= (stx-get-balance (as-contract tx-sender)) DRIP_AMOUNT) ERR_LOW_BALANCE)
    (as-contract (stx-transfer? DRIP_AMOUNT tx-sender caller))))

;; Tip: routes amount from caller through contract to recipient
;; Creates a 3-party on-chain flow: caller -> contract -> recipient
(define-public (tip (recipient principal) (amount uint))
  (let ((caller tx-sender))
    (asserts! (> amount u0) ERR_ZERO_AMOUNT)
    (try! (stx-transfer? amount caller (as-contract tx-sender)))
    (as-contract (stx-transfer? amount tx-sender recipient))))

;; Fund: owner tops up contract balance
(define-public (fund (amount uint))
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_NOT_OWNER)
    (stx-transfer? amount tx-sender (as-contract tx-sender))))
