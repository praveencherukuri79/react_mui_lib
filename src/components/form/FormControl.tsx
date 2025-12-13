import { useState, useCallback, useEffect, ReactNode } from 'react'
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

// ============================================
// FORM CONTROL TYPES
// ============================================
export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'switch'
  | 'radio'
  | 'slider'
  | 'date'
  | 'autocomplete'

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

export interface FieldConfig<T = unknown> {
  name: string
  type: FieldType
  label: string
  placeholder?: string
  defaultValue?: T
  required?: boolean
  disabled?: boolean
  helperText?: string
  
  // Validation
  schema?: ZodSchema<T>
  
  // Select/Radio options
  options?: SelectOption[]
  
  // Slider config
  min?: number
  max?: number
  step?: number
  marks?: boolean | { value: number; label: string }[]
  
  // Textarea config
  rows?: number
  maxRows?: number
  
  // Autocomplete config
  freeSolo?: boolean
  multiple?: boolean
  
  // Custom rendering
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  
  // Full width
  fullWidth?: boolean
  
  // Size
  size?: 'small' | 'medium'
}

export interface FormControlProps<T = unknown> {
  config: FieldConfig<T>
  value?: T
  onChange?: (value: T, isValid: boolean) => void
  onBlur?: () => void
  error?: string
  touched?: boolean
}

// ============================================
// FORM CONTROL COMPONENT
// ============================================
export function FormControl<T = unknown>({
  config,
  value,
  onChange,
  onBlur,
  error: externalError,
  touched = false,
}: FormControlProps<T>) {
  const [internalValue, setInternalValue] = useState<T | undefined>(
    value ?? config.defaultValue
  )
  const [internalError, setInternalError] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
  const [isTouched, setIsTouched] = useState(touched)

  const currentValue = value !== undefined ? value : internalValue
  const currentError = externalError ?? (isTouched ? internalError : '')

  // Validate value against schema
  const validate = useCallback(
    (val: T): boolean => {
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
    },
    [config.schema]
  )

  // Handle value change
  const handleChange = useCallback(
    (newValue: T) => {
      setInternalValue(newValue)
      const isValid = validate(newValue)
      onChange?.(newValue, isValid)
    },
    [onChange, validate]
  )

  // Handle blur
  const handleBlur = useCallback(() => {
    setIsTouched(true)
    if (currentValue !== undefined) {
      validate(currentValue as T)
    }
    onBlur?.()
  }, [currentValue, validate, onBlur])

  // Sync external value
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value)
    }
  }, [value])

  const commonProps = {
    fullWidth: config.fullWidth ?? true,
    size: config.size ?? 'medium' as const,
    disabled: config.disabled,
    error: !!currentError,
    onBlur: handleBlur,
  }

  // Render based on field type
  switch (config.type) {
    case 'text':
    case 'email':
    case 'number':
      return (
        <TextField
          {...commonProps}
          type={config.type}
          label={config.label}
          placeholder={config.placeholder}
          value={currentValue ?? ''}
          onChange={(e) =>
            handleChange(
              (config.type === 'number'
                ? Number(e.target.value)
                : e.target.value) as T
            )
          }
          helperText={currentError || config.helperText}
          required={config.required}
          InputProps={{
            startAdornment: config.startAdornment ? (
              <InputAdornment position="start">
                {config.startAdornment}
              </InputAdornment>
            ) : undefined,
            endAdornment: config.endAdornment ? (
              <InputAdornment position="end">
                {config.endAdornment}
              </InputAdornment>
            ) : undefined,
          }}
        />
      )

    case 'password':
      return (
        <TextField
          {...commonProps}
          type={showPassword ? 'text' : 'password'}
          label={config.label}
          placeholder={config.placeholder}
          value={currentValue ?? ''}
          onChange={(e) => handleChange(e.target.value as T)}
          helperText={currentError || config.helperText}
          required={config.required}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )

    case 'textarea':
      return (
        <TextField
          {...commonProps}
          multiline
          rows={config.rows ?? 4}
          maxRows={config.maxRows}
          label={config.label}
          placeholder={config.placeholder}
          value={currentValue ?? ''}
          onChange={(e) => handleChange(e.target.value as T)}
          helperText={currentError || config.helperText}
          required={config.required}
        />
      )

    case 'select':
      return (
        <MuiFormControl {...commonProps} required={config.required}>
          <InputLabel>{config.label}</InputLabel>
          <Select
            value={currentValue ?? ''}
            label={config.label}
            onChange={(e) => handleChange(e.target.value as T)}
          >
            {config.options?.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {(currentError || config.helperText) && (
            <FormHelperText error={!!currentError}>
              {currentError || config.helperText}
            </FormHelperText>
          )}
        </MuiFormControl>
      )

    case 'multiselect':
      return (
        <MuiFormControl {...commonProps} required={config.required}>
          <InputLabel>{config.label}</InputLabel>
          <Select
            multiple
            value={(currentValue as string[]) ?? []}
            label={config.label}
            onChange={(e) => handleChange(e.target.value as T)}
          >
            {config.options?.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {(currentError || config.helperText) && (
            <FormHelperText error={!!currentError}>
              {currentError || config.helperText}
            </FormHelperText>
          )}
        </MuiFormControl>
      )

    case 'checkbox':
      return (
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={!!currentValue}
                onChange={(e) => handleChange(e.target.checked as T)}
                disabled={config.disabled}
              />
            }
            label={config.label}
          />
          {(currentError || config.helperText) && (
            <FormHelperText error={!!currentError}>
              {currentError || config.helperText}
            </FormHelperText>
          )}
        </Box>
      )

    case 'switch':
      return (
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={!!currentValue}
                onChange={(e) => handleChange(e.target.checked as T)}
                disabled={config.disabled}
              />
            }
            label={config.label}
          />
          {(currentError || config.helperText) && (
            <FormHelperText error={!!currentError}>
              {currentError || config.helperText}
            </FormHelperText>
          )}
        </Box>
      )

    case 'radio':
      return (
        <MuiFormControl {...commonProps} required={config.required}>
          <Box component="legend" sx={{ mb: 1, fontWeight: 500 }}>
            {config.label}
          </Box>
          <RadioGroup
            value={currentValue ?? ''}
            onChange={(e) => handleChange(e.target.value as T)}
          >
            {config.options?.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
                disabled={option.disabled || config.disabled}
              />
            ))}
          </RadioGroup>
          {(currentError || config.helperText) && (
            <FormHelperText error={!!currentError}>
              {currentError || config.helperText}
            </FormHelperText>
          )}
        </MuiFormControl>
      )

    case 'slider':
      return (
        <Box sx={{ px: 1 }}>
          <Box component="label" sx={{ mb: 2, display: 'block', fontWeight: 500 }}>
            {config.label}: {String(currentValue ?? '')}
          </Box>
          <Slider
            value={(currentValue as number) ?? config.min ?? 0}
            onChange={(_, newValue) => handleChange(newValue as T)}
            min={config.min ?? 0}
            max={config.max ?? 100}
            step={config.step ?? 1}
            marks={config.marks}
            disabled={config.disabled}
            valueLabelDisplay="auto"
          />
          {(currentError || config.helperText) && (
            <FormHelperText error={!!currentError}>
              {currentError || config.helperText}
            </FormHelperText>
          )}
        </Box>
      )

    case 'date':
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={config.label}
            value={currentValue ? dayjs(currentValue as string) : null}
            onChange={(newValue: Dayjs | null) =>
              handleChange((newValue?.toISOString() ?? '') as T)
            }
            disabled={config.disabled}
            slotProps={{
              textField: {
                ...commonProps,
                helperText: currentError || config.helperText,
                required: config.required,
              },
            }}
          />
        </LocalizationProvider>
      )

    case 'autocomplete':
      return (
        <Autocomplete
          {...commonProps}
          options={config.options ?? []}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : (option as SelectOption).label
          }
          value={(currentValue as SelectOption | string | null) ?? null}
          onChange={(_, newValue) => handleChange(newValue as T)}
          freeSolo={config.freeSolo}
          multiple={config.multiple}
          renderInput={(params) => (
            <TextField
              {...params}
              label={config.label}
              placeholder={config.placeholder}
              error={!!currentError}
              helperText={currentError || config.helperText}
              required={config.required}
            />
          )}
        />
      )

    default:
      return null
  }
}

// ============================================
// PRE-BUILT VALIDATION SCHEMAS
// ============================================
export const ValidationSchemas = {
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  required: z.string().min(1, 'This field is required'),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Please enter a valid phone number'),
  url: z.string().url('Please enter a valid URL'),
  number: z.number().finite('Please enter a valid number'),
  positiveNumber: z.number().positive('Please enter a positive number'),
  date: z.string().datetime('Please enter a valid date'),
}

