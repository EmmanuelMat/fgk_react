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
    name: "address",
    type: TYPE.TEXT_AREA,
    label: "Direccion",
    width: "48%",
    ariaDescribedby: "emailHelp",
  },


  {
    type: TYPE.NUMBER,
    name: "pNumber",
    label: "Telefono",
    width: "48%",
    ariaDescribedby: "Costo",
    require: true,
  },
  {
    type: TYPE.NUMBER,
    name: "cNumber",
    label: "Celular",
    width: "48%",
    ariaDescribedby: "Precio",
    require: true,
  },

  {
    type: TYPE.NUMBER,
    name: "taxId",
    label: "RNC / Cedula",
    width: "48%",
    ariaDescribedby: "Unidad",
    require: true,
  },
];
