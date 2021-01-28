import React from "react";
import ReactDOM from "react-dom";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Input,
} from "@material-ui/core";
import _ from "lodash";
import "./styles.scss";
import { Form } from "react-bootstrap";

// Icons
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40,
  },
}));

const CustomTableCell = ({ row, name, onChange, rows, onTableCellChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  const ref = React.useRef(null);
  if (ref.current && ref.current.classList)
    ref.current.classList.add("custome-input");
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
          <Input
            required={true}
            ref={ref}
            type="number"
            min="1"
            defaultValue="1"
            value={row[name]}
            name={name}
            onChange={(e) => {
              onChange(e, row);
            }}
            onKeyDown={(e) => {
              if (e.nativeEvent.key === "Enter" && row[name] !== "") {
                onTableCellChange(rows, row, name);
              }
            }}
            onBlur={(e) => {
              if (row[name] !== "") onTableCellChange(rows, row, name);
            }}
          />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

const createData = (code, name, quantity, unit, cost, price) => ({
  id: name.replace(" ", "_"),
  code,
  name,
  quantity,
  unit,
  cost,
  price,
  isEditMode: true,
});

const tData = (data) =>
  data.map((item) =>
    createData(item.code, item.name, item.quantity, item.unit, item.cost, item.price)
  );

function TableComponent({ data, onTableCellChange, deleteRow }) {
  const [rows, setRows] = React.useState(data);
  const [previous, setPrevious] = React.useState({});
  const classes = useStyles();

  const updateTimer = React.useRef(null);

  function setUpdate() {
    updateTimer.current = setTimeout(() => {
      setRows(tData(data));
      updateTimer.current = null;
    }, 500);
  }

  React.useEffect(() => {
    if (!updateTimer.current) {
      setUpdate();
    }
  }, [data]);

  const deleteFromBill = (data) => {
    const index = _.findIndex(rows, (x) => x.code === data.code, 0);
    let newArray = rows;
    newArray.splice(index, 1);
    setRows(newArray);
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    let newRow = row;
    const newRows = rows.map((row) => {
      if (row.id === id) {
        newRow = { ...row, [name]: value };
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <caption>No hay productos a facturar.</caption>
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell align="left">Codigo</TableCell>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Cantidad</TableCell>
            <TableCell align="left">Unida</TableCell>
            <TableCell align="left">Precio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className={classes.selectTableCell}>
                <IconButton
                  aria-label="revert"
                  onClick={() => {
                    deleteFromBill(row);
                    deleteRow(row);
                  }}
                >
                  <RevertIcon />
                </IconButton>
              </TableCell>
              <TableCell align="left">{row.code}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <CustomTableCell
                {...{
                  row,
                  name: "quantity",
                  onChange,
                  rows,
                  onTableCellChange,
                }}
              />
              <TableCell align="left">{row.unit}</TableCell>

              <CustomTableCell
                {...{ row, name: "price", onChange, rows, onTableCellChange }}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default TableComponent;
