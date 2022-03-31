import { Grid, Stack, Pagination, Button, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import Loading from "./Common/Loading";
import PackageSummaryCard from "./PackageSummaryCard";
import SearchBar from "./SearchBar";

import {
  rdx_getIsSearchLoading,
  rdx_getSearchResults,
  rdx_getSortBy,
  rdx_searchQueryChangePage
} from "../Store/Slices/npmSearchSlice";
import {
  rdx_getNumberOfPages,
  rdx_getPageNumber,
  rdx_setCurrentPage,
  rdx_setPageTotal
} from "../Store/Slices/querySlice";
import SortByDialog from "./SortByDialog";

const Main = () => {
  // From Redux
  const dispatch = useDispatch();
  //state handling
  const [open, setOpen] = React.useState(false);
  const searchResults = useSelector(rdx_getSearchResults);
  const isSearchLoading = useSelector(rdx_getIsSearchLoading);
  const numberOfPages = useSelector(rdx_getNumberOfPages);
  const pageNumber = useSelector(rdx_getPageNumber);
  const sortBy = useSelector(rdx_getSortBy);

  React.useEffect(() => {
    if (!isSearchLoading) {
      dispatch(rdx_setPageTotal(searchResults.total));
    }
  });
  //state handling

  // Pagination
  const onPageChange = (e, val) => {
    dispatch(rdx_searchQueryChangePage(val));
    dispatch(rdx_setCurrentPage(val));
  };
  //Pagination

  // Sort by dialog Logic
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        mt={1}
      >
        <SearchBar />
        {isSearchLoading && (
          <Paper sx={{ margin: 5 }}>
            <Loading />
          </Paper>
        )}
        {!isSearchLoading && searchResults && searchResults.total > 0 && (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0.5}
            m={1}
          >
            {numberOfPages > 1 && (
              <Pagination
                count={numberOfPages}
                variant="outlined"
                shape="rounded"
                size="small"
                page={pageNumber}
                onChange={onPageChange}
              />
            )}
            <Button
              className={"sort-by-button"}
              variant="outlined"
              onClick={handleClickOpen}
            >
              Sorted By : {sortBy}
            </Button>

            {searchResults.results.map((value, index) => {
              return (
                <div key={index}>
                  <PackageSummaryCard key={index} npmPackage={value} />
                </div>
              );
            })}
            {numberOfPages > 1 && (
              <Pagination
                className={"pager"}
                count={numberOfPages}
                variant="outlined"
                shape="rounded"
                size="small"
                page={pageNumber}
                onChange={onPageChange}
              />
            )}
          </Stack>
        )}
      </Grid>
      <SortByDialog sortBy={sortBy} open={open} onClose={handleClose} />
    </>
  );
};

export default Main;
