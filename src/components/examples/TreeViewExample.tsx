import { Box, Typography, useTheme } from '@mui/material'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import FolderIcon from '@mui/icons-material/Folder'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import DescriptionIcon from '@mui/icons-material/Description'
import ImageIcon from '@mui/icons-material/Image'
import CodeIcon from '@mui/icons-material/Code'
import SettingsIcon from '@mui/icons-material/Settings'

// ============================================
// TREE VIEW EXAMPLE
// ============================================
// Demonstrates MUI X TreeView with custom styling

interface FileNode {
  id: string
  label: string
  type: 'folder' | 'file'
  fileType?: 'document' | 'image' | 'code' | 'config'
  children?: FileNode[]
}

const fileStructure: FileNode[] = [
  {
    id: 'src',
    label: 'src',
    type: 'folder',
    children: [
      {
        id: 'components',
        label: 'components',
        type: 'folder',
        children: [
          { id: 'Button.tsx', label: 'Button.tsx', type: 'file', fileType: 'code' },
          { id: 'Card.tsx', label: 'Card.tsx', type: 'file', fileType: 'code' },
          { id: 'Input.tsx', label: 'Input.tsx', type: 'file', fileType: 'code' },
        ],
      },
      {
        id: 'hooks',
        label: 'hooks',
        type: 'folder',
        children: [
          { id: 'useForm.ts', label: 'useForm.ts', type: 'file', fileType: 'code' },
          { id: 'useDialog.ts', label: 'useDialog.ts', type: 'file', fileType: 'code' },
        ],
      },
      {
        id: 'pages',
        label: 'pages',
        type: 'folder',
        children: [
          { id: 'Home.tsx', label: 'Home.tsx', type: 'file', fileType: 'code' },
          { id: 'About.tsx', label: 'About.tsx', type: 'file', fileType: 'code' },
        ],
      },
      { id: 'App.tsx', label: 'App.tsx', type: 'file', fileType: 'code' },
      { id: 'main.tsx', label: 'main.tsx', type: 'file', fileType: 'code' },
    ],
  },
  {
    id: 'public',
    label: 'public',
    type: 'folder',
    children: [
      { id: 'logo.png', label: 'logo.png', type: 'file', fileType: 'image' },
      { id: 'favicon.ico', label: 'favicon.ico', type: 'file', fileType: 'image' },
    ],
  },
  { id: 'package.json', label: 'package.json', type: 'file', fileType: 'config' },
  { id: 'tsconfig.json', label: 'tsconfig.json', type: 'file', fileType: 'config' },
  { id: 'README.md', label: 'README.md', type: 'file', fileType: 'document' },
]

const getFileIcon = (node: FileNode) => {
  if (node.type === 'folder') {
    return null // Will be handled by slots
  }
  switch (node.fileType) {
    case 'image':
      return <ImageIcon sx={{ fontSize: 18, color: '#F472B6' }} />
    case 'code':
      return <CodeIcon sx={{ fontSize: 18, color: '#60A5FA' }} />
    case 'config':
      return <SettingsIcon sx={{ fontSize: 18, color: '#A78BFA' }} />
    case 'document':
      return <DescriptionIcon sx={{ fontSize: 18, color: '#34D399' }} />
    default:
      return <DescriptionIcon sx={{ fontSize: 18 }} />
  }
}

const renderTree = (nodes: FileNode[]) =>
  nodes.map((node) => (
    <TreeItem
      key={node.id}
      itemId={node.id}
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
          {node.type === 'file' && getFileIcon(node)}
          <Typography variant="body2">{node.label}</Typography>
        </Box>
      }
    >
      {node.children && renderTree(node.children)}
    </TreeItem>
  ))

export const TreeViewExample = () => {
  const theme = useTheme()

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        File Explorer
      </Typography>
      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          background: theme.palette.background.paper,
          '& .MuiTreeItem-root': {
            '& .MuiTreeItem-content': {
              borderRadius: 2,
              py: 0.5,
              px: 1,
              '&:hover': {
                background: `${theme.palette.primary.main}10`,
              },
              '&.Mui-selected': {
                background: `${theme.palette.primary.main}20`,
                '&:hover': {
                  background: `${theme.palette.primary.main}25`,
                },
              },
            },
          },
        }}
      >
        <SimpleTreeView
          defaultExpandedItems={['src', 'components']}
          slots={{
            collapseIcon: () => (
              <FolderOpenIcon sx={{ fontSize: 20, color: theme.palette.warning.main }} />
            ),
            expandIcon: () => (
              <FolderIcon sx={{ fontSize: 20, color: theme.palette.warning.main }} />
            ),
          }}
        >
          {renderTree(fileStructure)}
        </SimpleTreeView>
      </Box>
    </Box>
  )
}

