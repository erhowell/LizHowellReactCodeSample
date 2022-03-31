import axios from "axios";

import ApiService from "../Models/apiService";

const npmApi = {
  request: axios.request,
  post: axios.post,
  baseUrl: "https://api.npms.io/v2/"
} as ApiService;

export default npmApi;
