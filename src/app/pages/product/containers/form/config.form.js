import { TYPE } from "../../../../constants/contants"
export const genConfig = (options, values = {}) => [
  {
    name: "name",
    type: TYPE.TEXT,
    label: "Nombre",
    width: "48%",
    ariaDescribedby: "Name",
    require: true,
  },
  {
    name: "description",
    type: TYPE.TEXT,
    label: "Descripcion",
    width: "48%",
    ariaDescribedby: "emailHelp",
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
    width: "48%",
    ariaDescribedby: "Departamento",
    options: options["departments"],
  },
  {
    type: TYPE.NUMBER,
    name: "cost",
    label: "Costo",
    width: "48%",
    ariaDescribedby: "Costo",
    require: true,
  },
  {
    type: TYPE.NUMBER,
    name: "price",
    label: "Precio",
    width: "48%",
    ariaDescribedby: "Precio",
    require: true,
  },

  {
    type: TYPE.TEXT,
    name: "unit",
    label: "Unidad",
    width: "48%",
    ariaDescribedby: "Unidad",
    require: true,
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
    width: "20%",
  },
];
