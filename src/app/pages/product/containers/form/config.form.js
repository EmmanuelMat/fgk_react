import { TYPE } from "../../../../constants/contants"

export const genConfig = (options) => [
  {
    name: "name",
    type: TYPE.TEXT,
    label: "Nombre",
    width: "48%",
    ariaDescribedby: "emailHelp"
  },
  {
    type: TYPE.SELECT,
    name: "provider",
    label: "Proveedor",
    width: "48%",
    ariaDescribedby: "Proveedor",
    options: options["providers"],
  },

  {
    type: TYPE.SELECT,
    name: "department",
    label: "Departamento",
    width: "98%",
    ariaDescribedby: "Departamento",
    options: options["departments"],
  },
  {
    type: TYPE.NUMBER,
    name: "cost",
    label: "Costo",
    width: "48%",
    ariaDescribedby: "Costo",
  },
  {
    type: TYPE.NUMBER,
    name: "price",
    label: "Precio",
    width: "48%",
    ariaDescribedby: "Precio",
  },

  {
    type: TYPE.TEXT,
    name: "unit",
    label: "Unidad",
    width: "48%",
    ariaDescribedby: "Unidad",
  },

  {
    type: TYPE.TEXT,
    name: "barcode",
    label: "Codigo de barras",
    width: "48%",
    ariaDescribedby: "Codigo de barras",
  },

  {
    type: TYPE.CHECKBOX,
    name: "taxed",
    label: "Excempto",
    width: "48%",
    ariaDescribedby: "Check me out",
  },
];
