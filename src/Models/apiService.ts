import { Axios } from "axios";

interface ApiService extends Axios {
  baseUrl: string;
  url: string;
}

export default ApiService;
