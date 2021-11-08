import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      "& .MuiDataGrid-cell--editing": {
        backgroundColor: "rgb(255,215,115, 0.19)",
        color: "#1a3e72",
      },
      "& .Mui-error": {
        backgroundColor: `rgb(126,10,15, 0.1)`,
        color: "#750f0f",
      },
    },
  };
});

export default function DataGridComponent({
  rows,
  columns,
  onCellChange,
  onCellClick,
}) {
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const classes = useStyles();

  const handleEditRowsModelChange = (newModel) => {
    const updatedModel = { ...newModel.model };
    Object.keys(updatedModel).forEach((id) => {
      const reg =/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/;
      if (updatedModel[id].price) {
        const isValid2 = reg.test(updatedModel[id].price?.value);

        updatedModel[id].price = {
          ...updatedModel[id].price,
          error: !isValid2,
        };
      }

      if (updatedModel[id].quantity) {
        const isValid = reg.test(updatedModel[id].quantity?.value);

        updatedModel[id].quantity = {
          ...updatedModel[id].quantity,
          error: !isValid,
        };
      }
    });
    setEditRowsModel(updatedModel);
  };
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        className={classes.root}
        autoHeight={true}
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        disableExtendRowFullWidth
        hideFooterPagination
        onEditCellChangeCommitted={onCellChange}
        rowHeight={38}
        onCellClick={onCellClick}
        onEditRowModelChange={handleEditRowsModelChange}
        editRowsModel={editRowsModel}
      />
    </div>
  );
}
