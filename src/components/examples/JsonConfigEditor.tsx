import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  Switch,
  FormControlLabel,
  Chip,
  Divider,
  Alert,
  Tooltip,
  Collapse,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UndoIcon from "@mui/icons-material/Undo";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { produce } from "immer";

// =============================================================================
// SAMPLE CONFIG DATA
// =============================================================================

const sampleConfig = {
  appName: "My Application",
  version: "1.0.0",
  debug: false,
  maxRetries: 3,
  api: {
    baseUrl: "https://api.example.com",
    timeout: 5000,
    headers: {
      contentType: "application/json",
    },
  },
  features: {
    darkMode: true,
    notifications: true,
    analytics: false,
  },
  users: [
    { id: 1, name: "John Doe", role: "admin", active: true },
    { id: 2, name: "Jane Smith", role: "editor", active: true },
    { id: 3, name: "Bob Wilson", role: "viewer", active: false },
  ],
  endpoints: [
    { path: "/users", method: "GET", auth: true },
    { path: "/posts", method: "GET", auth: false },
    { path: "/admin", method: "POST", auth: true },
  ],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonValue = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonObject = Record<string, any>;

// Deep equality check - safer than JSON.stringify
function deepEqual(a: JsonValue, b: JsonValue): boolean {
  if (a === b) return true;
  if (a === null || b === null) return a === b;
  if (typeof a !== typeof b) return false;
  if (typeof a !== "object") return a === b;

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    return a.every((item, i) => deepEqual(item, b[i]));
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => deepEqual(a[key], b[key]));
}

// =============================================================================
// TREE VIEW RENDERER
// =============================================================================

interface TreeNodeProps {
  path: string;
  label: string;
  value: JsonValue;
  onEdit: (path: string, value: JsonValue) => void;
  onDelete: (path: string) => void;
  onAddItem?: (path: string) => void;
}

function TreeNode({
  path,
  label,
  value,
  onEdit,
  onDelete,
  onAddItem,
}: TreeNodeProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  const handleStartEdit = () => {
    setEditValue(typeof value === "object" ? "" : String(value));
    setEditing(true);
  };

  const handleSave = () => {
    let newValue: JsonValue = editValue;
    if (editValue === "true") newValue = true;
    else if (editValue === "false") newValue = false;
    else if (!isNaN(Number(editValue)) && editValue !== "")
      newValue = Number(editValue);
    onEdit(path, newValue);
    setEditing(false);
  };

  const handleCancel = () => setEditing(false);

  const getTypeChip = () => {
    if (Array.isArray(value)) {
      return (
        <Chip
          label={`array[${value.length}]`}
          size="small"
          color="info"
          sx={{ ml: 1 }}
        />
      );
    }
    if (value === null) {
      return <Chip label="null" size="small" sx={{ ml: 1 }} />;
    }
    if (typeof value === "object") {
      return (
        <Chip label="object" size="small" color="secondary" sx={{ ml: 1 }} />
      );
    }
    if (typeof value === "boolean") {
      return (
        <Chip
          label={value ? "true" : "false"}
          size="small"
          color={value ? "success" : "default"}
          sx={{ ml: 1 }}
        />
      );
    }
    if (typeof value === "number") {
      return (
        <Chip label={String(value)} size="small" color="warning" sx={{ ml: 1 }} />
      );
    }
    const strVal = String(value);
    return (
      <Chip
        label={`"${strVal.slice(0, 20)}${strVal.length > 20 ? "..." : ""}"`}
        size="small"
        sx={{ ml: 1 }}
      />
    );
  };

  // For objects and arrays, render children
  if (typeof value === "object" && value !== null) {
    const entries = Array.isArray(value)
      ? value.map((v, i) => [String(i), v] as [string, JsonValue])
      : Object.entries(value);

    return (
      <TreeItem
        itemId={path}
        label={
          <Box sx={{ display: "flex", alignItems: "center", py: 0.5 }}>
            <Typography fontWeight={500}>{label}</Typography>
            {getTypeChip()}
            {Array.isArray(value) && onAddItem && (
              <Tooltip title="Add item">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddItem(path);
                  }}
                  sx={{ ml: 1 }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        }
      >
        {entries.map(([key, val]) => (
          <TreeNode
            key={`${path}.${key}`}
            path={`${path}.${key}`}
            label={key}
            value={val}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddItem={onAddItem}
          />
        ))}
      </TreeItem>
    );
  }

  // Primitive value
  return (
    <TreeItem
      itemId={path}
      label={
        <Box sx={{ display: "flex", alignItems: "center", py: 0.5 }}>
          {editing ? (
            <>
              <TextField
                size="small"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") handleCancel();
                }}
                onFocus={(e) => e.stopPropagation()}
                autoFocus
                sx={{ width: 150 }}
              />
              <IconButton size="small" onClick={handleSave} color="success">
                <CheckIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleCancel}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <>
              <Typography>{label}</Typography>
              {getTypeChip()}
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartEdit();
                }}
                sx={{ ml: 1 }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(path);
                }}
                color="error"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>
      }
    />
  );
}

// =============================================================================
// FORM VIEW RENDERER
// =============================================================================

interface FormFieldProps {
  path: string;
  label: string;
  value: JsonValue;
  onChange: (path: string, value: JsonValue) => void;
  onDelete: (path: string) => void;
  onAddItem?: (path: string) => void;
  depth?: number;
}

function FormField({
  path,
  label,
  value,
  onChange,
  onDelete,
  onAddItem,
  depth = 0,
}: FormFieldProps) {
  const [expanded, setExpanded] = useState(depth < 2);

  // Object or Array
  if (typeof value === "object" && value !== null) {
    const entries = Array.isArray(value)
      ? value.map((v, i) => [String(i), v] as [string, JsonValue])
      : Object.entries(value);

    return (
      <Box
        sx={{
          mb: 2,
          pl: depth > 0 ? 2 : 0,
          borderLeft: depth > 0 ? "2px solid" : "none",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer", mb: 1 }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          <Typography fontWeight={600}>{label}</Typography>
          <Chip
            label={Array.isArray(value) ? `[${value.length}]` : "object"}
            size="small"
            sx={{ ml: 1 }}
          />
          {Array.isArray(value) && onAddItem && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onAddItem(path);
              }}
              sx={{ ml: 1 }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
        <Collapse in={expanded}>
          <Box sx={{ pl: 2 }}>
            {entries.map(([key, val]) => (
              <FormField
                key={`${path}.${key}`}
                path={`${path}.${key}`}
                label={key}
                value={val}
                onChange={onChange}
                onDelete={onDelete}
                onAddItem={onAddItem}
                depth={depth + 1}
              />
            ))}
          </Box>
        </Collapse>
      </Box>
    );
  }

  // Boolean
  if (typeof value === "boolean") {
    return (
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
        <FormControlLabel
          control={
            <Switch
              checked={value}
              onChange={(e) => onChange(path, e.target.checked)}
              size="small"
            />
          }
          label={label}
        />
        <IconButton size="small" onClick={() => onDelete(path)} color="error">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    );
  }

  // Number or String
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
      <TextField
        size="small"
        label={label}
        type={typeof value === "number" ? "number" : "text"}
        value={value ?? ""}
        onChange={(e) =>
          onChange(
            path,
            typeof value === "number" ? Number(e.target.value) : e.target.value
          )
        }
        sx={{ flex: 1 }}
      />
      <IconButton size="small" onClick={() => onDelete(path)} color="error">
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

// =============================================================================
// DIFF TREE VIEW - Shows changes between original and current
// =============================================================================

type DiffType = "unchanged" | "added" | "removed" | "modified";

interface DiffNodeProps {
  path: string;
  label: string;
  originalValue: JsonValue;
  currentValue: JsonValue;
}

function getDiffType(original: JsonValue, current: JsonValue): DiffType {
  if (original === undefined && current !== undefined) return "added";
  if (original !== undefined && current === undefined) return "removed";
  if (!deepEqual(original, current)) return "modified";
  return "unchanged";
}

function DiffNode({ path, label, originalValue, currentValue }: DiffNodeProps) {
  const diffType = getDiffType(originalValue, currentValue);

  const diffColors = {
    unchanged: "text.secondary",
    added: "success.main",
    removed: "error.main",
    modified: "warning.main",
  };

  const diffIcons = {
    unchanged: null,
    added: <AddCircleIcon fontSize="small" color="success" />,
    removed: <RemoveCircleIcon fontSize="small" color="error" />,
    modified: <ChangeCircleIcon fontSize="small" color="warning" />,
  };

  const value = currentValue ?? originalValue;
  const isObject = typeof value === "object" && value !== null;

  const getValueDisplay = () => {
    if (diffType === "removed") {
      return (
        <Typography
          component="span"
          sx={{ textDecoration: "line-through", color: "error.main", ml: 1 }}
        >
          {JSON.stringify(originalValue)}
        </Typography>
      );
    }
    if (diffType === "modified" && !isObject) {
      return (
        <Box component="span" sx={{ ml: 1 }}>
          <Typography
            component="span"
            sx={{ textDecoration: "line-through", color: "error.main" }}
          >
            {JSON.stringify(originalValue)}
          </Typography>
          <Typography component="span" sx={{ mx: 0.5 }}>→</Typography>
          <Typography component="span" sx={{ color: "success.main" }}>
            {JSON.stringify(currentValue)}
          </Typography>
        </Box>
      );
    }
    if (diffType === "added" && !isObject) {
      return (
        <Typography component="span" sx={{ color: "success.main", ml: 1 }}>
          {JSON.stringify(currentValue)}
        </Typography>
      );
    }
    if (!isObject) {
      return (
        <Typography component="span" sx={{ color: "text.secondary", ml: 1 }}>
          {JSON.stringify(value)}
        </Typography>
      );
    }
    return null;
  };

  // For objects and arrays
  if (isObject) {
    const allKeys = new Set([
      ...Object.keys(originalValue || {}),
      ...Object.keys(currentValue || {}),
    ]);

    return (
      <TreeItem
        itemId={path}
        label={
          <Box sx={{ display: "flex", alignItems: "center", py: 0.5 }}>
            {diffIcons[diffType]}
            <Typography
              fontWeight={500}
              sx={{ color: diffColors[diffType], ml: diffIcons[diffType] ? 1 : 0 }}
            >
              {label}
            </Typography>
            <Chip
              label={Array.isArray(value) ? `[${(value as JsonValue[]).length}]` : "object"}
              size="small"
              color={diffType === "modified" ? "warning" : diffType === "added" ? "success" : "default"}
              sx={{ ml: 1 }}
            />
          </Box>
        }
      >
        {Array.from(allKeys).map((key) => (
          <DiffNode
            key={`${path}.${key}`}
            path={`${path}.${key}`}
            label={key}
            originalValue={(originalValue as JsonObject)?.[key]}
            currentValue={(currentValue as JsonObject)?.[key]}
          />
        ))}
      </TreeItem>
    );
  }

  // Primitive value
  return (
    <TreeItem
      itemId={path}
      label={
        <Box sx={{ display: "flex", alignItems: "center", py: 0.5 }}>
          {diffIcons[diffType]}
          <Typography
            sx={{ color: diffColors[diffType], ml: diffIcons[diffType] ? 1 : 0 }}
          >
            {label}
          </Typography>
          {getValueDisplay()}
        </Box>
      }
    />
  );
}

interface DiffTreeProps {
  original: JsonObject;
  current: JsonObject;
}

function DiffTree({ original, current }: DiffTreeProps) {
  const allKeys = new Set([...Object.keys(original), ...Object.keys(current)]);

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <Chip icon={<ChangeCircleIcon />} label="Modified" color="warning" size="small" />
        <Chip icon={<AddCircleIcon />} label="Added" color="success" size="small" />
        <Chip icon={<RemoveCircleIcon />} label="Removed" color="error" size="small" />
      </Box>
      <SimpleTreeView>
        {Array.from(allKeys).map((key) => (
          <DiffNode
            key={key}
            path={key}
            label={key}
            originalValue={original[key]}
            currentValue={current[key]}
          />
        ))}
      </SimpleTreeView>
    </Box>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

type ViewMode = "form" | "tree";
type CompareMode = "json" | "tree";

export function JsonConfigEditor() {
  const [config, setConfig] = useState<JsonObject>(sampleConfig);
  const [originalConfig] = useState<JsonObject>(
    JSON.parse(JSON.stringify(sampleConfig))
  );
  const [viewMode, setViewMode] = useState<ViewMode>("form");
  const [compareMode, setCompareMode] = useState<CompareMode>("json");

  const hasChanges = useMemo(() => {
    return !deepEqual(config, originalConfig);
  }, [config, originalConfig]);

  // Edit value using Immer inside React setState
  const handleEdit = (pathStr: string, newValue: JsonValue) => {
    const parts = pathStr.split(".").filter(Boolean);
    setConfig(
      produce((draft) => {
        let current: JsonValue = draft;
        for (let i = 0; i < parts.length - 1; i++) {
          if (current && typeof current === "object") {
            current = (current as JsonObject)[parts[i]];
          }
        }
        if (current && typeof current === "object") {
          (current as JsonObject)[parts[parts.length - 1]] = newValue;
        }
      })
    );
  };

  // Delete value using Immer inside React setState
  const handleDelete = (pathStr: string) => {
    const parts = pathStr.split(".").filter(Boolean);
    setConfig(
      produce((draft) => {
        let current: JsonValue = draft;
        for (let i = 0; i < parts.length - 1; i++) {
          if (current && typeof current === "object") {
            current = (current as JsonObject)[parts[i]];
          }
        }
        if (current && typeof current === "object") {
          if (Array.isArray(current)) {
            current.splice(Number(parts[parts.length - 1]), 1);
          } else {
            delete (current as JsonObject)[parts[parts.length - 1]];
          }
        }
      })
    );
  };

  // Add item to array using Immer inside React setState
  const handleAddItem = (pathStr: string) => {
    const parts = pathStr.split(".").filter(Boolean);
    setConfig(
      produce((draft) => {
        let current: JsonValue = draft;
        for (const part of parts) {
          if (current && typeof current === "object") {
            current = (current as JsonObject)[part];
          }
        }
        if (Array.isArray(current)) {
          if (current.length > 0 && typeof current[0] === "object") {
            const template = { ...(current[0] as JsonObject) };
            Object.keys(template).forEach((k) => {
              if (typeof template[k] === "string") template[k] = "";
              if (typeof template[k] === "number") template[k] = 0;
              if (typeof template[k] === "boolean") template[k] = false;
            });
            current.push(template);
          } else {
            current.push("");
          }
        }
      })
    );
  };

  const handleReset = () => {
    setConfig(JSON.parse(JSON.stringify(originalConfig)));
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
        JSON Config Editor
      </Typography>

      <Grid container spacing={4}>
        {/* Left: Editor */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            {/* Toolbar */}
            <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
              <Button
                variant={viewMode === "form" ? "contained" : "outlined"}
                size="small"
                onClick={() => setViewMode("form")}
              >
                Form View
              </Button>
              <Button
                variant={viewMode === "tree" ? "contained" : "outlined"}
                size="small"
                onClick={() => setViewMode("tree")}
              >
                Tree View
              </Button>
              <Box sx={{ flex: 1 }} />
              {hasChanges && (
                <Tooltip title="Reset to original">
                  <IconButton onClick={handleReset}>
                    <UndoIcon />
                  </IconButton>
                </Tooltip>
              )}
              {hasChanges && (
                <Chip label="Modified" color="warning" size="small" />
              )}
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Editor Content */}
            <Box sx={{ maxHeight: 500, overflow: "auto" }}>
              {viewMode === "tree" ? (
                <SimpleTreeView>
                  {Object.entries(config).map(([key, val]) => (
                    <TreeNode
                      key={key}
                      path={key}
                      label={key}
                      value={val}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onAddItem={handleAddItem}
                    />
                  ))}
                </SimpleTreeView>
              ) : (
                <Box>
                  {Object.entries(config).map(([key, val]) => (
                    <FormField
                      key={key}
                      path={key}
                      label={key}
                      value={val}
                      onChange={handleEdit}
                      onDelete={handleDelete}
                      onAddItem={handleAddItem}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Right: Comparison */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Original vs Current
              </Typography>
              <Box sx={{ flex: 1 }} />
              <Button
                variant={compareMode === "json" ? "contained" : "outlined"}
                size="small"
                onClick={() => setCompareMode("json")}
              >
                JSON
              </Button>
              <Button
                variant={compareMode === "tree" ? "contained" : "outlined"}
                size="small"
                onClick={() => setCompareMode("tree")}
              >
                Diff Tree
              </Button>
            </Box>

            {hasChanges ? (
              <Alert severity="info" sx={{ mb: 2 }}>
                Config has been modified. Changes are highlighted below.
              </Alert>
            ) : (
              <Alert severity="success" sx={{ mb: 2 }}>
                No changes from original config.
              </Alert>
            )}

            {/* Comparison Content */}
            <Box sx={{ maxHeight: 450, overflow: "auto" }}>
              {compareMode === "tree" ? (
                <DiffTree original={originalConfig} current={config} />
              ) : (
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 1, display: "block" }}
                    >
                      Original
                    </Typography>
                    <Box
                      component="pre"
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "background.default",
                        fontSize: "0.75rem",
                        overflow: "auto",
                        maxHeight: 350,
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      {JSON.stringify(originalConfig, null, 2)}
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 1, display: "block" }}
                    >
                      Current{" "}
                      {hasChanges && (
                        <Chip label="Modified" size="small" color="warning" sx={{ ml: 1 }} />
                      )}
                    </Typography>
                    <Box
                      component="pre"
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: hasChanges ? "action.hover" : "background.default",
                        fontSize: "0.75rem",
                        overflow: "auto",
                        maxHeight: 350,
                        border: "2px solid",
                        borderColor: hasChanges ? "warning.main" : "divider",
                      }}
                    >
                      {JSON.stringify(config, null, 2)}
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Box>

            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                onClick={() =>
                  navigator.clipboard.writeText(JSON.stringify(config, null, 2))
                }
              >
                Copy JSON
              </Button>
              <Button
                variant="outlined"
                onClick={handleReset}
                disabled={!hasChanges}
              >
                Reset
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
