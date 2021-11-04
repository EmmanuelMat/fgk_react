import axios from "axios";
import urlsApiContant from "../../constants/urls.api.contant";

function getClientByNameOrId(pagenumber, pagesize, name) {
  return axios.get(urlsApiContant.URLS.CLIEN_BY, {
    params: { pagenumber, pagesize, name },
  });
}

function post(data) {
  return axios.post(urlsApiContant.URLS.CLIEN, {data})
}

function put(data) {
  return axios.put(urlsApiContant.URLS.CLIEN, {data})
}

export default {
  getClientByNameOrId,
  put,
  post,
};
