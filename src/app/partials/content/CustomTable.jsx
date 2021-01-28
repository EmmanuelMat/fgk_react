import React from "react";
import {
  makeStyles,
  withStyles,
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Input,
} from "@material-ui/core";
import _ from "lodash";
import _helpers from "../../helpers/_helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },

  paper: {
    marginTop: theme.spacing(3),
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


const CustomTable = ({ data, getData, onClick, columns }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(data.count.pageNumber);
  const [rowsPerPage, setRowsPerPage] = React.useState(data.count.pageSize);
  const [filter, seFilter] = React.useState(data.count.pageSize);
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    getData(page, +event.target.value, filter);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
    getData(newPage, rowsPerPage, filter);
  }

  function handleFilter() {
    fetch();
  }

  function fetch() {
    getData(page, rowsPerPage, filter);
  }


  return (
    <div className={classes.root}>
      <Input
        placeholder="Buscar"
        onChange={(e) => {
          seFilter(e.target.value);
          if (!e.target.value) handleFilter();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleFilter();
        }}
      />

      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              {columns.map((row) => (
                <StyledTableCell key={row.label}>{row.label}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((row, i) => {
              return (
                <TableRow hover onClick={(e) => onClick(row)} key={i}>
                  {columns.map((cell, i) =>{ 
                    const cell2 = Array.isArray(cell.value) ? row[cell.value[0]][cell.value[1]] : row[cell.value]
                    return(
                    <StyledTableCell key={i}>{cell2}</StyledTableCell>
                  )})}
                </TableRow>
              );
            })}
            {/* {data.data.map((row, i) => {
              return (
                <TableRow hover onClick={(e) => onClick(row)} key={row.code}>
                  <StyledTableCell component="th" scope="row">
                    {row.code}
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.unit}</StyledTableCell>
                  <StyledTableCell>
                    {_helpers.decimal2(row.cost)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {_helpers.decimal2(row.cost * 1.14)}
                  </StyledTableCell>
                </TableRow>
              );
            })} */}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.count.count}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default CustomTable;
