# React MUI Library

A comprehensive example repository demonstrating best practices for building React applications with Material-UI, TypeScript, Recoil, and Zod.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)
![MUI](https://img.shields.io/badge/MUI-6.x-007FFF?logo=mui)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)

## Features

- 🎨 **Multi-Theme Support** - Switch between 4 beautiful themes with a single click
- 📱 **Responsive Design** - Fully responsive for mobile, tablet, and desktop
- 📝 **Config-Based Forms** - Build forms by passing configuration objects with Zod validation
- 💬 **Async Dialog System** - Promise-based dialogs for cleaner code flow
- 🎯 **Styled Components** - Custom MUI component variants with animations
- 📊 **Data Components** - Tables, trees, cards, and navigation examples

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **MUI v6** - Component library
- **MUI X** - Advanced components (DataGrid, TreeView, DatePickers)
- **Recoil** - State management
- **Day.js** - Date utilities
- **Zod** - Schema validation
- **React Router** - Navigation

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── examples/       # Example implementations
│   ├── form/           # Form control components
│   ├── layout/         # Layout components
│   └── styled/         # Styled MUI components
├── hooks/
│   ├── useAsyncDialog.tsx  # Async dialog system
│   └── useForm.ts          # Form state management
├── pages/              # Page components
├── state/              # Recoil atoms and selectors
├── themes/             # Theme configurations
│   ├── midnight.ts     # Dark blue theme
│   ├── aurora.ts       # Light purple theme
│   ├── forest.ts       # Dark green theme
│   ├── sunset.ts       # Light orange theme
│   └── index.ts        # Theme exports
└── App.tsx             # Main application
```

## Theme Configuration

Themes are defined in separate files for easy switching:

```typescript
// src/themes/index.ts
export const ACTIVE_THEME_ID = 'midnight'  // Change this to switch themes

// Available themes: 'midnight', 'aurora', 'forest', 'sunset'
```

To create a new theme, add a new file in `src/themes/` and export it in `index.ts`.

## Form Control Usage

Build forms declaratively with configuration objects:

```typescript
import { FormControl, ValidationSchemas } from '@/components/form'

const emailConfig = {
  name: 'email',
  type: 'email',
  label: 'Email Address',
  schema: ValidationSchemas.email,
}

<FormControl
  config={emailConfig}
  value={values.email}
  onChange={(value, isValid) => setEmail(value)}
/>
```

Supported types: `text`, `email`, `password`, `number`, `textarea`, `select`, `multiselect`, `checkbox`, `switch`, `radio`, `slider`, `date`, `autocomplete`

## Async Dialog System

Open dialogs and await their results:

```typescript
import { useConfirmDialog } from '@/hooks/useAsyncDialog'

const { confirm, DialogComponent } = useConfirmDialog()

// In your component
const handleDelete = async () => {
  const confirmed = await confirm({
    title: 'Delete Item',
    message: 'Are you sure you want to delete this?',
    variant: 'danger',
  })
  
  if (confirmed) {
    // Proceed with deletion
  }
}

// Don't forget to render the dialog component
<DialogComponent />
```

## Styled Components

Create custom themed components:

```typescript
import { styled, Button } from '@mui/material'

export const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  '&:hover': {
    boxShadow: `0 4px 20px ${theme.palette.primary.main}40`,
  },
}))
```

## License

MIT

