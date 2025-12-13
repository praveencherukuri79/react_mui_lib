import { useState } from 'react'
import { Box, Typography, Button, Paper, Alert } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { z } from 'zod'
import { FormControl, ValidationSchemas, FieldConfig } from '../form/FormControl'
import { useForm } from '@/hooks/useForm'
import { GradientButton } from '../styled/StyledButton'

// ============================================
// FORM EXAMPLES
// ============================================

// Example 1: Login Form
export const LoginFormExample = () => {
  const [result, setResult] = useState<string>('')

  const loginSchema = z.object({
    email: ValidationSchemas.email,
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().optional(),
  })

  const { getFieldProps, handleSubmit, isSubmitting, resetForm } = useForm({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: loginSchema,
    onSubmit: async (vals) => {
      await new Promise((r) => setTimeout(r, 1000))
      setResult(`Login successful! Email: ${vals.email}`)
    },
  })

  const emailConfig: FieldConfig<string> = {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email',
    schema: ValidationSchemas.email,
  }

  const passwordConfig: FieldConfig<string> = {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    schema: z.string().min(1, 'Password is required'),
  }

  const rememberConfig: FieldConfig<boolean> = {
    name: 'rememberMe',
    type: 'checkbox',
    label: 'Remember me',
  }

  return (
    <Paper sx={{ p: 4, borderRadius: 3, maxWidth: 400 }}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Login
      </Typography>
      
      {result && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {result}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <FormControl
            config={emailConfig}
            {...getFieldProps('email')}
          />
          <FormControl
            config={passwordConfig}
            {...getFieldProps('password')}
          />
          <FormControl
            config={rememberConfig}
            {...getFieldProps('rememberMe')}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <GradientButton type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </GradientButton>
          <Button variant="outlined" onClick={resetForm}>
            Reset
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

// Example 2: Registration Form
export const RegistrationFormExample = () => {
  const [result, setResult] = useState<string>('')

  const registerSchema = z
    .object({
      firstName: z.string().min(2, 'First name is too short'),
      lastName: z.string().min(2, 'Last name is too short'),
      email: ValidationSchemas.email,
      password: ValidationSchemas.password,
      confirmPassword: z.string(),
      role: z.string().min(1, 'Please select a role'),
      newsletter: z.boolean().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    })

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
    validationSchema: registerSchema,
    onSubmit: async (vals) => {
      await new Promise((r) => setTimeout(r, 1500))
      setResult(`Welcome, ${vals.firstName}! Your account has been created.`)
    },
  })

  const fields: FieldConfig[] = [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      schema: z.string().min(2, 'First name is too short'),
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      schema: z.string().min(2, 'Last name is too short'),
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      schema: ValidationSchemas.email,
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      helperText: 'Min 8 chars, 1 uppercase, 1 lowercase, 1 number',
      schema: ValidationSchemas.password,
    },
    {
      name: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
    },
    {
      name: 'role',
      type: 'select',
      label: 'Role',
      options: [
        { value: 'developer', label: 'Developer' },
        { value: 'designer', label: 'Designer' },
        { value: 'manager', label: 'Manager' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      name: 'newsletter',
      type: 'switch',
      label: 'Subscribe to newsletter',
    },
  ]

  return (
    <Paper sx={{ p: 4, borderRadius: 3, maxWidth: 500 }}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Create Account
      </Typography>

      {result && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {result}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {fields.map((field) => {
            type FormValues = typeof values
            const fieldName = field.name as keyof FormValues
            return (
              <Grid key={field.name} size={{ xs: 12, sm: field.name === 'firstName' || field.name === 'lastName' ? 6 : 12 }}>
                <FormControl
                  config={field as FieldConfig<string | boolean>}
                  {...getFieldProps(fieldName)}
                />
              </Grid>
            )
          })}
        </Grid>

        <GradientButton type="submit" fullWidth sx={{ mt: 3 }} disabled={isSubmitting}>
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </GradientButton>
      </Box>
    </Paper>
  )
}

// Example 3: All Input Types Demo
export const AllInputTypesExample = () => {
  const [values, setValues] = useState<Record<string, unknown>>({})

  const allFields: FieldConfig[] = [
    { name: 'text', type: 'text', label: 'Text Input', placeholder: 'Enter text...' },
    { name: 'email', type: 'email', label: 'Email Input', schema: ValidationSchemas.email },
    { name: 'password', type: 'password', label: 'Password Input' },
    { name: 'number', type: 'number', label: 'Number Input', defaultValue: 42 },
    { name: 'textarea', type: 'textarea', label: 'Textarea', rows: 3 },
    {
      name: 'select',
      type: 'select',
      label: 'Select',
      options: [
        { value: 'opt1', label: 'Option 1' },
        { value: 'opt2', label: 'Option 2' },
        { value: 'opt3', label: 'Option 3' },
      ],
    },
    {
      name: 'multiselect',
      type: 'multiselect',
      label: 'Multi-Select',
      options: [
        { value: 'red', label: 'Red' },
        { value: 'green', label: 'Green' },
        { value: 'blue', label: 'Blue' },
      ],
    },
    { name: 'checkbox', type: 'checkbox', label: 'Checkbox Option' },
    { name: 'switch', type: 'switch', label: 'Toggle Switch' },
    {
      name: 'radio',
      type: 'radio',
      label: 'Radio Group',
      options: [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
      ],
    },
    {
      name: 'slider',
      type: 'slider',
      label: 'Slider',
      min: 0,
      max: 100,
      defaultValue: 50,
      marks: true,
    },
    { name: 'date', type: 'date', label: 'Date Picker' },
    {
      name: 'autocomplete',
      type: 'autocomplete',
      label: 'Autocomplete',
      options: [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' },
        { value: 'svelte', label: 'Svelte' },
      ],
      freeSolo: true,
    },
  ]

  return (
    <Paper sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        All Input Types
      </Typography>

      <Grid container spacing={3}>
        {allFields.map((field) => (
          <Grid key={field.name} size={{ xs: 12, md: 6 }}>
            <FormControl
              config={field}
              value={values[field.name]}
              onChange={(value) =>
                setValues((prev) => ({ ...prev, [field.name]: value }))
              }
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Current Values:
        </Typography>
        <Box
          component="pre"
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: 'background.default',
            overflow: 'auto',
            fontSize: '0.85rem',
          }}
        >
          {JSON.stringify(values, null, 2)}
        </Box>
      </Box>
    </Paper>
  )
}

// Main Form Examples Component
export const FormExamples = () => {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
        Form Components
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <LoginFormExample />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <RegistrationFormExample />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <AllInputTypesExample />
        </Grid>
      </Grid>
    </Box>
  )
}

