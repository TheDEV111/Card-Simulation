import { useState, useCallback } from "react";
import { deferred } from "../utils/promise";

export function useConfirm() {
  const [state, setState] = useState({ open: false, props: {} });
  const pendingRef = { current: null };

  const confirm = useCallback((props = {}) => {
    const d = deferred();
    pendingRef.current = d;
    setState({ open: true, props });
    return d.promise;
  }, []);

  const handleConfirm = useCallback(() => {
    setState({ open: false, props: {} });
    pendingRef.current?.resolve(true);
  }, []);

  const handleCancel = useCallback(() => {
    setState({ open: false, props: {} });
    pendingRef.current?.resolve(false);
  }, []);

  return {
    confirm,
    dialogProps: {
      open: state.open,
      ...state.props,
      onConfirm: handleConfirm,
      onCancel: handleCancel,
    },
  };
}
