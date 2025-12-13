import { useState } from 'react'
import { Box, Typography, Chip, IconButton, Avatar, useTheme } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import dayjs from 'dayjs'

// ============================================
// DATA TABLE EXAMPLE
// ============================================
// Demonstrates MUI X DataGrid with custom styling

interface User {
  id: number
  name: string
  email: string
  role: 'Admin' | 'User' | 'Guest'
  status: 'Active' | 'Inactive' | 'Pending'
  createdAt: string
  avatar?: string
}

const sampleData: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', createdAt: '2024-01-15' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active', createdAt: '2024-02-20' },
  { id: 3, name: 'Carol Davis', email: 'carol@example.com', role: 'User', status: 'Inactive', createdAt: '2024-03-10' },
  { id: 4, name: 'David Wilson', email: 'david@example.com', role: 'Guest', status: 'Pending', createdAt: '2024-04-05' },
  { id: 5, name: 'Eva Martinez', email: 'eva@example.com', role: 'User', status: 'Active', createdAt: '2024-05-12' },
  { id: 6, name: 'Frank Brown', email: 'frank@example.com', role: 'Admin', status: 'Active', createdAt: '2024-06-18' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'User', status: 'Inactive', createdAt: '2024-07-22' },
  { id: 8, name: 'Henry Clark', email: 'henry@example.com', role: 'Guest', status: 'Pending', createdAt: '2024-08-30' },
]

export const DataTableExample = () => {
  const theme = useTheme()
  const [pageSize, setPageSize] = useState(5)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success'
      case 'Inactive':
        return 'error'
      case 'Pending':
        return 'warning'
      default:
        return 'default'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return theme.palette.primary.main
      case 'User':
        return theme.palette.secondary.main
      case 'Guest':
        return theme.palette.text.secondary
      default:
        return theme.palette.text.primary
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'User',
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams<User>) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              fontSize: '0.9rem',
            }}
          >
            {params.row.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {params.row.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 120,
      renderCell: (params: GridRenderCellParams<User>) => (
        <Typography
          variant="body2"
          sx={{
            color: getRoleColor(params.value as string),
            fontWeight: 500,
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params: GridRenderCellParams<User>) => (
        <Chip
          label={params.value}
          size="small"
          color={getStatusColor(params.value as string) as 'success' | 'error' | 'warning' | 'default'}
          sx={{ fontWeight: 500 }}
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Joined',
      width: 130,
      renderCell: (params: GridRenderCellParams<User>) => (
        <Typography variant="body2" color="text.secondary">
          {dayjs(params.value as string).format('MMM D, YYYY')}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 140,
      sortable: false,
      renderCell: () => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton size="small" color="primary">
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ]

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        User Management
      </Typography>
      <Box
        sx={{
          height: 450,
          '& .MuiDataGrid-root': {
            border: 'none',
            borderRadius: 3,
            '& .MuiDataGrid-cell': {
              borderColor: theme.palette.divider,
            },
            '& .MuiDataGrid-columnHeaders': {
              background: `${theme.palette.primary.main}10`,
              borderRadius: '12px 12px 0 0',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 600,
            },
            '& .MuiDataGrid-row:hover': {
              background: `${theme.palette.primary.main}05`,
            },
          },
        }}
      >
        <DataGrid
          rows={sampleData}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize } },
          }}
          onPaginationModelChange={(model) => setPageSize(model.pageSize)}
          disableRowSelectionOnClick
          checkboxSelection
        />
      </Box>
    </Box>
  )
}

