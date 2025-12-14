import { Box, Typography, Divider } from "@mui/material";
import { DataTableExample } from "@/components/examples/DataTableExample";
import { TableExamples } from "@/components/examples/TableExamples";

export const TablesPage = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        Tables
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        MUI Table and DataGrid examples with custom styling, sorting, filtering,
        and pagination.
      </Typography>

      {/* Regular MUI Tables */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        MUI Table Examples
      </Typography>
      <TableExamples />

      <Divider sx={{ my: 5 }} />

      {/* DataGrid */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        MUI X DataGrid
      </Typography>
      <DataTableExample />
    </Box>
  );
};
