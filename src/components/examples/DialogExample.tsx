import { useState } from 'react'
import { Box, Typography, Button, Paper, Alert, TextField, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useAsyncDialog, useConfirmDialog, usePromptDialog, DialogProps } from '@/hooks/useAsyncDialog'
import { GradientButton, SoftButton } from '../styled/StyledButton'

// ============================================
// DIALOG EXAMPLES
// ============================================

// Custom Dialog Content Component
interface UserFormData {
  name: string
  email: string
}

const UserFormDialog = ({ onClose, onConfirm }: DialogProps<UserFormData>) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    if (name && email) {
      onConfirm({ name, email })
    }
  }

  return (
    <Box>
      <Typography sx={{ mb: 3 }}>
        Fill in the user details below:
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={() => onClose()}>
          Cancel
        </Button>
        <GradientButton onClick={handleSubmit}>
          Add User
        </GradientButton>
      </Box>
    </Box>
  )
}

// Main Dialog Examples
export const DialogExamples = () => {
  const theme = useTheme()
  const [results, setResults] = useState<string[]>([])

  // Confirm Dialog
  const {
    confirm,
    DialogComponent: ConfirmDialog,
  } = useConfirmDialog()

  // Prompt Dialog  
  const {
    prompt,
    DialogComponent: PromptDialog,
  } = usePromptDialog()

  // Custom Dialog
  const {
    openDialog: openUserDialog,
    DialogComponent: UserDialog,
  } = useAsyncDialog<UserFormData>()

  const addResult = (result: string) => {
    setResults((prev) => [...prev, result])
  }

  // Example handlers
  const handleConfirm = async () => {
    const result = await confirm({
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'danger',
    })
    addResult(`Confirm Dialog: ${result ? 'Confirmed' : 'Cancelled'}`)
  }

  const handleWarningConfirm = async () => {
    const result = await confirm({
      title: 'Unsaved Changes',
      message: 'You have unsaved changes. Do you want to leave without saving?',
      confirmText: 'Leave',
      cancelText: 'Stay',
      variant: 'warning',
    })
    addResult(`Warning Dialog: ${result ? 'Left page' : 'Stayed'}`)
  }

  const handlePrompt = async () => {
    const result = await prompt({
      title: 'Enter Name',
      message: 'Please enter your name:',
      placeholder: 'John Doe',
      defaultValue: '',
    })
    addResult(`Prompt Dialog: ${result ? `"${result}"` : 'Cancelled'}`)
  }

  const handleCustomDialog = async () => {
    const result = await openUserDialog(UserFormDialog, {
      title: 'Add New User',
      maxWidth: 'sm',
    })
    if (result) {
      addResult(`Custom Dialog: Added user ${result.name} (${result.email})`)
    } else {
      addResult('Custom Dialog: Cancelled')
    }
  }

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
        Async Dialog System
      </Typography>

      {/* Render all dialog components */}
      <ConfirmDialog />
      <PromptDialog />
      <UserDialog />

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
              Dialog Types
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleConfirm}
              >
                Confirm Delete Dialog
              </Button>

              <Button
                variant="contained"
                color="warning"
                onClick={handleWarningConfirm}
              >
                Warning Dialog
              </Button>

              <SoftButton onClick={handlePrompt}>
                Prompt Dialog
              </SoftButton>

              <GradientButton onClick={handleCustomDialog}>
                Custom Form Dialog
              </GradientButton>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                How It Works:
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                The async dialog system allows you to open dialogs and await their results
                using Promises. This eliminates the need to manage dialog state in your
                component and makes the code flow more linear and readable.
              </Typography>
              <Box
                component="pre"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'background.default',
                  fontSize: '0.8rem',
                  overflow: 'auto',
                }}
              >
{`const result = await confirm({
  title: 'Delete Item',
  message: 'Are you sure?',
  variant: 'danger',
})

if (result) {
  // User confirmed
  deleteItem()
}`}
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
              Dialog Results
            </Typography>

            {results.length === 0 ? (
              <Alert severity="info">
                Click the buttons on the left to see dialog results here.
              </Alert>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {results.map((result, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'background.default',
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Typography variant="body2">
                      {index + 1}. {result}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            {results.length > 0 && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => setResults([])}
                sx={{ mt: 2 }}
              >
                Clear Results
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

