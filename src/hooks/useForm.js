import { useState, useCallback } from 'react';

// Custom hook for form management with validation
export const useForm = (initialValues = {}, validators = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const setValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const setFieldError = useCallback((name, error) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const validateField = useCallback((name, value) => {
    const validator = validators[name];
    if (!validator) return true;

    const result = validator(value);
    if (result.valid === false) {
      setFieldError(name, result.message);
      return false;
    }
    return true;
  }, [validators, setFieldError]);

  const handleChange = useCallback((name, value) => {
    setValue(name, value);
    if (touched[name]) {
      validateField(name, value);
    }
  }, [setValue, touched, validateField]);

  const handleBlur = useCallback((name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, values[name]);
  }, [validateField, values]);

  const validate = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validators).forEach((name) => {
      const validator = validators[name];
      const value = values[name];
      const result = validator(value);

      if (result.valid === false) {
        newErrors[name] = result.message;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(validators).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );

    return isValid;
  }, [values, validators]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setFormValues = useCallback((newValues) => {
    setValues((prev) => ({ ...prev, ...newValues }));
  }, []);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setValue,
    setFieldError,
    validate,
    reset,
    setFormValues,
  };
};
