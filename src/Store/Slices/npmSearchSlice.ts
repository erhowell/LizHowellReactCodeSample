import { createSlice } from "@reduxjs/toolkit";
import { sortResults } from "../../Helpers/sortHelpers";
import { AppDispatch, AppThunk, GetStateType } from "../../index";
import ActionPayload from "../../Models/actionPayload";
import SearchPayload from "../../Models/ReturnObjects/SearchPayload";
import Suggestion from "../../Models/ReturnObjects/Sugesstion";
import { getServiceCallBeganAction } from "../../Models/serviceRequest";
import NpmSearchSliceState from "../../Models/SliceState/npmSearchSliceState";
import { RootState } from "../reducer";

const defaultSearchPayload = {
  results: [] as Suggestion[],
  total: 0
};

const slice = createSlice({
  name: "npmSearch",
  initialState: {
    isSuggestionsLoading: false,
    isSearchLoading: false,
    suggestions: [] as Suggestion[],
    searchResults: { ...defaultSearchPayload },
    sortBy: "Optimal"
  } as NpmSearchSliceState,
  reducers: {
    onSuggestionStart: (draft) => {
      draft.isSuggestionsLoading = true;
    },
    onSearchStart: (draft) => {
      draft.isSearchLoading = true;
    },
    onSuggestionSuccess: (draft, action: ActionPayload<Suggestion[]>) => {
      draft.isSuggestionsLoading = false;
      draft.suggestions = action.payload.sort(
        (a, b) => b.searchScore - a.searchScore
      );
    },
    onSearchSuccess: (draft, action: ActionPayload<SearchPayload>) => {
      draft.searchResults = action.payload;
      draft.searchResults.results = sortResults(draft, draft.sortBy);
      draft.isSearchLoading = false;
    },
    onChangeSortBy: (draft, action) => {
      draft.sortBy = action.payload;
      draft.searchResults.results = sortResults(draft, draft.sortBy);
    },
    onError: (draft) => {
      draft.isSuggestionsLoading = false;
      draft.isSearchLoading = false;
    }
  }
});
const {
  onSearchStart,
  onSuggestionStart,
  onSuggestionSuccess,
  onSearchSuccess,
  onChangeSortBy,
  onError
} = slice.actions;
//Getters
export const rdx_getSortBy = (state: RootState) =>
  state.entities.npmSearchReducer.sortBy;
export const rdx_isSuggestionsLoading = (state: RootState) =>
  state.entities.npmSearchReducer.isSuggestionsLoading;

export const rdx_getSuggestions = (state: RootState) =>
  state.entities.npmSearchReducer.suggestions;

export const rdx_getIsSearchLoading = (state: RootState) =>
  state.entities.npmSearchReducer.isSearchLoading;

export const rdx_getSearchResults = (state: RootState) =>
  state.entities.npmSearchReducer.searchResults;
//Getters

// loads suggestions for auto complete
const loadSuggestions = getServiceCallBeganAction();

export const rdx_loadSuggestion = (query: string): AppThunk => (
  dispatch: AppDispatch
) => {
  dispatch(
    loadSuggestions({
      apiName: "npmApi",
      apiActionPath: `search/suggestions?q=${query}`,
      headers: {
        "Content-Type": "application/json"
      },

      method: "get",
      onStart: onSuggestionStart.type,
      onSuccess: onSuggestionSuccess.type,
      onError: onError.type
    })
  );
};

// loads basic search query
const searchQuery = getServiceCallBeganAction();
export const rdx_searchQuery = (query: string): AppThunk => (
  dispatch: AppDispatch
) => {
  dispatch(
    searchQuery({
      apiName: "npmApi",
      apiActionPath: `search?q=${query}`,
      headers: {
        "Content-Type": "application/json"
      },

      method: "get",
      onStart: onSearchStart.type,
      onSuccess: onSearchSuccess.type,
      onError: onError.type
    })
  );
};
//loads for paginated functionality
export const rdx_searchQueryChangePage = (page: number): AppThunk => (
  dispatch: AppDispatch,
  getState: GetStateType
) => {
  let query = getState().entities.queryReducer.query;
  let start = (page - 1) * 25 + 1; //start index
  dispatch(
    searchQuery({
      apiName: "npmApi",
      apiActionPath: `search?q=${query}&from=${start}&size=25`,
      headers: {
        "Content-Type": "application/json"
      },
      method: "get",
      onStart: onSearchStart.type,
      onSuccess: onSearchSuccess.type,
      onError: onError.type
    })
  );
};

//updates search results by sort by value
export const rdx_ChangeSortBy = (sortBy: string): AppThunk => (dispatch) =>
  dispatch(onChangeSortBy(sortBy));

const npmSearchReducer = slice.reducer;

export default npmSearchReducer;
