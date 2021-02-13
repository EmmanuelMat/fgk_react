import axios from "axios";
import urlsApiContant from "../../constants/urls.api.contant";

function getTaxReceipt() {
  return axios.get(urlsApiContant.URLS.TAX_RECIPT_GOV);
}

function getLastReciept() {
  return axios.get(urlsApiContant.URLS.RECIEPT_LAST);
}

function getClientByNameOrId(name, id) {
  return axios.get(urlsApiContant.URLS.CLIEN_BY, { params: { name, id } });
}

function getLastTaxReciept(taxreciept) {
  return axios.get(urlsApiContant.URLS.TAX_RECIPT_LAST, {
    params: { taxreciept },
  });
}

function getProducts(pagenumber, pagesize, name) {
  return axios.get(urlsApiContant.URLS.PRODUCTS, {
    params: { pagenumber, pagesize, name },
  });
}

function printReciept(id) {
  return axios.get(urlsApiContant.URLS.PRINT_RECIEPT, {
    params: { id },
  });
}

function saveBill(data) {
  return axios.post(urlsApiContant.URLS.RECIEPT, { ...data });
}

function getBillById(id) {
  return axios.get(urlsApiContant.URLS.RECIEPT_BY_ID + "/" + id);
}

function getInvoices() {
  return axios.get(urlsApiContant.URLS.RECIEPT);
}
export default {
  getTaxReceipt,
  getLastReciept,
  getClientByNameOrId,
  getProducts,
  getLastTaxReciept,
  saveBill,
  getBillById,
  printReciept,
  getInvoices
};
