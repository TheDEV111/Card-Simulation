export function formatUSD(value, { decimals = 2, compact = false } = {}) {
  if (compact) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatSTX(microStx, { decimals = 6 } = {}) {
  const stx = Number(microStx) / 1_000_000;
  return stx.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function microToSTX(microStx) {
  return Number(microStx) / 1_000_000;
}

export function stxToMicro(stx) {
  return BigInt(Math.round(Number(stx) * 1_000_000));
}

export function formatCrypto(value, symbol = "STX", decimals = 4) {
  const formatted = Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
  return `${formatted} ${symbol}`;
}

export function parseCurrencyInput(str) {
  return parseFloat(str.replace(/[^0-9.-]/g, "")) || 0;
}
