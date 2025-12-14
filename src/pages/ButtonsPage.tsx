import { Box, Typography, Paper, Button, IconButton, ButtonGroup, Fab } from '@mui/material'
import Grid from '@mui/material/Grid'
import {
  GradientButton,
  AnimatedOutlineButton,
  SoftButton,
  GlassButton,
  PulseIconButton,
  LoadingButton,
} from '@/components/styled/StyledButton'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import SendIcon from '@mui/icons-material/Send'

export const ButtonsPage = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        Buttons
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Various button styles and variants including MUI defaults and custom styled buttons.
      </Typography>

      {/* MUI Button Variants */}
      <Paper sx={{ p: 4, borderRadius: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          MUI Button Variants
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>Contained</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Button variant="contained">Primary</Button>
              <Button variant="contained" color="secondary">Secondary</Button>
              <Button variant="contained" color="success">Success</Button>
              <Button variant="contained" color="error">Error</Button>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>Outlined</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Button variant="outlined">Primary</Button>
              <Button variant="outlined" color="secondary">Secondary</Button>
              <Button variant="outlined" color="success">Success</Button>
              <Button variant="outlined" color="error">Error</Button>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>Text</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Button variant="text">Primary</Button>
              <Button variant="text" color="secondary">Secondary</Button>
              <Button variant="text" color="success">Success</Button>
              <Button variant="text" color="error">Error</Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Button Sizes */}
      <Paper sx={{ p: 4, borderRadius: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Button Sizes
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Button variant="contained" size="small">Small</Button>
          <Button variant="contained" size="medium">Medium</Button>
          <Button variant="contained" size="large">Large</Button>
        </Box>
      </Paper>

      {/* Buttons with Icons */}
      <Paper sx={{ p: 4, borderRadius: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Buttons with Icons
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Button variant="contained" startIcon={<SaveIcon />}>
            Save
          </Button>
          <Button variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
          <Button variant="outlined" startIcon={<EditIcon />}>
            Edit
          </Button>
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Box>
      </Paper>

      {/* Icon Buttons */}
      <Paper sx={{ p: 4, borderRadius: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Icon Buttons
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="primary"><AddIcon /></IconButton>
          <IconButton color="secondary"><EditIcon /></IconButton>
          <IconButton color="error"><DeleteIcon /></IconButton>
          <IconButton disabled><SaveIcon /></IconButton>
        </Box>
      </Paper>

      {/* Button Groups */}
      <Paper sx={{ p: 4, borderRadius: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Button Groups
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <ButtonGroup variant="contained">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Box>
      </Paper>

      {/* Floating Action Buttons */}
      <Paper sx={{ p: 4, borderRadius: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Floating Action Buttons
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Fab color="primary" size="small"><AddIcon /></Fab>
          <Fab color="primary"><AddIcon /></Fab>
          <Fab color="secondary"><EditIcon /></Fab>
          <Fab variant="extended" color="primary">
            <AddIcon sx={{ mr: 1 }} />
            Add Item
          </Fab>
        </Box>
      </Paper>

      {/* Custom Styled Buttons */}
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Custom Styled Buttons
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
          <GradientButton>Gradient</GradientButton>
          <AnimatedOutlineButton>Animated Outline</AnimatedOutlineButton>
          <SoftButton>Soft Button</SoftButton>
          <GlassButton>Glass Button</GlassButton>
          <PulseIconButton><AddIcon /></PulseIconButton>
          <LoadingButton loading>Loading</LoadingButton>
        </Box>
      </Paper>
    </Box>
  )
}

