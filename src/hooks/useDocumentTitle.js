import { useEffect } from "react";

export function useDocumentTitle(title, restoreOnUnmount = true) {
  const original = document.title;

  useEffect(() => {
    document.title = title;
    return () => {
      if (restoreOnUnmount) document.title = original;
    };
  }, [title]); // eslint-disable-line react-hooks/exhaustive-deps
}
