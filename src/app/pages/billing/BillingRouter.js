import React from "react";
import { Route, Switch } from "react-router-dom";
import BillingScreen from "./screen/BillingScreen";
import InvoicesList from "./screen/InvoicesList";

const bill = {
  createDate: "2021-01-18T22:02:30.289Z",
  payDate: "2021-01-18T19:26:30.178Z",
  _id: "600605b142631d5e2829d8f4",
  totalPrice: 2371.866,
  subTotal: 2010.0559322033898,
  tax: 361.81006779661016,
  isCredit: false,
  client: {
    _id: "5ffbadf38ba15b13a9882a9d",
    name: "Oliver Martinez",
    taxId: 444444555,
    pNumber: 8292374881,
    cNumber: 8292374881,
    address: "c/circunvalacion 77 barsequillo haina",
    code: 7123,
    __v: 0,
  },
  details: [
    {
      _id: "600605b142631d5e2829d8f5",
      code: 1005,
      product: {
        _id: "5ff8dd0aee349f8e116ae5ea",
        name: "ABRAZ EMT 12 GALVANIZADA",
        description: "",
        code: 1005,
      },
      sellPrice: 3.5,
      quantity: 1,
    },
    {
      _id: "600605b142631d5e2829d8f6",
      code: 1004,
      product: {
        _id: "5ff8dd0aee349f8e116ae5e9",
        name: "ABRAZ  PMANGUERA 34 GALVANIZA",
        description: "",
        code: 1004,
      },
      sellPrice: 4.06,
      quantity: 1,
    },
    {
      _id: "600605b142631d5e2829d8f7",
      code: 1001,
      product: {
        _id: "5ff8dd0aee349f8e116ae5e6",
        name: "ABANICO PARED PLATINUM 16",
        description: "",
        code: 1001,
      },
      sellPrice: 1302,
      quantity: 1,
    },
    {
      _id: "600605b142631d5e2829d8f8",
      code: 1422,
      product: {
        _id: "5ff8dd34ee349f8e116ae78b",
        name: "CEMENTO DE CONTACTO CHATICAS",
        description: "",
        code: 1422,
      },
      sellPrice: 74.19999999999999,
      quantity: 1,
    },
    {
      _id: "600605b142631d5e2829d8f9",
      code: 1420,
      product: {
        _id: "5ff8dd34ee349f8e116ae789",
        name: "CEMENTO BLANCO  LBS",
        description: "",
        code: 1420,
      },
      sellPrice: 12.305999999999997,
      quantity: 1,
    },
    {
      _id: "600605b142631d5e2829d8fa",
      code: 1425,
      product: {
        _id: "5ff8dd34ee349f8e116ae78e",
        name: "CEMENTO GRIS FDA",
        description: "",
        code: 1425,
      },
      sellPrice: 439.59999999999997,
      quantity: 1,
    },
    {
      _id: "600605b142631d5e2829d8fb",
      code: 1426,
      product: {
        _id: "5ff8dd34ee349f8e116ae78f",
        name:
          "CEMENTO GRIS FDA                                        SANTO DOMINGO",
        description: "",
        code: 1426,
      },
      sellPrice: 420,
      quantity: 1,
    },
    {
      _id: "600605b142631d5e2829d8fc",
      code: 1428,
      product: {
        _id: "5ff8dd35ee349f8e116ae791",
        name: "CEMENTO PVC AZUL 4 OZ COPEY",
        description: "",
        code: 1428,
      },
      sellPrice: 116.19999999999999,
      quantity: 1,
    },
  ],
  discount: 0,
  taxReciept: {
    createDate: "2021-01-18T22:02:30.280Z",
    _id: "600605b142631d5e2829d8f3",
    taxReciept: {
      _id: "5ffb47568f1bc6e77a8791b9",
      serie: "b",
      type: "01",
      name: "Credito Fiscal",
      __v: 0,
    },
    sequence: "0000006",
    isUsed: true,
    __v: 0,
  },
  billNumer: 7000,
  __v: 0,
};



export const BillingRouter = () => {
  return (
    <div>
      {/* <InvoiceComponent bill={bill} /> */}


      <Switch>
        <Route exact path="/billing" component={BillingScreen} />
        <Route  path="/billing/list" component={InvoicesList} />
      </Switch>
    </div>
  );
};
