import { useState } from 'react'
import { Box, Typography, Button, Paper, Alert, TextField, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useAsyncDialog, useConfirmDialog, usePromptDialog, DialogProps } from '@/hooks/useAsyncDialog'

// =============================================================================
// TYPES
// =============================================================================

interface User {
  id: number
  name: string
  email: string
  role: string
}

interface EditUserProps {
  user: User
  roles: string[]
}

// =============================================================================
// DIALOG CONTENT COMPONENTS
// =============================================================================

/** Simple form dialog - no props from parent */
function AddUserDialog({ onClose, onConfirm }: DialogProps<User>) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    if (name && email) {
      onConfirm({ id: Date.now(), name, email, role: 'Viewer' })
    }
  }

  return (
    <Box>
      <Typography sx={{ mb: 3 }}>Fill in the user details:</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={() => onClose()}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Add User</Button>
      </Box>
    </Box>
  )
}

/** Edit form dialog - receives props from parent via spread */
function EditUserDialog({ user, roles, onClose, onConfirm }: DialogProps<User, EditUserProps>) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [role, setRole] = useState(user.role)

  const handleSubmit = () => {
    onConfirm({ ...user, name, email, role })
  }

  return (
    <Box>
      <Alert severity="info" sx={{ mb: 3 }}>
        Editing user #{user.id}. Available roles: {roles.join(', ')}
      </Alert>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
        <TextField label="Role" value={role} onChange={(e) => setRole(e.target.value)} select SelectProps={{ native: true }} fullWidth>
          {roles.map((r) => <option key={r} value={r}>{r}</option>)}
        </TextField>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={() => onClose()}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Save Changes</Button>
      </Box>
    </Box>
  )
}

// =============================================================================
// MAIN EXAMPLE COMPONENT
// =============================================================================

export function DialogExamples() {
  const theme = useTheme()
  const [results, setResults] = useState<string[]>([])

  // Initialize dialog hooks
  const { confirm, DialogComponent: ConfirmDialog } = useConfirmDialog()
  const { prompt, DialogComponent: PromptDialog } = usePromptDialog()
  const { openDialog: openAddDialog, DialogComponent: AddDialog } = useAsyncDialog<User>()
  const { openDialog: openEditDialog, DialogComponent: EditDialog } = useAsyncDialog<User, EditUserProps>()

  const addResult = (text: string) => setResults((prev) => [...prev, text])

  // ==========================================================================
  // EXAMPLE HANDLERS
  // ==========================================================================

  const handleConfirmDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      variant: 'danger',
    })
    addResult(`Delete: ${confirmed ? 'Confirmed' : 'Cancelled'}`)
  }

  const handleWarning = async () => {
    const confirmed = await confirm({
      title: 'Unsaved Changes',
      message: 'You have unsaved changes. Do you want to leave without saving?',
      confirmText: 'Leave',
      cancelText: 'Stay',
      variant: 'warning',
    })
    addResult(`Warning: ${confirmed ? 'Left page' : 'Stayed'}`)
  }

  const handlePrompt = async () => {
    const name = await prompt({
      title: 'Enter Name',
      message: 'Please enter your name:',
      placeholder: 'John Doe',
    })
    addResult(`Prompt: ${name ? `"${name}"` : 'Cancelled'}`)
  }

  const handleAddUser = async () => {
    const user = await openAddDialog(AddUserDialog, { title: 'Add New User' })
    addResult(user ? `Added: ${user.name} (${user.email})` : 'Add cancelled')
  }

  const handleEditUser = async () => {
    // Sample data - in real app, this would come from state/props
    const userToEdit: User = { id: 42, name: 'John Doe', email: 'john@example.com', role: 'Editor' }
    const availableRoles = ['Admin', 'Editor', 'Viewer', 'Guest']

    // Pass props directly to the dialog component
    const updated = await openEditDialog(
      EditUserDialog,
      { title: `Edit: ${userToEdit.name}` },
      { user: userToEdit, roles: availableRoles }
    )

    addResult(updated ? `Updated: ${updated.name} as ${updated.role}` : 'Edit cancelled')
  }

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>Async Dialog System</Typography>

      {/* Dialog components must be rendered */}
      <ConfirmDialog />
      <PromptDialog />
      <AddDialog />
      <EditDialog />

      <Grid container spacing={4}>
        {/* Left: Buttons */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>Dialog Types</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button variant="contained" color="error" onClick={handleConfirmDelete}>Confirm Delete</Button>
              <Button variant="contained" color="warning" onClick={handleWarning}>Warning Dialog</Button>
              <Button variant="outlined" onClick={handlePrompt}>Prompt Dialog</Button>
              <Button variant="contained" onClick={handleAddUser}>Add User (Simple)</Button>
              <Button variant="contained" color="secondary" onClick={handleEditUser}>Edit User (With Props)</Button>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>How It Works:</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Open dialogs with <code>await</code> and get results directly. No state management needed.
              </Typography>
              <Box component="pre" sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default', fontSize: '0.8rem', overflow: 'auto' }}>
{`// Simple confirmation
const confirmed = await confirm({ message: 'Delete?' })
if (confirmed) deleteItem()

// With props passed to dialog
const result = await openDialog(
  EditForm,
  { title: 'Edit' },
  { user, roles }  // ← Props spread onto component
)`}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Right: Results */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>Results</Typography>
            {results.length === 0 ? (
              <Alert severity="info">Click buttons to see results here.</Alert>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {results.map((result, i) => (
                  <Box key={i} sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default', border: `1px solid ${theme.palette.divider}` }}>
                    <Typography variant="body2">{i + 1}. {result}</Typography>
                  </Box>
                ))}
              </Box>
            )}
            {results.length > 0 && (
              <Button variant="outlined" size="small" onClick={() => setResults([])} sx={{ mt: 2 }}>Clear</Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
