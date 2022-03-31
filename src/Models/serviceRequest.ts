import { createAction } from "@reduxjs/toolkit";
import { Method } from "axios";
import { ServicesAvailable } from "../Services/servicesAvailable";

export default interface ServiceRequest<TBody> {
  apiName: ServicesAvailable;
  apiActionPath: string;
  method: Method;
  data?: TBody;
  headers?: {};
  onStart?: string;
  onSuccess?: string;
  onError?: string;
}

export const getServiceCallBeganAction = <T extends unknown>() =>
  createAction<ServiceRequest<T>>("service/callBegan");
