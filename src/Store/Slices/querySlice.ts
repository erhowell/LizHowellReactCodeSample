import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../index";

import QuerySliceState from "../../Models/SliceState/querySliceState";

import { RootState } from "../reducer";

const slice = createSlice({
  name: "query",
  initialState: {
    query: "",
    currentPage: 1,
    numberOfPages: 1
  } as QuerySliceState,
  reducers: {
    updateQuery: (draft, action) => {
      draft.query = action.payload;
      draft.currentPage = 1;
    },
    updateNumberOfPages: (draft, action) => {
      let maxPages = 400;
      if (action.payload > 0) {
        // the max offset can start is 5000 so there can only be 400 pages
        if (action.payload > 5000) draft.numberOfPages = maxPages;
        else {
          draft.numberOfPages = Math.floor(action.payload / 25);
        }
      }
    },
    updateCurrentPage: (draft, action) => {
      draft.currentPage = action.payload;
    }
  }
});
const { updateQuery, updateNumberOfPages, updateCurrentPage } = slice.actions;

//Getters
export const rdx_getNumberOfPages = (state: RootState) =>
  state.entities.queryReducer.numberOfPages;
export const rdx_getPageNumber = (state: RootState) =>
  state.entities.queryReducer.currentPage;
export const rdx_getQuery = (state: RootState) =>
  state.entities.queryReducer.query;
//Getters

//setters
export const rdx_setQuery = (query): AppThunk => (dispatch) =>
  dispatch(updateQuery(query));

export const rdx_setPageTotal = (numberOfResults: number): AppThunk => (
  dispatch
) => dispatch(updateNumberOfPages(numberOfResults));

export const rdx_setCurrentPage = (page: number): AppThunk => (dispatch) =>
  dispatch(updateCurrentPage(page));
//setters

export default slice.reducer;
