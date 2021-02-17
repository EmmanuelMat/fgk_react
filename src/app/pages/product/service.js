import axios from "axios";
import { func } from "prop-types";
import urlsApiContant from "../../constants/urls.api.contant";

function getProviders() {
  return axios.get(urlsApiContant.URLS.PROVIDERS);
}

function get(pagenumber, pagesize, name) {
  return axios.get(urlsApiContant.URLS.PRODUCTS, {
    params: { pagenumber, pagesize, name },
  });
}

function post(data) {
  return axios.post(urlsApiContant.URLS.PRODUCTS, { ...data });
}

function put(data) {
 return axios.put(urlsApiContant.URLS.PRODUCTS, { ...data });
}

export default {
  getProviders,
  get,
  post,
  put
};
