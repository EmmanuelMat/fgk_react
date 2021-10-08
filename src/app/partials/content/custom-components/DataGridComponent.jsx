import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

export default function DataGridComponent({
  rows,
  columns,
  onCellChange,
  onCellClick
}) {
  return (
    <div style={{width: '100%' }}>
      <DataGrid
        autoHeight={true}
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        disableExtendRowFullWidth
        hideFooterPagination
        onEditCellChangeCommitted={onCellChange}
        rowHeight={38}
        onCellClick={onCellClick}
      />
    </div>
  );
}
