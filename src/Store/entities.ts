import { combineReducers } from "@reduxjs/toolkit";
import npmSearchReducer from "./Slices/npmSearchSlice";
import queryReducer from "./Slices/querySlice";
export default combineReducers({ npmSearchReducer, queryReducer });
