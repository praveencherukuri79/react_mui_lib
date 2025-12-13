import React, { useState, useCallback, useMemo } from 'react'
import { z, ZodSchema, ZodIssue } from 'zod'

// ============================================
// FORM HOOK
// ============================================
// A hook for managing form state with validation

export interface FormField<T = unknown> {
  value: T
  error: string
  touched: boolean
  isValid: boolean
}

export interface FormState<T extends Record<string, unknown>> {
  values: T
  errors: Record<keyof T, string>
  touched: Record<keyof T, boolean>
  isValid: boolean
  isDirty: boolean
}

export interface UseFormOptions<T extends Record<string, unknown>> {
  initialValues: T
  validationSchema?: ZodSchema<T>
  onSubmit?: (values: T) => void | Promise<void>
}

export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    {} as Record<keyof T, string>
  )
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    {} as Record<keyof T, boolean>
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validate a single field
  const validateField = useCallback(
    (name: keyof T, value: unknown): string => {
      if (!validationSchema) return ''

      try {
        // Create a partial schema for single field validation
        const partialValues = { ...values, [name]: value }
        validationSchema.parse(partialValues)
        return ''
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldError = error.errors.find(
            (err: ZodIssue) => err.path[0] === name
          )
          return fieldError?.message || ''
        }
        return ''
      }
    },
    [validationSchema, values]
  )

  // Validate all fields
  const validateAll = useCallback((): boolean => {
    if (!validationSchema) return true

    try {
      validationSchema.parse(values)
      setErrors({} as Record<keyof T, string>)
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {} as Record<keyof T, string>
        error.errors.forEach((err: ZodIssue) => {
          const field = err.path[0] as keyof T
          if (!newErrors[field]) {
            newErrors[field] = err.message
          }
        })
        setErrors(newErrors)
        // Mark all fields as touched
        const newTouched = {} as Record<keyof T, boolean>
        Object.keys(values).forEach((key: string) => {
          newTouched[key as keyof T] = true
        })
        setTouched(newTouched)
      }
      return false
    }
  }, [validationSchema, values])

  // Set a field value
  const setFieldValue = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      setValues((prev: T) => ({ ...prev, [name]: value }))
      const error = validateField(name, value)
      setErrors((prev: Record<keyof T, string>) => ({ ...prev, [name]: error }))
    },
    [validateField]
  )

  // Set field touched
  const setFieldTouched = useCallback((name: keyof T, isTouched = true) => {
    setTouched((prev: Record<keyof T, boolean>) => ({ ...prev, [name]: isTouched }))
  }, [])

  // Get field props for binding to inputs
  const getFieldProps = useCallback(
    (name: keyof T) => ({
      value: values[name],
      error: touched[name] ? errors[name] : '',
      touched: touched[name] || false,
      onChange: (value: T[keyof T], isValid: boolean) => {
        setFieldValue(name, value)
        if (!isValid && touched[name]) {
          const fieldError = validateField(name, value)
          setErrors((prev: Record<keyof T, string>) => ({ ...prev, [name]: fieldError }))
        }
      },
      onBlur: () => setFieldTouched(name, true),
    }),
    [values, errors, touched, setFieldValue, setFieldTouched, validateField]
  )

  // Handle form submission
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault()

      if (!validateAll()) return

      setIsSubmitting(true)
      try {
        await onSubmit?.(values)
      } finally {
        setIsSubmitting(false)
      }
    },
    [validateAll, onSubmit, values]
  )

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({} as Record<keyof T, string>)
    setTouched({} as Record<keyof T, boolean>)
  }, [initialValues])

  // Computed state
  const isValid = useMemo(() => {
    return Object.values(errors).every((error) => !error)
  }, [errors])

  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValues)
  }, [values, initialValues])

  return {
    values,
    errors,
    touched,
    isValid,
    isDirty,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    getFieldProps,
    handleSubmit,
    resetForm,
    validateAll,
    setValues,
  }
}

