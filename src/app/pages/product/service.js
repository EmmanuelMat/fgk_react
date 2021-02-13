import axios from "axios";
import urlsApiContant from "../../constants/urls.api.contant";


function getProviders() {
    return axios.get(urlsApiContant.URLS.PROVIDERS)
}

export default {
    getProviders
}