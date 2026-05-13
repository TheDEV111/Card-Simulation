export function isWebShareSupported() {
  return "share" in navigator;
}

export function isWebShareTargetSupported() {
  return "shareTarget" in navigator || !!window.location.search.includes("share-target");
}

export async function shareContent({ title, text, url } = {}) {
  if (!isWebShareSupported()) throw new Error("Web Share API not supported");
  await navigator.share({ title, text, url });
}

export async function shareScore(score, address) {
  return shareContent({
    title: "Stacks Card Game",
    text: `I just scored ${score} STX on the Stacks Card Game! 🃏`,
    url: `${window.location.origin}/?ref=${address?.slice(0, 8) ?? ""}`,
  });
}

export async function shareTransaction(txid) {
  return shareContent({
    title: "Stacks Transaction",
    text: "Check out my on-chain transaction:",
    url: `https://explorer.hiro.so/txid/${txid}`,
  });
}

export function parseShareTarget() {
  const params = new URLSearchParams(window.location.search);
  if (!params.has("share-target")) return null;
  return {
    title: params.get("title") ?? "",
    text: params.get("text") ?? "",
    url: params.get("url") ?? "",
  };
}
