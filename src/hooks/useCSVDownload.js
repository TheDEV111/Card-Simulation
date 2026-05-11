import { useCallback } from "react";
import { downloadCSV } from "../utils/csv";

export function useCSVDownload(filename, getData) {
  return useCallback(() => {
    const { rows, headers } = typeof getData === "function"
      ? getData()
      : { rows: getData, headers: undefined };
    downloadCSV(filename, rows, headers);
  }, [filename, getData]);
}
