import { Middleware } from "redux";

import ActionPayload from "../../Models/actionPayload";
import ServiceRequest from "../../Models/serviceRequest";
import { RootState } from "../reducer";
import getService from "../../Services/serviceFactory";
import { isEmptyOrWhiteSpace } from "../../Helpers/stringHelper";

const serviceMiddleware: Middleware<{}, RootState> = ({ dispatch }) => (
  innerDispatch
) => async (action: ActionPayload<ServiceRequest<any>>) => {
  //
  // We will only continue on with execution of this middleware
  //if the action type is "service/callBegan", otherwise it will
  //just pass it on through.
  if (action.type !== "service/callBegan") {
    return innerDispatch(action);
  }

  const {
    apiName,
    apiActionPath,
    method,
    data,
    headers,
    onStart,
    onSuccess,
    onError
  } = action.payload;

  if (!isEmptyOrWhiteSpace(onStart)) {
    dispatch({ type: onStart });
  }

  try {
    let apiService = getService(apiName);

    const response = await apiService.request({
      url: `${apiService.baseUrl}${apiActionPath}`,
      method,
      data,
      headers: { ...headers }
    });

    if (!isEmptyOrWhiteSpace(onSuccess)) {
      dispatch({ payload: response.data, type: onSuccess });
    }
  } catch (error) {
    console.error(error);

    if (!isEmptyOrWhiteSpace(onError)) {
      dispatch({
        payload: { message: error.message },
        type: onError
      });
    }
  }
};

export default serviceMiddleware;
