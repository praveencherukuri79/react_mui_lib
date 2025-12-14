import { useState, useCallback, useMemo, FormEvent } from 'react'
import { z, ZodSchema, ZodIssue } from 'zod'

// =============================================================================
// TYPES
// =============================================================================

export interface UseFormOptions<T extends Record<string, unknown>> {
  initialValues: T
  validationSchema?: ZodSchema<T>
  onSubmit?: (values: T) => void | Promise<void>
}

export interface FieldProps<V> {
  value: V
  error: string
  touched: boolean
  onChange: (value: V, isValid: boolean) => void
  onBlur: () => void
}

// =============================================================================
// HOOK
// =============================================================================

/**
 * Form state management with Zod validation.
 * 
 * @example
 * const { values, getFieldProps, handleSubmit } = useForm({
 *   initialValues: { email: '', password: '' },
 *   validationSchema: z.object({
 *     email: z.string().email(),
 *     password: z.string().min(8),
 *   }),
 *   onSubmit: async (values) => { await login(values) }
 * })
 */
export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validate single field
  const validateField = useCallback((name: keyof T, value: unknown): string => {
    if (!validationSchema) return ''
    try {
      validationSchema.parse({ ...values, [name]: value })
      return ''
    } catch (e) {
      if (e instanceof z.ZodError) {
        const err = e.errors.find((err: ZodIssue) => err.path[0] === name)
        return err?.message || ''
      }
      return ''
    }
  }, [validationSchema, values])

  // Validate all fields
  const validateAll = useCallback((): boolean => {
    if (!validationSchema) return true
    try {
      validationSchema.parse(values)
      setErrors({})
      return true
    } catch (e) {
      if (e instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof T, string>> = {}
        e.errors.forEach((err: ZodIssue) => {
          const field = err.path[0] as keyof T
          if (!newErrors[field]) newErrors[field] = err.message
        })
        setErrors(newErrors)
        // Touch all fields
        const allTouched: Partial<Record<keyof T, boolean>> = {}
        Object.keys(values).forEach((k) => { allTouched[k as keyof T] = true })
        setTouched(allTouched)
      }
      return false
    }
  }, [validationSchema, values])

  // Set field value
  const setFieldValue = useCallback((name: keyof T, value: T[keyof T]) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }, [validateField])

  // Set field touched
  const setFieldTouched = useCallback((name: keyof T, isTouched = true) => {
    setTouched((prev) => ({ ...prev, [name]: isTouched }))
  }, [])

  // Get props to spread onto FormControl
  const getFieldProps = useCallback(<K extends keyof T>(name: K): FieldProps<T[K]> => ({
    value: values[name],
    error: touched[name] ? (errors[name] || '') : '',
    touched: touched[name] || false,
    onChange: (value: T[K]) => setFieldValue(name, value),
    onBlur: () => setFieldTouched(name, true),
  }), [values, errors, touched, setFieldValue, setFieldTouched])

  // Submit handler
  const handleSubmit = useCallback(async (e?: FormEvent) => {
    e?.preventDefault()
    if (!validateAll()) return
    setIsSubmitting(true)
    try {
      await onSubmit?.(values)
    } finally {
      setIsSubmitting(false)
    }
  }, [validateAll, onSubmit, values])

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  // Computed
  const isValid = useMemo(() => Object.values(errors).every((e) => !e), [errors])
  const isDirty = useMemo(() => JSON.stringify(values) !== JSON.stringify(initialValues), [values, initialValues])

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
