import ApiService from "../Models/apiService";
import { ServicesAvailable } from "./servicesAvailable";
import npmApi from "./npmApi";
const services = { npmApi };

const getService = (serviceName: ServicesAvailable): ApiService => {
  return services[serviceName];
};

export default getService;
