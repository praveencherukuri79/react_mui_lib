import { useState, useCallback, useRef, ReactNode, ComponentType } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
  TextField,
  useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

// =============================================================================
// TYPES
// =============================================================================

/** Configuration for dialog appearance and behavior */
export interface DialogConfig {
  title?: string
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  showCloseButton?: boolean
  disableBackdropClick?: boolean
}

/**
 * Props passed to dialog content components.
 * T = return type, P = custom props passed from parent
 * 
 * @example
 * // Simple dialog returning a string
 * const MyDialog = ({ onClose, onConfirm }: DialogProps<string>) => { ... }
 * 
 * // Dialog with custom props
 * const EditDialog = ({ user, onClose, onConfirm }: DialogProps<User, { user: User }>) => { ... }
 */
export type DialogProps<T = void, P = object> = P & {
  onClose: (result?: T) => void
  onConfirm: (result: T) => void
}

// =============================================================================
// MAIN HOOK: useAsyncDialog
// =============================================================================

/**
 * Opens any component as a dialog and returns the result as a Promise.
 * No need to manage open/close state manually.
 * 
 * @example
 * const { openDialog, DialogComponent } = useAsyncDialog<User, { user: User }>()
 * 
 * const handleEdit = async () => {
 *   const result = await openDialog(
 *     EditUserForm,
 *     { title: 'Edit User' },
 *     { user: currentUser }
 *   )
 *   if (result) saveUser(result)
 * }
 */
export function useAsyncDialog<T = void, P = object>() {
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState<ReactNode>(null)
  const [config, setConfig] = useState<DialogConfig>({})
  const resolveRef = useRef<((value: T | undefined) => void) | null>(null)

  const closeDialog = useCallback((result?: T) => {
    resolveRef.current?.(result)
    setOpen(false)
  }, [])

  const openDialog = useCallback(
    (
      Component: ComponentType<DialogProps<T, P>> | ReactNode,
      dialogConfig: DialogConfig = {},
      props?: P
    ): Promise<T | undefined> => {
      return new Promise((resolve) => {
        resolveRef.current = resolve
        setConfig(dialogConfig)
        setOpen(true)
        setContent(
          typeof Component === 'function' ? (
            <Component
              {...(props as P)}
              onClose={(result?: T) => {
                resolve(result)
                setOpen(false)
              }}
              onConfirm={(result: T) => {
                resolve(result)
                setOpen(false)
              }}
            />
          ) : (
            Component
          )
        )
      })
    },
    []
  )

  const DialogComponent = useCallback(() => {
    const theme = useTheme()
    const { title, maxWidth = 'sm', fullWidth = true, showCloseButton = true, disableBackdropClick } = config

    return (
      <Dialog
        open={open}
        onClose={(_, reason) => {
          if (disableBackdropClick && reason === 'backdropClick') return
          closeDialog()
        }}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        {title && (
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${theme.palette.divider}`, pb: 2 }}>
            <Typography variant="h6" fontWeight={600}>{title}</Typography>
            {showCloseButton && (
              <IconButton size="small" onClick={() => closeDialog()}>
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </DialogTitle>
        )}
        <DialogContent sx={{ pt: title ? 3 : 2 }}>{content}</DialogContent>
      </Dialog>
    )
  }, [open, content, config, closeDialog])

  return { openDialog, closeDialog, DialogComponent, isOpen: open }
}

// =============================================================================
// HELPER HOOK: useConfirmDialog
// =============================================================================

export interface ConfirmOptions {
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
}

/**
 * Simple confirmation dialog that returns true/false.
 * 
 * @example
 * const { confirm, DialogComponent } = useConfirmDialog()
 * 
 * const handleDelete = async () => {
 *   const confirmed = await confirm({
 *     title: 'Delete Item',
 *     message: 'Are you sure?',
 *     variant: 'danger'
 *   })
 *   if (confirmed) deleteItem()
 * }
 */
export function useConfirmDialog() {
  const { openDialog, DialogComponent, isOpen, closeDialog } = useAsyncDialog<boolean>()

  const confirm = useCallback(
    async (options: ConfirmOptions): Promise<boolean> => {
      const { title = 'Confirm', message, confirmText = 'Confirm', cancelText = 'Cancel', variant = 'info' } = options

      const buttonColor = variant === 'danger' ? 'error' : variant === 'warning' ? 'warning' : 'primary'

      const result = await openDialog(
        ({ onClose, onConfirm }) => (
          <Box>
            <Typography sx={{ mb: 3 }}>{message}</Typography>
            <DialogActions sx={{ px: 0, pb: 0 }}>
              <Button variant="outlined" onClick={() => onClose(false)}>{cancelText}</Button>
              <Button variant="contained" color={buttonColor} onClick={() => onConfirm(true)}>{confirmText}</Button>
            </DialogActions>
          </Box>
        ),
        { title, maxWidth: 'xs' }
      )

      return result ?? false
    },
    [openDialog]
  )

  return { confirm, DialogComponent, isOpen, closeDialog }
}

// =============================================================================
// HELPER HOOK: usePromptDialog
// =============================================================================

export interface PromptOptions {
  title?: string
  message: string
  defaultValue?: string
  placeholder?: string
  confirmText?: string
  cancelText?: string
}

/**
 * Prompt dialog that returns user input string.
 * 
 * @example
 * const { prompt, DialogComponent } = usePromptDialog()
 * 
 * const handleRename = async () => {
 *   const newName = await prompt({
 *     title: 'Rename',
 *     message: 'Enter new name:',
 *     defaultValue: currentName
 *   })
 *   if (newName) rename(newName)
 * }
 */
export function usePromptDialog() {
  const { openDialog, DialogComponent, isOpen, closeDialog } = useAsyncDialog<string>()

  const prompt = useCallback(
    async (options: PromptOptions): Promise<string | undefined> => {
      const { title = 'Enter Value', message, defaultValue = '', placeholder = '', confirmText = 'OK', cancelText = 'Cancel' } = options

      return openDialog(
        ({ onClose, onConfirm }) => {
          // Using a wrapper to manage local state
          const PromptContent = () => {
            const [value, setValue] = useState(defaultValue)
            return (
              <Box>
                <Typography sx={{ mb: 2 }}>{message}</Typography>
                <TextField
                  fullWidth
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={placeholder}
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && onConfirm(value)}
                />
                <DialogActions sx={{ px: 0, pb: 0, mt: 3 }}>
                  <Button variant="outlined" onClick={() => onClose()}>{cancelText}</Button>
                  <Button variant="contained" onClick={() => onConfirm(value)}>{confirmText}</Button>
                </DialogActions>
              </Box>
            )
          }
          return <PromptContent />
        },
        { title, maxWidth: 'sm' }
      )
    },
    [openDialog]
  )

  return { prompt, DialogComponent, isOpen, closeDialog }
}
