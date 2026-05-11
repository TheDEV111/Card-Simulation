import { useState, useEffect, useCallback, useRef } from "react";
import { encrypt, decrypt } from "../utils/encryption";

export function useEncryptedStorage(key, defaultValue, cryptoKey) {
  const [value, setValue] = useState(defaultValue);
  const keyRef = useRef(cryptoKey);
  keyRef.current = cryptoKey;

  useEffect(() => {
    if (!cryptoKey) return;
    const raw = localStorage.getItem(key);
    if (!raw) return;
    decrypt(cryptoKey, raw)
      .then((v) => setValue(JSON.parse(v)))
      .catch(() => {});
  }, [key, cryptoKey]);

  const set = useCallback(async (next) => {
    const k = keyRef.current;
    if (!k) return;
    const serialized = JSON.stringify(next);
    const encrypted = await encrypt(k, serialized);
    localStorage.setItem(key, encrypted);
    setValue(next);
  }, [key]);

  const remove = useCallback(() => {
    localStorage.removeItem(key);
    setValue(defaultValue);
  }, [key, defaultValue]);

  return [value, set, remove];
}
