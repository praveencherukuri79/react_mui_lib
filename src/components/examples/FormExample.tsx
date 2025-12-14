import { useState } from 'react'
import { Box, Typography, Button, Paper, Alert } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { z } from 'zod'
import { FormControl, ValidationSchemas, FieldConfig } from '../form/FormControl'
import { useForm } from '@/hooks/useForm'

// =============================================================================
// LOGIN FORM EXAMPLE
// =============================================================================

export function LoginFormExample() {
  const [result, setResult] = useState('')

  const { getFieldProps, handleSubmit, isSubmitting, resetForm } = useForm({
    initialValues: { email: '', password: '', rememberMe: false },
    validationSchema: z.object({
      email: ValidationSchemas.email,
      password: z.string().min(1, 'Password is required'),
      rememberMe: z.boolean().optional(),
    }),
    onSubmit: async (vals) => {
      await new Promise((r) => setTimeout(r, 1000))
      setResult(`Login successful! Email: ${vals.email}`)
    },
  })

  return (
    <Paper sx={{ p: 4, borderRadius: 3, maxWidth: 400 }}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>Login</Typography>

      {result && <Alert severity="success" sx={{ mb: 3 }}>{result}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <FormControl
          config={{ name: 'email', type: 'email', label: 'Email', schema: ValidationSchemas.email }}
          {...getFieldProps('email')}
        />
        <FormControl
          config={{ name: 'password', type: 'password', label: 'Password', schema: z.string().min(1, 'Required') }}
          {...getFieldProps('password')}
        />
        <FormControl
          config={{ name: 'rememberMe', type: 'checkbox', label: 'Remember me' }}
          {...getFieldProps('rememberMe')}
        />

        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
          <Button variant="outlined" onClick={resetForm}>Reset</Button>
        </Box>
      </Box>
    </Paper>
  )
}

// =============================================================================
// REGISTRATION FORM EXAMPLE
// =============================================================================

export function RegistrationFormExample() {
  const [result, setResult] = useState('')

  const { values, getFieldProps, handleSubmit, isSubmitting } = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      newsletter: true,
    },
    validationSchema: z.object({
      firstName: z.string().min(2, 'Too short'),
      lastName: z.string().min(2, 'Too short'),
      email: ValidationSchemas.email,
      password: ValidationSchemas.password,
      confirmPassword: z.string(),
      role: z.string().min(1, 'Required'),
      newsletter: z.boolean().optional(),
    }).refine((d) => d.password === d.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
    onSubmit: async (vals) => {
      await new Promise((r) => setTimeout(r, 1500))
      setResult(`Welcome, ${vals.firstName}!`)
    },
  })

  const fields: FieldConfig[] = [
    { name: 'firstName', type: 'text', label: 'First Name' },
    { name: 'lastName', type: 'text', label: 'Last Name' },
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'password', type: 'password', label: 'Password', helperText: 'Min 8 chars, upper, lower, number' },
    { name: 'confirmPassword', type: 'password', label: 'Confirm Password' },
    { name: 'role', type: 'select', label: 'Role', options: [
      { value: 'developer', label: 'Developer' },
      { value: 'designer', label: 'Designer' },
      { value: 'manager', label: 'Manager' },
    ]},
    { name: 'newsletter', type: 'switch', label: 'Subscribe to newsletter' },
  ]

  return (
    <Paper sx={{ p: 4, borderRadius: 3, maxWidth: 500 }}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>Create Account</Typography>

      {result && <Alert severity="success" sx={{ mb: 3 }}>{result}</Alert>}

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {fields.map((field) => (
            <Grid key={field.name} size={{ xs: 12, sm: ['firstName', 'lastName'].includes(field.name) ? 6 : 12 }}>
              <FormControl config={field} {...getFieldProps(field.name as keyof typeof values)} />
            </Grid>
          ))}
        </Grid>

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }} disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Account'}
        </Button>
      </Box>
    </Paper>
  )
}

// =============================================================================
// ALL INPUT TYPES DEMO
// =============================================================================

export function AllInputTypesExample() {
  const [values, setValues] = useState<Record<string, unknown>>({})

  const fields: FieldConfig[] = [
    { name: 'text', type: 'text', label: 'Text', placeholder: 'Enter text...' },
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'password', type: 'password', label: 'Password' },
    { name: 'number', type: 'number', label: 'Number', defaultValue: 42 },
    { name: 'textarea', type: 'textarea', label: 'Textarea', rows: 3 },
    { name: 'select', type: 'select', label: 'Select', options: [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
    ]},
    { name: 'multiselect', type: 'multiselect', label: 'Multi-Select', options: [
      { value: 'red', label: 'Red' },
      { value: 'green', label: 'Green' },
      { value: 'blue', label: 'Blue' },
    ]},
    { name: 'checkbox', type: 'checkbox', label: 'Checkbox' },
    { name: 'switch', type: 'switch', label: 'Switch' },
    { name: 'radio', type: 'radio', label: 'Radio', options: [
      { value: 's', label: 'Small' },
      { value: 'm', label: 'Medium' },
      { value: 'l', label: 'Large' },
    ]},
    { name: 'slider', type: 'slider', label: 'Slider', min: 0, max: 100, defaultValue: 50 },
    { name: 'date', type: 'date', label: 'Date' },
    { name: 'autocomplete', type: 'autocomplete', label: 'Autocomplete', freeSolo: true, options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
    ]},
  ]

  return (
    <Paper sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>All Input Types</Typography>

      <Grid container spacing={3}>
        {fields.map((field) => (
          <Grid key={field.name} size={{ xs: 12, md: 6 }}>
            <FormControl
              config={field}
              value={values[field.name]}
              onChange={(val) => setValues((prev) => ({ ...prev, [field.name]: val }))}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Values:</Typography>
        <Box component="pre" sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default', fontSize: '0.85rem', overflow: 'auto' }}>
          {JSON.stringify(values, null, 2)}
        </Box>
      </Box>
    </Paper>
  )
}

// =============================================================================
// MAIN EXPORT
// =============================================================================

export function FormExamples() {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>Form Components</Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, lg: 6 }}><LoginFormExample /></Grid>
        <Grid size={{ xs: 12, lg: 6 }}><RegistrationFormExample /></Grid>
        <Grid size={{ xs: 12 }}><AllInputTypesExample /></Grid>
      </Grid>
    </Box>
  )
}
