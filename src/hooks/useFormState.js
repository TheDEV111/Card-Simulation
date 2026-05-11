import { useState, useCallback } from "react";

export function useFormState(initial) {
  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setValue = useCallback((name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
  }, []);

  const setError = useCallback((name, error) => {
    setErrors((e) => ({ ...e, [name]: error }));
  }, []);

  const touch = useCallback((name) => {
    setTouched((t) => ({ ...t, [name]: true }));
  }, []);

  const reset = useCallback(() => {
    setValues(initial);
    setTouched({});
    setErrors({});
    setSubmitting(false);
  }, [initial]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValue(name, type === "checkbox" ? checked : value);
  }, [setValue]);

  const handleBlur = useCallback((e) => {
    touch(e.target.name);
  }, [touch]);

  const isValid = Object.keys(errors).every((k) => !errors[k]);

  return {
    values, errors, touched, submitting,
    setValue, setError, touch, reset, setSubmitting,
    handleChange, handleBlur, isValid,
  };
}
