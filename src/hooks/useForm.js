import { useState, useCallback } from "react";

export function useForm(initialValues, validators = {}) {
  const [values,  setValues]  = useState(initialValues);
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setValue = useCallback((field, value) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (validators[field]) {
      const err = validators[field](value);
      setErrors((e) => ({ ...e, [field]: err }));
    }
  }, []);

  const setTouchedField = useCallback((field) => {
    setTouched((t) => ({ ...t, [field]: true }));
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};
    Object.entries(validators).forEach(([field, fn]) => {
      const err = fn(values[field]);
      if (err) newErrors[field] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, []);

  const handleSubmit = useCallback((onSubmit) => async (e) => {
    e?.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try { await onSubmit(values); }
    finally { setSubmitting(false); }
  }, [values, validate]);

  return { values, errors, touched, submitting, setValue, setTouchedField, validate, reset, handleSubmit };
}
