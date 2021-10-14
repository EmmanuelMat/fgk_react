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

function genTaxReciept(gov_id = null) {
  return axios.get(urlsApiContant.URLS.TAX_RECIPT_GEN, {
    params: { gov_id },
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

function updateBill(data) {
  return axios.put(urlsApiContant.URLS.RECIEPT, { ...data });
}

function getBillById(id) {
  return axios.get(urlsApiContant.URLS.RECIEPT_BY_ID + "/" + id);
}

function getInvoices(pagenumber, pagesize, name) {
  return axios.get(urlsApiContant.URLS.RECIEPT, {
    params: { pagenumber, pagesize, name },
  });
}

function getInvoicesByClientId(clientid) {
  return axios.get(urlsApiContant.URLS.RECIEPT_BY_CLIENT_ID, {
    params: { clientid },
  });
}

function getInvoicesByBillNUmber(billNumber) {
  return axios.get(urlsApiContant.URLS.RECIEPT_BY_INVOCE_ID, {
    params: { billNumber },
  });
}

export default {
  getTaxReceipt,
  getLastReciept,
  getClientByNameOrId,
  getProducts,
  genTaxReciept,
  saveBill,
  getBillById,
  printReciept,
  getInvoices,
  updateBill,
  getInvoicesByClientId,
  getInvoicesByBillNUmber
};
