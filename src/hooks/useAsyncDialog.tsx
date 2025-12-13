import React, { useState, useCallback, useRef, ReactNode, ComponentType, ChangeEvent } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
  useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

// ============================================
// ASYNC DIALOG SYSTEM
// ============================================
// This system allows you to open any component as a dialog
// and await its result, avoiding the need to manage
// open/close state in multiple methods.

export interface DialogConfig {
  title?: string
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  fullWidth?: boolean
  showCloseButton?: boolean
  disableBackdropClick?: boolean
  hideActions?: boolean
  confirmText?: string
  cancelText?: string
}

export interface DialogProps<T = unknown> {
  onClose: (result?: T) => void
  onConfirm: (result: T) => void
}

interface DialogState<T = unknown> {
  open: boolean
  resolve: ((value: T | undefined) => void) | null
  component: ReactNode | null
  config: DialogConfig
}

// Hook for creating async dialogs
export function useAsyncDialog<T = unknown>() {
  const [state, setState] = useState<DialogState<T>>({
    open: false,
    resolve: null,
    component: null,
    config: {},
  })

  const resolveRef = useRef<((value: T | undefined) => void) | null>(null)

  const openDialog = useCallback(
    (
      Component: ComponentType<DialogProps<T>> | ReactNode,
      config: DialogConfig = {}
    ): Promise<T | undefined> => {
      return new Promise((resolve) => {
        resolveRef.current = resolve
        setState({
          open: true,
          resolve,
          component:
            typeof Component === 'function' ? (
              <Component
                onClose={(result?: T) => {
                  resolve(result)
                  setState((s: DialogState<T>) => ({ ...s, open: false }))
                }}
                onConfirm={(result: T) => {
                  resolve(result)
                  setState((s: DialogState<T>) => ({ ...s, open: false }))
                }}
              />
            ) : (
              Component
            ),
          config,
        })
      })
    },
    []
  )

  const closeDialog = useCallback((result?: T) => {
    if (resolveRef.current) {
      resolveRef.current(result)
    }
    setState((s: DialogState<T>) => ({ ...s, open: false }))
  }, [])

  const DialogComponent = useCallback(() => {
    const theme = useTheme()
    const {
      title,
      maxWidth = 'sm',
      fullWidth = true,
      showCloseButton = true,
      disableBackdropClick = false,
    } = state.config

    return (
      <Dialog
        open={state.open}
        onClose={(_: React.SyntheticEvent, reason: string) => {
          if (disableBackdropClick && reason === 'backdropClick') return
          closeDialog()
        }}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: 'hidden',
          },
        }}
      >
        {title && (
          <DialogTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: `1px solid ${theme.palette.divider}`,
              pb: 2,
            }}
          >
            <Typography variant="h6" component="span" fontWeight={600}>
              {title}
            </Typography>
            {showCloseButton && (
              <IconButton
                size="small"
                onClick={() => closeDialog()}
                sx={{ ml: 2 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </DialogTitle>
        )}
        <DialogContent sx={{ pt: title ? 3 : 2 }}>
          {state.component}
        </DialogContent>
      </Dialog>
    )
  }, [state, closeDialog])

  return {
    openDialog,
    closeDialog,
    DialogComponent,
    isOpen: state.open,
  }
}

// ============================================
// CONFIRMATION DIALOG
// ============================================
export interface ConfirmDialogOptions {
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
}

export function useConfirmDialog() {
  const { openDialog, closeDialog, isOpen, DialogComponent } = useAsyncDialog<boolean>()

  const confirm = useCallback(
    async (options: ConfirmDialogOptions): Promise<boolean> => {
      const {
        title = 'Confirm',
        message,
        confirmText = 'Confirm',
        cancelText = 'Cancel',
        variant = 'info',
      } = options

      const result = await openDialog(
        ({ onClose, onConfirm }: DialogProps<boolean>) => (
          <ConfirmContent
            message={message}
            confirmText={confirmText}
            cancelText={cancelText}
            variant={variant}
            onConfirm={() => onConfirm(true)}
            onCancel={() => onClose(false)}
          />
        ),
        { title, maxWidth: 'xs' }
      )

      return result ?? false
    },
    [openDialog]
  )

  return { confirm, closeDialog, isOpen, DialogComponent }
}

interface ConfirmContentProps {
  message: string
  confirmText: string
  cancelText: string
  variant: 'danger' | 'warning' | 'info'
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmContent({
  message,
  confirmText,
  cancelText,
  variant,
  onConfirm,
  onCancel,
}: ConfirmContentProps) {
  const getButtonColor = () => {
    switch (variant) {
      case 'danger':
        return 'error'
      case 'warning':
        return 'warning'
      default:
        return 'primary'
    }
  }

  return (
    <Box>
      <Typography sx={{ mb: 3 }}>{message}</Typography>
      <DialogActions sx={{ px: 0, pb: 0 }}>
        <Button variant="outlined" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button variant="contained" color={getButtonColor()} onClick={onConfirm}>
          {confirmText}
        </Button>
      </DialogActions>
    </Box>
  )
}

// ============================================
// PROMPT DIALOG
// ============================================
export interface PromptDialogOptions {
  title?: string
  message: string
  defaultValue?: string
  placeholder?: string
  confirmText?: string
  cancelText?: string
}

export function usePromptDialog() {
  const { openDialog, closeDialog, isOpen, DialogComponent } = useAsyncDialog<string>()

  const prompt = useCallback(
    async (options: PromptDialogOptions): Promise<string | undefined> => {
      const {
        title = 'Enter Value',
        message,
        defaultValue = '',
        placeholder = '',
        confirmText = 'OK',
        cancelText = 'Cancel',
      } = options

      return await openDialog(
        ({ onClose, onConfirm }: DialogProps<string>) => (
          <PromptContent
            message={message}
            defaultValue={defaultValue}
            placeholder={placeholder}
            confirmText={confirmText}
            cancelText={cancelText}
            onConfirm={onConfirm}
            onCancel={() => onClose(undefined)}
          />
        ),
        { title, maxWidth: 'sm' }
      )
    },
    [openDialog]
  )

  return { prompt, closeDialog, isOpen, DialogComponent }
}

interface PromptContentProps {
  message: string
  defaultValue: string
  placeholder: string
  confirmText: string
  cancelText: string
  onConfirm: (value: string) => void
  onCancel: () => void
}

function PromptContent({
  message,
  defaultValue,
  placeholder,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: PromptContentProps) {
  const [value, setValue] = useState(defaultValue)

  return (
    <Box>
      <Typography sx={{ mb: 2 }}>{message}</Typography>
      <Box
        component="input"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder={placeholder}
        sx={{
          width: '100%',
          p: 1.5,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          fontSize: '1rem',
          outline: 'none',
          bgcolor: 'background.paper',
          color: 'text.primary',
          '&:focus': {
            borderColor: 'primary.main',
          },
        }}
      />
      <DialogActions sx={{ px: 0, pb: 0, mt: 3 }}>
        <Button variant="outlined" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button variant="contained" onClick={() => onConfirm(value)}>
          {confirmText}
        </Button>
      </DialogActions>
    </Box>
  )
}

