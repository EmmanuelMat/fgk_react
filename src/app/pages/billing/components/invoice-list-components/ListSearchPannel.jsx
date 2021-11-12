import React, { useState } from "react";
import {
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  makeStyles,
  Select,
} from "@material-ui/core";
import service from "../../../clients/service";
import SearchInput from "../../../../partials/content/custom-components/SearchInput";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const ListSearchPannel = ({ getInvoicesByClientId, getInvoicesByBillNUmber }) => {
  const classes = useStyles();
  const [searchfield, setSearchfield] = useState("client");
  const [searchValue, setSearchValue] = useState("");
  const handleFieldChnage = (event) => {
    setSearchfield(event.target.value);
    setSearchValue("");
  };
  const handleSearchChnage = (event) => {
    if (searchfield === "client") {
      setSearchValue(event._id);
      return;
    }
    setSearchValue(event.target.value);
  };

  const fetchInvoicesByClientId = () => {
    if (searchfield === "client") {
      getInvoicesByClientId(searchValue);
      return
    }
    getInvoicesByBillNUmber(searchValue)
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchInvoicesByClientId();
  };
  return (
    <div className="d-flex">
      <FormControl className={classes.formControl}>
        {searchfield === "client" ? (
          <SearchInput
            borderBottom
            {...{
              label: "Cliente",
              getData: service.getClientByNameOrId,
              onSelect: handleSearchChnage,
              onKeyDown: handleKeyDown,
            }}
          />
        ) : (
          <Input
            placeholder="Buscar"
            onChange={handleSearchChnage}
            onKeyDown={handleKeyDown}
            value={searchValue}
            type={"number"}
          />
        )}
      </FormControl>

      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchfield}
          onChange={handleFieldChnage}
        >
          <MenuItem value={"client"}>Nombre</MenuItem>
          <MenuItem value={"billNumber"}>Codigo</MenuItem>
          <MenuItem value={"totalPrice"}>Total</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default ListSearchPannel;
