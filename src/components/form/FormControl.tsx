import { useState, useCallback, useEffect } from 'react'
import {
  TextField,
  Select,
  MenuItem,
  FormControl as MuiFormControl,
  FormHelperText,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Switch,
  Radio,
  RadioGroup,
  Slider,
  Autocomplete,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { z, ZodSchema } from 'zod'
import dayjs, { Dayjs } from 'dayjs'

// =============================================================================
// TYPES
// =============================================================================

export type FieldType =
  | 'text' | 'email' | 'password' | 'number' | 'textarea'
  | 'select' | 'multiselect' | 'checkbox' | 'switch' | 'radio'
  | 'slider' | 'date' | 'autocomplete'

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

// Using 'any' for value type to keep the API simple
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FieldConfig<T = any> {
  name: string
  type: FieldType
  label: string
  placeholder?: string
  defaultValue?: T
  required?: boolean
  disabled?: boolean
  helperText?: string
  fullWidth?: boolean
  size?: 'small' | 'medium'

  // Validation
  schema?: ZodSchema

  // Options for select/radio/autocomplete
  options?: SelectOption[]

  // Slider
  min?: number
  max?: number
  step?: number
  marks?: boolean | { value: number; label: string }[]

  // Textarea
  rows?: number
  maxRows?: number

  // Autocomplete
  freeSolo?: boolean
  multiple?: boolean

  // Adornments
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FormControlProps<T = any> {
  config: FieldConfig<T>
  value?: T
  onChange?: (value: T, isValid: boolean) => void
  onBlur?: () => void
  error?: string
  touched?: boolean
}

// =============================================================================
// COMPONENT
// =============================================================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FormControl<T = any>({
  config,
  value,
  onChange,
  onBlur,
  error: externalError,
  touched = false,
}: FormControlProps<T>) {
  const [internalValue, setInternalValue] = useState<T | undefined>(value ?? config.defaultValue)
  const [internalError, setInternalError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isTouched, setIsTouched] = useState(touched)

  const currentValue = value ?? internalValue
  const currentError = externalError ?? (isTouched ? internalError : '')

  // Validate against Zod schema
  const validate = useCallback((val: T): boolean => {
    if (!config.schema) return true
    try {
      config.schema.parse(val)
      setInternalError('')
      return true
    } catch (e) {
      if (e instanceof z.ZodError) {
        setInternalError(e.errors[0]?.message || 'Invalid value')
      }
      return false
    }
  }, [config.schema])

  const handleChange = useCallback((newValue: T) => {
    setInternalValue(newValue)
    const isValid = validate(newValue)
    onChange?.(newValue, isValid)
  }, [onChange, validate])

  const handleBlur = useCallback(() => {
    setIsTouched(true)
    if (currentValue !== undefined) validate(currentValue)
    onBlur?.()
  }, [currentValue, validate, onBlur])

  useEffect(() => {
    if (value !== undefined) setInternalValue(value)
  }, [value])

  // Common props for most inputs
  const baseProps = {
    fullWidth: config.fullWidth ?? true,
    size: config.size ?? ('medium' as const),
    disabled: config.disabled,
    error: !!currentError,
    onBlur: handleBlur,
  }

  const helperText = currentError || config.helperText

  // =========================================================================
  // RENDER BY TYPE
  // =========================================================================

  switch (config.type) {
    // -----------------------------------------------------------------------
    // Text inputs
    // -----------------------------------------------------------------------
    case 'text':
    case 'email':
    case 'number':
      return (
        <TextField
          {...baseProps}
          type={config.type}
          label={config.label}
          placeholder={config.placeholder}
          value={currentValue ?? ''}
          onChange={(e) => handleChange((config.type === 'number' ? Number(e.target.value) : e.target.value) as T)}
          helperText={helperText}
          required={config.required}
          slotProps={{
            input: {
              startAdornment: config.startAdornment && <InputAdornment position="start">{config.startAdornment}</InputAdornment>,
              endAdornment: config.endAdornment && <InputAdornment position="end">{config.endAdornment}</InputAdornment>,
            },
          }}
        />
      )

    case 'password':
      return (
        <TextField
          {...baseProps}
          type={showPassword ? 'text' : 'password'}
          label={config.label}
          placeholder={config.placeholder}
          value={currentValue ?? ''}
          onChange={(e) => handleChange(e.target.value as T)}
          helperText={helperText}
          required={config.required}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      )

    case 'textarea':
      return (
        <TextField
          {...baseProps}
          multiline
          rows={config.rows ?? 4}
          maxRows={config.maxRows}
          label={config.label}
          placeholder={config.placeholder}
          value={currentValue ?? ''}
          onChange={(e) => handleChange(e.target.value as T)}
          helperText={helperText}
          required={config.required}
        />
      )

    // -----------------------------------------------------------------------
    // Select inputs
    // -----------------------------------------------------------------------
    case 'select':
    case 'multiselect':
      return (
        <MuiFormControl {...baseProps} required={config.required}>
          <InputLabel>{config.label}</InputLabel>
          <Select
            multiple={config.type === 'multiselect'}
            value={currentValue ?? (config.type === 'multiselect' ? [] : '')}
            label={config.label}
            onChange={(e) => handleChange(e.target.value as T)}
          >
            {config.options?.map((opt) => (
              <MenuItem key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
          {helperText && <FormHelperText error={!!currentError}>{helperText}</FormHelperText>}
        </MuiFormControl>
      )

    // -----------------------------------------------------------------------
    // Toggle inputs
    // -----------------------------------------------------------------------
    case 'checkbox':
      return (
        <Box>
          <FormControlLabel
            control={<Checkbox checked={!!currentValue} onChange={(e) => handleChange(e.target.checked as T)} disabled={config.disabled} />}
            label={config.label}
          />
          {helperText && <FormHelperText error={!!currentError}>{helperText}</FormHelperText>}
        </Box>
      )

    case 'switch':
      return (
        <Box>
          <FormControlLabel
            control={<Switch checked={!!currentValue} onChange={(e) => handleChange(e.target.checked as T)} disabled={config.disabled} />}
            label={config.label}
          />
          {helperText && <FormHelperText error={!!currentError}>{helperText}</FormHelperText>}
        </Box>
      )

    case 'radio':
      return (
        <MuiFormControl {...baseProps} required={config.required}>
          <Box component="legend" sx={{ mb: 1, fontWeight: 500 }}>{config.label}</Box>
          <RadioGroup value={currentValue ?? ''} onChange={(e) => handleChange(e.target.value as T)}>
            {config.options?.map((opt) => (
              <FormControlLabel key={opt.value} value={opt.value} control={<Radio />} label={opt.label} disabled={opt.disabled || config.disabled} />
            ))}
          </RadioGroup>
          {helperText && <FormHelperText error={!!currentError}>{helperText}</FormHelperText>}
        </MuiFormControl>
      )

    // -----------------------------------------------------------------------
    // Slider
    // -----------------------------------------------------------------------
    case 'slider':
      return (
        <Box sx={{ px: 1 }}>
          <Box component="label" sx={{ mb: 2, display: 'block', fontWeight: 500 }}>
            {config.label}: {String(currentValue ?? '')}
          </Box>
          <Slider
            value={(currentValue as number) ?? config.min ?? 0}
            onChange={(_, val) => handleChange(val as T)}
            min={config.min ?? 0}
            max={config.max ?? 100}
            step={config.step ?? 1}
            marks={config.marks}
            disabled={config.disabled}
            valueLabelDisplay="auto"
          />
          {helperText && <FormHelperText error={!!currentError}>{helperText}</FormHelperText>}
        </Box>
      )

    // -----------------------------------------------------------------------
    // Date picker
    // -----------------------------------------------------------------------
    case 'date':
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={config.label}
            value={currentValue ? dayjs(currentValue as string) : null}
            onChange={(val: Dayjs | null) => handleChange((val?.toISOString() ?? '') as T)}
            disabled={config.disabled}
            slotProps={{
              textField: { ...baseProps, helperText, required: config.required },
            }}
          />
        </LocalizationProvider>
      )

    // -----------------------------------------------------------------------
    // Autocomplete
    // -----------------------------------------------------------------------
    case 'autocomplete':
      return (
        <Autocomplete
          {...baseProps}
          options={config.options ?? []}
          getOptionLabel={(opt) => (typeof opt === 'string' ? opt : (opt as SelectOption).label)}
          value={(currentValue as SelectOption | string | null) ?? null}
          onChange={(_, val) => handleChange(val as T)}
          freeSolo={config.freeSolo}
          multiple={config.multiple}
          renderInput={(params) => (
            <TextField {...params} label={config.label} placeholder={config.placeholder} error={!!currentError} helperText={helperText} required={config.required} />
          )}
        />
      )

    default:
      return null
  }
}

// =============================================================================
// PRE-BUILT VALIDATION SCHEMAS
// =============================================================================

export const ValidationSchemas = {
  email: z.string().email('Please enter a valid email'),
  password: z.string()
    .min(8, 'Min 8 characters')
    .regex(/[A-Z]/, 'Need uppercase')
    .regex(/[a-z]/, 'Need lowercase')
    .regex(/[0-9]/, 'Need number'),
  required: z.string().min(1, 'Required'),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone'),
  url: z.string().url('Invalid URL'),
  number: z.number().finite('Invalid number'),
  positiveNumber: z.number().positive('Must be positive'),
}
