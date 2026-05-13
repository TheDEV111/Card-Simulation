import { useState, useCallback } from "react";

export function useField(initial = "", { validate } = {}) {
  const [value, setValue] = useState(initial);
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState(false);

  const onChange = useCallback((e) => {
    const v = e.target ? e.target.value : e;
    setValue(v);
    if (touched && validate) setError(validate(v));
  }, [touched, validate]);

  const onBlur = useCallback(() => {
    setTouched(true);
    if (validate) setError(validate(value));
  }, [validate, value]);

  const reset = useCallback(() => {
    setValue(initial);
    setError(null);
    setTouched(false);
  }, [initial]);

  return { value, error: touched ? error : null, touched, onChange, onBlur, reset, setValue };
}
