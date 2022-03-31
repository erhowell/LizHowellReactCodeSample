import { configureStore as configure } from "@reduxjs/toolkit";

import serviceMiddleware from "./Middleware/serviceMiddleware";
import reducer from "./reducer";

const configureStore = () =>
  configure({
    reducer,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["api/callBegan"]
        }
      }).concat(serviceMiddleware)
  });

export default configureStore;
