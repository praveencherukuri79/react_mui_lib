import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Checkbox,
  IconButton,
  Collapse,
  Chip,
  Avatar,
  Tooltip,
  useTheme,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// =============================================================================
// SAMPLE DATA
// =============================================================================

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

interface Order {
  id: number;
  customer: string;
  email: string;
  date: string;
  total: number;
  status: "Pending" | "Shipped" | "Delivered";
  items: { name: string; quantity: number; price: number }[];
}

const products: Product[] = [
  { id: 1, name: "Laptop Pro", category: "Electronics", price: 1299, stock: 45, status: "In Stock" },
  { id: 2, name: "Wireless Mouse", category: "Accessories", price: 49, stock: 120, status: "In Stock" },
  { id: 3, name: "USB-C Hub", category: "Accessories", price: 79, stock: 8, status: "Low Stock" },
  { id: 4, name: "Monitor 27\"", category: "Electronics", price: 399, stock: 0, status: "Out of Stock" },
  { id: 5, name: "Keyboard RGB", category: "Accessories", price: 129, stock: 67, status: "In Stock" },
  { id: 6, name: "Webcam HD", category: "Electronics", price: 89, stock: 5, status: "Low Stock" },
  { id: 7, name: "Headphones", category: "Audio", price: 199, stock: 34, status: "In Stock" },
  { id: 8, name: "Desk Lamp", category: "Office", price: 45, stock: 0, status: "Out of Stock" },
];

const orders: Order[] = [
  {
    id: 1001,
    customer: "John Doe",
    email: "john@example.com",
    date: "2024-12-01",
    total: 1547,
    status: "Delivered",
    items: [
      { name: "Laptop Pro", quantity: 1, price: 1299 },
      { name: "Wireless Mouse", quantity: 2, price: 98 },
      { name: "USB-C Hub", quantity: 2, price: 150 },
    ],
  },
  {
    id: 1002,
    customer: "Jane Smith",
    email: "jane@example.com",
    date: "2024-12-05",
    total: 528,
    status: "Shipped",
    items: [
      { name: "Monitor 27\"", quantity: 1, price: 399 },
      { name: "Keyboard RGB", quantity: 1, price: 129 },
    ],
  },
  {
    id: 1003,
    customer: "Bob Wilson",
    email: "bob@example.com",
    date: "2024-12-10",
    total: 199,
    status: "Pending",
    items: [{ name: "Headphones", quantity: 1, price: 199 }],
  },
];

// =============================================================================
// BASIC TABLE
// =============================================================================

export function BasicTable() {
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "success";
      case "Low Stock":
        return "warning";
      case "Out of Stock":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6" fontWeight={600}>
          Basic Table
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Simple MUI Table with custom styling
        </Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: `${theme.palette.primary.main}08` }}>
              <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">Price</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">Stock</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(0, 5).map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{ "&:last-child td": { border: 0 } }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell align="right">${row.price}</TableCell>
                <TableCell align="right">{row.stock}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    size="small"
                    color={getStatusColor(row.status) as "success" | "warning" | "error"}
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

// =============================================================================
// SORTABLE TABLE WITH PAGINATION
// =============================================================================

type Order2 = "asc" | "desc";

export function SortableTable() {
  const theme = useTheme();
  const [order, setOrder] = useState<Order2>("asc");
  const [orderBy, setOrderBy] = useState<keyof Product>("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<number[]>([]);

  const handleSort = (property: keyof Product) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = [...products].sort((a, b) => {
    const aVal = a[orderBy];
    const bVal = b[orderBy];
    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(products.map((p) => p.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelectOne = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6" fontWeight={600}>
          Sortable Table with Pagination
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click headers to sort, with checkbox selection
        </Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: `${theme.palette.primary.main}08` }}>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < products.length}
                  checked={selected.length === products.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Product
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "category"}
                  direction={orderBy === "category" ? order : "asc"}
                  onClick={() => handleSort("category")}
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === "price"}
                  direction={orderBy === "price" ? order : "asc"}
                  onClick={() => handleSort("price")}
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === "stock"}
                  direction={orderBy === "stock" ? order : "asc"}
                  onClick={() => handleSort("stock")}
                >
                  Stock
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow
                key={row.id}
                hover
                selected={selected.includes(row.id)}
                sx={{ "&:last-child td": { border: 0 } }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.includes(row.id)}
                    onChange={() => handleSelectOne(row.id)}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell align="right">${row.price}</TableCell>
                <TableCell align="right">{row.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={products.length}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
}

// =============================================================================
// COLLAPSIBLE TABLE
// =============================================================================

function CollapsibleRow({ order }: { order: Order }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Shipped":
        return "info";
      case "Pending":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <>
      <TableRow hover sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>#{order.id}</TableCell>
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
              {order.customer.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight={500}>
                {order.customer}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {order.email}
              </Typography>
            </Box>
          </Box>
        </TableCell>
        <TableCell>{order.date}</TableCell>
        <TableCell align="right">${order.total}</TableCell>
        <TableCell>
          <Chip
            label={order.status}
            size="small"
            color={getStatusColor(order.status) as "success" | "info" | "warning"}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                Order Items
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export function CollapsibleTable() {
  const theme = useTheme();

  return (
    <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6" fontWeight={600}>
          Collapsible Table
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Expandable rows with nested content
        </Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: `${theme.palette.primary.main}08` }}>
              <TableCell sx={{ width: 50 }} />
              <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">Total</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <CollapsibleRow key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

// =============================================================================
// MAIN EXPORT
// =============================================================================

export function TableExamples() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <BasicTable />
      <SortableTable />
      <CollapsibleTable />
    </Box>
  );
}

