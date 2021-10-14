import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export const nameContants = {
  NCF: "ncf",
  EXPIRATION_DATE: "expirationDate",
  DISCOUNT: "discount",
  SUBTOTAL: "subTotal",
  TOTAL: "total",
  TAX: "tax",
  INVOICE_NUMBER: "invoiceNumber",
  DATE: "date",
};

export const invoiceFormConfig = [
  {
    readonly: true,
    name: nameContants.NCF,
    disabled: false,
    type: "text",
    label: "NCF",
  },
  {
    readonly: false,
    name: nameContants.EXPIRATION_DATE,
    disabled: false,
    type: "date",
    label: "Expiracion",
  },
  {
    readonly: false,
    name: nameContants.DISCOUNT,
    disabled: false,
    type: "number",
    label: "Descuento",
  },
  {
    readonly: true,
    name: nameContants.SUBTOTAL,
    disabled: false,
    type: "number",
    label: "Sub total",
  },
  {
    readonly: true,
    name: nameContants.TAX,
    disabled: false,
    type: "number",
    label: "ITBIS",
  },
  {
    readonly: true,
    name: nameContants.TOTAL,
    disabled: false,
    type: "number",
    label: "Total",
  },
];

export const invoiceFixedValues = [
  {
    name: nameContants.INVOICE_NUMBER,
    label: "Numero de factura",
    disabled: false,
    readonly: true,
    type: "text",
  },
  {
    name: nameContants.DATE,
    label: "Fecha",
    disabled: false,
    readonly: true,
    type: "text",
  },
];

export const selectedItemsColumns = [
  {
    field: "id",
    headerName: "Codigo",
    flex: 0.3,
    minWidth: 90,
    editable: false,
    sortable: false,
    visible: false,
    valueGetter: (params) => params.getValue(params.id, "code"),
  },
  {
    field: "name",
    headerName: "Nombre",
    flex: 2,
    minWidth: 230,
    editable: false,
    sortable: false,
  },
  {
    field: "quantity",
    headerName: "Cantidad",
    flex: 0.7,
    minWidth: 90,
    editable: true,
    sortable: false,
  },
  {
    field: "unit",
    headerName: "Unidad",
    flex: 1,
    minWidth: 100,
    editable: false,
    sortable: false,
  },
  {
    field: "price",
    headerName: "Precio",
    flex: 1,
    minWidth: 160,
    editable: true,
    sortable: false,
  },
  {
    field: "total",
    headerName: "Total",
    sortable: false,
    flex: 1,
    minWidth: 160,
    valueGetter: (params) =>
      `${parseFloat(params.getValue(params.id, "price")) *
        parseFloat(params.getValue(params.id, "quantity"))}`,
  },
  {
    field: "delete",
    headerName: "Delete",
    renderCell: (params) => <DeleteForeverIcon className="delte-icon"/>     },
];
