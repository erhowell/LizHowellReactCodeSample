import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  rdx_isSuggestionsLoading,
  rdx_getSuggestions,
  rdx_loadSuggestion,
  rdx_searchQuery
} from "../Store/Slices/npmSearchSlice";
import { rdx_getQuery, rdx_setQuery } from "../Store/Slices/querySlice";
import { CircularProgress, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import Suggestion from "../Models/ReturnObjects/Sugesstion";

const SearchBar = () => {
  //state handling
  const dispatch = useDispatch();
  const [dropDownOpen, setDropDownOpen] = React.useState(false);
  const options = useSelector(rdx_getSuggestions);
  const isLoading = useSelector(rdx_isSuggestionsLoading);
  const input = useSelector(rdx_getQuery);

  const getAutoComplete = (event, text) => {
    dispatch(rdx_setQuery(text));
    if (text && text.length > 0) {
      dispatch(rdx_loadSuggestion(text));
    }
  };

  const searchValue = () => {
    if (input) {
      dispatch(rdx_searchQuery(input));
      dispatch(rdx_setQuery(input));
    }
  };

  const selectPackage = (event, obj: Suggestion) => {
    if (obj && obj.package) {
      dispatch(rdx_searchQuery(obj.package.name));
      dispatch(rdx_setQuery(obj.package.name));
    } else {
      searchValue();
    }
  };

  const optionLabel = (option) => {
    if (option && option.package) {
      return option.package.name;
    }
    return "";
  };
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Autocomplete
        id="npm-search-bar"
        freeSolo
        sx={{ width: 300 }}
        open={dropDownOpen}
        onOpen={() => {
          setDropDownOpen(true);
        }}
        onClose={() => {
          setDropDownOpen(false);
        }}
        isOptionEqualToValue={(option, value) =>
          value.package && option.package.name === value.package.name
        }
        getOptionLabel={(option) => optionLabel(option)}
        options={options}
        loading={isLoading}
        onChange={selectPackage}
        onInputChange={getAutoComplete}
        inputValue={input}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
      />
      <IconButton aria-label="search" onClick={searchValue}>
        <SearchTwoToneIcon color="primary"></SearchTwoToneIcon>
      </IconButton>
    </Grid>
  );
};

export default SearchBar;
