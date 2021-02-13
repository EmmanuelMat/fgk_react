import React, { useState, useCallback, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import InputFields from "../../../../partials/content/custom-components/InputFields";
import Dropdown from "../../../../partials/content/custom-components/Dropdown";
import SearchIcon from "@material-ui/icons/Search";
import PrintIcon from "@material-ui/icons/Print";
import SaveIcon from "@material-ui/icons/Save";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import CustomModal from "../../../../partials/content/custom-components/CustomModal";
import CustomTable from "../../../../partials/content/custom-components/CustomTable";
import _helpers from "../../../../helpers/_helpers";
import validation from "../../../../partials/content/validation";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}));

export default function TopForm({
  taxRecieps,
  onTaxReciepsChange,
  lastReciept,
  getClient,
  products,
  getProducts,
  onProductSelect,
  taxReciept,
  saveBll,
  setDiscount,
  discount,
  price,
  setClientIfEmpty,
  printReciept,
  setIsCredit,
  setClient,
  reset,
  setNotesProps,
  notesProps,
  setDiscountPorcentage
}) {
  const classes = useStyles();
  const [clientName, setclientName] = useState("");
  const [clientTaxId, setclientTaxid] = useState("");
  const [clientTel, setclientTel] = useState("");
  const [clientCode, setclientCode] = useState("");
  const [clientAddress, setclientAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState(_helpers._date());
  const history = useHistory();
  const [clientList, setClientList] = useState([]);
  const [notes, setNotes] = useState(notesProps);
  const handleDateChange = (date) => {
    setSelectedDate(date.nativeEvent.target.value);
    setIsCredit(date.nativeEvent.target.valueAsNumber);
  };

  const fetchClient = (value) => {
    setclientName(value);
    if (!value) {
      setClientList([]);
    } else {
      getClient(value, null, setClientList);
    }
  };

  const onClientNameSelect = (val) => {
    let client;
    if (clientList) client = clientList.find((item) => item.name === val);
    if (client && client._id) {
      setClientOnCode(client);
      setClient(client);
    }
  };

  const setClientOnCode = (data) => {
    setclientName(data.name);
    setclientTaxid(data.taxId);
    setclientTel(data.cNumber);
    setclientCode(data.code);
    setclientAddress(data.address);
    setClient(data)
  };
   validation()

  const printBill = async () => {
    const save = await saveBll();
    history.push("/print", { _id: save.data._id });
  };

  const printReciept2 = async () => {
    const save = await saveBll();
    printReciept(save.data._id);
  };
  const submit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = {
      _id: null,
      name: clientName,
      taxId: clientTaxId.toString(),
      pNumber: clientTel.toString(),
      cNumber: clientTel.toString(),
      address: clientAddress,
    };
    setClientIfEmpty(data);
    switch (e.nativeEvent.submitter.getAttribute("id")) {
      case "save":
        saveBll();
        break;
      case "big":
        printBill();
        break;
      case "small":
        printReciept2();
        break;
    }
    reset();
  };

  useEffect(() => {
    setDiscountPorcentage((discount *100)/price.total)
   
  }, [discount])
  const columns = [
    { label: "Codigo", value: "code" },
    { label: "Nombre", value: "name" },
    { label: "Unidad", value: "unit" },
    { label: "Costo", value: "cost" },
    { label: "Precio", value: "price" },
  ];
  return (
    <Form onSubmit={submit} className="needs-validation">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "48%",
                  }}
                >
                  <Form.Group>
                    <Form.Label>Numero de factura.</Form.Label>
                    <Form.Control
                      type="text"
                      readOnly={true}
                      value={lastReciept}
                    />
                  </Form.Group>
                </div>
                <div
                  style={{
                    width: "48%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "48%",
                    }}
                  >
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Fecha</Form.Label>
                      <Form.Control
                        type="date"
                        defaultValue={_helpers._date().value}
                        readOnly={true}
                      />
                    </Form.Group>
                  </div>

                  <div
                    style={{
                      width: "48%",
                    }}
                  >
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Tipo de factura</Form.Label>
                      <Dropdown
                        onChange={onTaxReciepsChange}
                        data={taxRecieps}
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "48%",
                  }}
                >
                  <Form.Group>
                    <Form.Label>Nombre del cliente.</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="text"
                        value={clientName}
                        onChange={(e) => fetchClient(e.target.value)}
                        required
                        list="data"
                        onSelect={(e) => onClientNameSelect(e.target.value)}
                      />
                      {clientList.map ? (
                        <datalist id="data">
                          {clientList.map((item, key) => (
                            <option key={key} value={item.name} />
                          ))}
                        </datalist>
                      ) : (
                        <div />
                      )}
                      <InputGroup.Append>
                        <Button
                          onClick={(e) =>
                            getClient(null, clientCode, setClientOnCode)
                          }
                          variant="outline-secondary"
                        >
                          <SearchIcon />
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                    <Form.Label>RNC/Cedula</Form.Label>
                    <Form.Control
                      type="text"
                      value={clientTaxId}
                      onChange={(e) => {
                        setclientTaxid(e.target.value);
                      }}
                      minLength="9"
                      maxLength="11"
                    />
                  </Form.Group>
                </div>
                <div
                  style={{
                    width: "48%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "48%",
                    }}
                  >
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Direccion</Form.Label>
                      <Form.Control
                        value={clientAddress}
                        onChange={(e) => setclientAddress(e.target.value)}
                        as="textarea"
                        rows="4"
                        required
                      />
                    </Form.Group>
                  </div>

                  <div
                    style={{
                      width: "48%",
                    }}
                  >
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Telefono</Form.Label>
                      <InputFields
                        readOnly={false}
                        value={clientTel}
                        onChange={(e) => {
                          setclientTel(e.target.value.replace(/-/g, ""));
                        }}
                        name={"Telefono"}
                        required={true}
                        mask={"999-999-9999"}
                        formatChars={{
                          "9": "[0-9]",
                          a: "[A-Za-z]",
                          "*": "[A-Za-z0-9]",
                        }}
                      />

                      <Form.Label>Cliente ID</Form.Label>
                      <InputFields
                        onKeyDown={({ nativeEvent }) => {
                          if (nativeEvent.key === "Enter")
                            getClient(null, clientCode, setClientOnCode);
                        }}
                        readOnly={false}
                        value={clientCode}
                        onChange={(e) => setclientCode(e.target.value)}
                        minLength={"5"}
                        maxLength={"5"}
                        name={"Client Code"}
                        required={true}
                        mask={"9999"}
                        formatChars={{
                          "9": "[0-9]",
                          a: "[A-Za-z]",
                          "*": "[A-Za-z0-9]",
                        }}
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  borderTop: "solid 0.5px #b0b0b0",
                  opacity: 0.5,
                  marginBottom: "26px",
                }}
              />
              {/*Product info**/}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "75%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "18%",
                    }}
                  >
                    <Form.Group>
                      <Form.Label>NCF</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly={true}
                        value={taxReciept.taxRecieptId}
                        required
                      />
                    </Form.Group>
                  </div>

                  <div
                    style={{
                      width: "20%",
                    }}
                  >
                    <Form.Group>
                      <Form.Label>Expiracion</Form.Label>
                      <Form.Control
                        type="date"
                        defaultValue={selectedDate.value}
                        onChangeCapture={handleDateChange}
                      />
                    </Form.Group>
                  </div>
                  <div
                    style={{
                      width: "15%",
                    }}
                  >
                    <Form.Group>
                      <Form.Label>Descuento.</Form.Label>
                      <Form.Control
                        type="text"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div
                    style={{
                      width: "18%",
                    }}
                  >
                    <Form.Group>
                      <Form.Label>Sub total.</Form.Label>
                      <Form.Control
                        type="text"
                        value={price.subTotal ? price.subTotal.toFixed(2) : 0.0}
                        readOnly={true}
                      />
                    </Form.Group>
                  </div>
                  <div
                    style={{
                      width: "10%",
                    }}
                  >
                    <Form.Group>
                      <Form.Label>ITBIS.</Form.Label>
                      <Form.Control
                        type="text"
                        value={price.tax ? price.tax.toFixed(2) : 0.0}
                        readOnly={true}
                      />
                    </Form.Group>
                  </div>

                  <div
                    style={{
                      width: "18%",
                    }}
                  >
                    <Form.Group>
                      <Form.Label>Total.</Form.Label>
                      <Form.Control
                        type="text"
                        value={price.total ? price.total.toFixed(2) : 0.0}
                        readOnly={true}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="col-3  justify-content-lg-center  flex-lg-column">
                  <div className="row col-auto mb-3">
                    <a className="mr-2 ml-1" onClick={reset}>
                      Limpiar
                    </a>
                    <CustomModal
                      save={() => setNotesProps(notes)}
                      saveBtn={"Guardar"}
                      children={
                        <Form.Control
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows="4"
                          as="textarea"
                        />
                      }
                      openModalBtn={<a className="line">Nota</a>}
                      size={"sm"}
                      title={"Notas"}
                    />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      display: "flex",
                    }}
                  >
                    <CustomModal
                      children={
                        <CustomTable
                          columns={columns}
                          onClick={(product) => onProductSelect(product)}
                          data={products}
                          getData={getProducts}
                        />
                      }
                      openModalBtn={
                        <Button size="sm" variant="primary">
                          <SearchIcon />
                        </Button>
                      }
                      title={"Productos"}
                      size={"lg"}
                    />
                    <Button
                      type="submit"
                      id="save"
                      size="sm"
                      variant="outline-success"
                    >
                      <SaveIcon />
                    </Button>
                    <Button
                      type="submit"
                      id="big"
                      size="sm"
                      variant="outline-info"
                    >
                      <PrintIcon />
                    </Button>
                    <Button
                      type="submit"
                      id="small"
                      size="sm"
                      variant="outline-danger"
                    >
                      <PrintOutlinedIcon />
                    </Button>
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Form>
  );
}
