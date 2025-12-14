import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/themes/ThemeProvider'
import { TopNavLayout } from '@/components/layout/TopNavLayout'
import {
  Dashboard,
  TablesPage,
  TreesPage,
  CardsPage,
  NavbarsPage,
  FormsPage,
  DialogsPage,
  StyledPage,
  ThemeColorsPage,
  TypographyPage,
  ButtonsPage,
  ThemeEditorPage,
  JsonEditorPage,
} from '@/pages'

function App() {
  return (
    <ThemeProvider>
      <TopNavLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tables" element={<TablesPage />} />
          <Route path="/trees" element={<TreesPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/navbars" element={<NavbarsPage />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/dialogs" element={<DialogsPage />} />
          <Route path="/styled" element={<StyledPage />} />
          <Route path="/theme-colors" element={<ThemeColorsPage />} />
          <Route path="/typography" element={<TypographyPage />} />
          <Route path="/buttons" element={<ButtonsPage />} />
          <Route path="/theme-editor" element={<ThemeEditorPage />} />
          <Route path="/json-editor" element={<JsonEditorPage />} />
        </Routes>
      </TopNavLayout>
    </ThemeProvider>
  )
}

export default App

